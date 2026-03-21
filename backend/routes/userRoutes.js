const express = require('express');
const router = express.Router();
const { protect, employer, employerOrHr } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Leave = require('../models/Leave');
const bcrypt = require('bcrypt');

router.get('/all', protect, employerOrHr, async (req, res) => {
  try {
    const users = await User.find({ role: 'employee' }).select('-password').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/balance', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('leaveBalance');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.leaveBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/profile', protect, employer, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const leaves = await Leave.find({ userId: user._id }).sort({ appliedAt: -1 });
    res.json({ user, leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
