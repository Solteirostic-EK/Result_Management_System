const mongoose = require('mongoose');

// Subject Attendance Schema
const CourseAttendanceSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,  // Each subject should have a unique code (e.g., "CS101", "EE202")
  },
  courseName: {
    type: String,
    required: true,
  },
  totalClasses: {
    type: Number,
    required: true,
    min: 0,
  },
  attendedClasses: {
    type: Number,
    required: true,
    min: 0,
  },
  attendancePercentage: {
    type: Number,
    default: function () {
      return this.totalClasses > 0 
        ? (this.attendedClasses / this.totalClasses) * 100 
        : 0;
    },
  },
  attendanceMarks: {
    type: Number,
    default: function () {
      const percentage = this.totalClasses > 0 
        ? (this.attendedClasses / this.totalClasses) * 100 
        : 0;

      if (percentage >= 90) return 10;  // Full marks for 90%+ attendance
      if (percentage >= 80) return 8;
      if (percentage >= 70) return 6;
      if (percentage >= 60) return 4;
      return 2;  // Less than 60% gets 2 marks
    },
  },
},{
    _id: false 

  });

const AttendanceSchema = new mongoose.Schema({
  semesterNumber: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 8 
  },
  courses: {
    type: [CourseAttendanceSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'], // Example: max 10 courses per semester
  },
  totalAttendanceMarks: {
    type: Number,
    default: function () {
      // Calculate the total marks by summing attendance marks from all subjects
      return this.courses.reduce((total, course) => total + course.attendanceMarks, 0);
    },
  },
},{
    _id: false 

  });

// Validation function for array length
function arrayLimit(val) {
  return val.length <= 10;
}



module.exports = { AttendanceSchema };
