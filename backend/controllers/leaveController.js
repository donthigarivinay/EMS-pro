const Leave = require('../models/Leave');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { calculateWorkingDays } = require('../utils/workingDays');

const applyLeave = async (req, res) => {
  const { leaveType, duration, startDate, endDate, reason } = req.body;
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attachmentUrl = '';
    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
    }

    // Validations
    if (start < today) {
      return res.status(400).json({ message: 'Cannot apply for past dates' });
    }
    if (end < start) {
      return res.status(400).json({ message: 'End date must be greater than or equal to start date' });
    }

    let actualDays = 0;
    if (duration === 'Half Day') {
      actualDays = 0.5;
      end.setTime(start.getTime()); // Force same day for half day
    } else {
      actualDays = await calculateWorkingDays(start, end);
    }

    if (actualDays === 0) {
      return res.status(400).json({ message: 'Selected dates span only weekends or public holidays' });
    }

    // Check balance centrally here
    const type = leaveType.toLowerCase();
    if (req.user.leaveBalance[type] < actualDays) {
      return res.status(400).json({ message: `Insufficient balance. Request requires ${actualDays} days.` });
    }

    // Check overlaps
    const overlaps = await Leave.find({
      userId: req.user._id,
      status: { $ne: 'Rejected' },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (overlaps.length > 0) {
      return res.status(400).json({ message: 'Leave dates overlap with an existing request' });
    }

    const newLeave = await Leave.create({
      userId: req.user._id,
      leaveType,
      duration: duration || 'Full Day',
      startDate: start,
      endDate: end,
      reason,
      attachmentUrl
    });

    // Notify all employers
    const employers = await User.find({ role: 'employer' });
    const notifications = employers.map(emp => ({
      userId: emp._id,
      type: 'leave_request',
      message: `${req.user.name} requested ${actualDays} days of ${leaveType} leave starting ${start.toLocaleDateString()}.`,
      relatedLeaveId: newLeave._id
    }));
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json(newLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id }).sort({ appliedAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('userId', 'name email').sort({ appliedAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const leave = await Leave.findById(req.params.id).populate('userId');
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    if (leave.status === 'Approved' || leave.status === 'Rejected') {
      return res.status(400).json({ message: 'Leave is already finalized' });
    }

    let actualDays = 0;
    if (leave.duration === 'Half Day') {
      actualDays = 0.5;
    } else {
      actualDays = await calculateWorkingDays(leave.startDate, leave.endDate);
    }

    let newStatus = status;

    // Route logic
    if (status === 'Approved') {
      if (req.user.role === 'employer') {
        if (actualDays >= 5) {
          newStatus = 'Pending_HR';
        } else {
          newStatus = 'Approved';
        }
      } else if (req.user.role === 'hr') {
        newStatus = 'Approved';
      }
    } else if (status === 'Rejected') {
      newStatus = 'Rejected';
    }

    if (req.user.role === 'employer' && req.body.comment?.trim()) {
      leave.employerComment = req.body.comment.trim();
    } else if (req.user.role === 'hr' && req.body.comment?.trim()) {
      leave.hrComment = req.body.comment.trim();
    }

    if (newStatus === 'Approved') {
      // Deduct balance
      const type = leave.leaveType.toLowerCase();
      if (leave.userId.leaveBalance[type] < actualDays) {
        return res.status(400).json({ message: 'Insufficient leave balance for final approval' });
      }
      leave.userId.leaveBalance[type] -= actualDays;
      await leave.userId.save();
    }

    leave.status = newStatus;
    leave.actionAt = Date.now();
    leave.actionBy = req.user._id;
    await leave.save();

    // Notifications
    if (newStatus === 'Pending_HR') {
      const hrs = await User.find({ role: 'hr' });
      const notifications = hrs.map(hr => ({
        userId: hr._id,
        type: 'system',
        message: `Employer approved a long leave (${actualDays} days) for ${leave.userId.name}. Pending your final approval.`,
        relatedLeaveId: leave._id
      }));
      if (notifications.length > 0) await Notification.insertMany(notifications);
      
      await Notification.create({
        userId: leave.userId._id,
        type: 'system',
        message: `Your long leave request was approved by the Employer and is now pending HR approval.`,
        relatedLeaveId: leave._id
      });
    } else {
      await Notification.create({
        userId: leave.userId._id,
        type: newStatus === 'Approved' ? 'leave_approved' : 'leave_rejected',
        message: `Your ${leave.leaveType} leave request has been ${newStatus.toLowerCase()} by ${req.user.role === 'hr' ? 'HR' : 'your Employer'}.`,
        relatedLeaveId: leave._id
      });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus };
