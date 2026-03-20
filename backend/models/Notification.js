const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['leave_request', 'leave_approved', 'leave_rejected', 'system'], default: 'system' },
  relatedLeaveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Leave' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
