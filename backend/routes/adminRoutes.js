const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { AssessmentUpload } = require('../controllers/AdminuploadController/Assesmentupload');
const { AttendanceUpload } = require('../controllers/AdminuploadController/Attendanceupload');
const { LinkedInPostUpload } = require('../controllers/AdminuploadController/LinkedInPostUpload');
const { ProjectReviewUpload } = require('../controllers/AdminuploadController/ProjectReviewUpload');
const { ProjectSubmissionUpload } = require('../controllers/AdminuploadController/ProjectSubmissionUpload');
// Route to create a new admin
router.post('/create', createAdmin);

// Route for admin login
router.post('/login', loginAdmin);

router.post('/assesment-upload',AssessmentUpload )
router.post('/attendance-upload',AttendanceUpload )
router.post('/linkedin-post',LinkedInPostUpload )
router.post('/project-review',ProjectReviewUpload )
router.post('/project-submission',ProjectSubmissionUpload )
module.exports = router;
