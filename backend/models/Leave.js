const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { type: String, enum: ['Casual', 'Sick'], required: true },
  duration: { type: String, enum: ['Full Day', 'Half Day'], default: 'Full Day' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Pending_HR', 'Approved', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now },
  actionAt: { type: Date },
  actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachmentUrl: { type: String, default: '' },
  employerComment: { type: String, default: '' },
  hrComment: { type: String, default: '' }
});

module.exports = mongoose.model('Leave', leaveSchema);
