const mongoose = require('mongoose');
const Student = require("../../models/studentModel"); // Adjust the path as needed

// Function to handle attendance upload and update
const AttendanceUpload = async (req, res) => {
    try {
        const data = req.body;
         console.log(data)
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).send('No data provided.');
        }

        for (const record of data) {
            const keys = Object.keys(record);
            const [prn_no, semesterNumber,
                courseCode,
                courseName,
                totalClasses,
                attendedClasses,] = keys.map(key => record[key]);
            console.log(prn_no)

            if (!prn_no) {
                console.error("PRN number is missing in the record.");
                continue; // Skip records with missing PRN number
            }

            // Find or create the student document
            let student = await Student.findOne({ prn_no });
            if (!student) {
                // student = new Student({
                //     prn_no,
                //     attendance: [] // Initialize with empty attendance
                // });
                continue;
            }

            // Find or create the semester entry
            let semester = student.attendance.find(sem => sem.semesterNumber === semesterNumber);
            if (!semester) {
                semester = {
                    semesterNumber,
                    courses: [] // Initialize with empty courses
                };
                student.attendance.push(semester);
                await student.save();
                student = await Student.findOne({ prn_no });
                semester = student.attendance.find(sem => sem.semesterNumber === semesterNumber);
            }

            // Find or create the course entry
            const courseIndex = semester.courses.findIndex(course => course.courseCode === courseCode);
            if (courseIndex > -1) {
                // Update existing course
                semester.courses[courseIndex] = {
                    courseCode,
                    courseName,
                    totalClasses: parseInt(totalClasses, 10),
                    attendedClasses: parseInt(attendedClasses, 10)
                };
            } else {
                // Add new course
                semester.courses.push({
                    courseCode,
                    courseName,
                    totalClasses: parseInt(totalClasses, 10),
                    attendedClasses: parseInt(attendedClasses, 10)
                });
            }

            // Recalculate total attendance marks
            semester.totalAttendanceMarks = semester.courses.reduce(
                (total, course) => total + course.attendanceMarks,
                0
            );

            // Save the student document
            await student.save();
        }

        console.log('Attendance data uploaded successfully.');
        res.status(200).send('Attendance data uploaded successfully.');
    } catch (error) {
        console.error('Error uploading attendance data:', error);
        res.status(500).send('Error uploading attendance data.');
    }
};

module.exports = { AttendanceUpload };
