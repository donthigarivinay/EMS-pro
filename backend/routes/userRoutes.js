const express = require('express');
const router = express.Router();
const { protect, employer } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Leave = require('../models/Leave');

router.get('/balance', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('leaveBalance');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.leaveBalance);
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
