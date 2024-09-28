const express = require('express');
const router = express.Router();
const  { getStudentMarks , createStudent ,loginStudent, getStudent } = require('../controllers/studentController');


router.post('/create', createStudent);
router.post('/detail/:prn_no', getStudent);
router.post('/login', loginStudent);
// Route to fetch student marks
router.get('/marks/:studentID', getStudentMarks);

module.exports = router;

