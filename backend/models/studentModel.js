const mongoose = require('mongoose');
const { AssessmentSchema } = require('./AssessmentSchema');
const { AttendanceSchema } = require('./AttendanceSchema');
const { ProjectReviewSchema } = require('./ProjectReviewSchema');
const { LinkedInPostSchema } = require('./LinkedInPostSchema');

// Define Student schema
const studentSchema = new mongoose.Schema({
    prn_no: { type: String, unique: true, required: true },
    name: { type: String, required: true }, // Required
    branch: { type: String, required: true }, // Required
    joining_year: { type: Number, required: true, min: 2000, max: new Date().getFullYear() },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Required
    contactNumber: { type: String, required: true, match: /^\d{10}$/ }, // Optional contact number
    dateOfBirth: { type: Date, required: true }, // Optional date of birth
    address: { type: String, required: true }, // Optional address
    assessment: [AssessmentSchema],
    attendance: [AttendanceSchema],
    linkedin_post: [LinkedInPostSchema],
    project_review_marks: [ProjectReviewSchema],
}, { timestamps: true });

// Virtual property to calculate current semester
studentSchema.virtual('currentSemester').get(function() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based

    const yearsInCollege = currentYear - this.joining_year;

    // If student hasn't joined yet
    if (yearsInCollege < 0) return 0;

    // Calculate how many semesters the student has completed based on the month
    let semestersCompleted = yearsInCollege * 2;

    // If it's past June (month 7), they're in the second semester of the current year
    if (currentMonth >= 7) {
        semestersCompleted += 1; // Account for the semester starting mid-year
    }

    // Add 1 to convert semesters completed to current semester
    const currentSemester = semestersCompleted + 1;

    // Ensure semester doesn't exceed 8
    return Math.min(currentSemester, 8);
});

// Check if the Student model is already compiled
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;
