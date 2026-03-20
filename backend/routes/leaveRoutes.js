const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, employerOrHr } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/apply', protect, upload.single('attachment'), applyLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/all', protect, employerOrHr, getAllLeaves);
router.put('/:id', protect, employerOrHr, updateLeaveStatus);

module.exports = router;
