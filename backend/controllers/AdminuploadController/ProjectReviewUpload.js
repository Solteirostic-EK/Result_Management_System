
const mongoose = require('mongoose');
const Student = require("../../models/studentModel"); // Adjust the path as needed

// POST route to update or insert project review marks
const ProjectReviewUpload = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).send('No data provided.');
    }

    for (const record of data) {
      console.log(record)
      const keys = Object.keys(record);
      const [prn_no,
        semesterNumber,
        project_title,
        review_stage,
        presentation,
        report,
        code_review,
        viva,
        feedback,
        date] = keys.map(key => record[key]);
        console.log(feedback)

      if (!prn_no) {
        console.error("PRN number is missing in the record.");
        continue; // Skip records with missing PRN number
      }

      // Calculate total marks based on individual components
      const total_marks = presentation + report + code_review + viva;

      // Check if a student record exists for this PRN number
      let student = await Student.findOne({ prn_no });
      if (!student) {
        
        // If the student does not exist, create a new student record
        // student = new Student({
        //   prn_no,
          
        //   project_review_marks: [] // Initialize with an empty array for project reviews
        // });console.log(student)
        continue;
      }
      // if (!Array.isArray(student.project_review_marks)) {
      //   student.project_review_marks= []; // Ensure courses is always an array
      //       console.log(`Initialized courses array for semester yuifryweruyiffffffffffff`);
      //    }

      // Find the project review for the current semester and project title
      let projectReview = student.project_review_marks.find(sem => sem.semesterNumber === semesterNumber );
      if (!projectReview) {
        projectReview = {
          semesterNumber,
          project_title,
          reviews: [] // Initialize with empty reviews array
        };
        
           console.log(projectReview)
        student.project_review_marks.push(projectReview);
        console.log(student)
        // const attendanceCourses = student.attendance ? student.attendance.map(a => a.courses).flat() : [];
        // if (attendanceCourses.some(course => course.courseCode === null)) {
        //   console.error("Duplicate courseCode found or courseCode is null.");
        //   continue; // Skip saving this record
        // }
        await student.save();
        console.log(student)
        student = await Student.findOne({ prn_no });
        projectReview = student.project_review_marks.find(sem => sem.semesterNumber === semesterNumber );
      }

      // Add or update the review in the project's reviews array
      let review = projectReview.reviews.find(r => r.review_stage === review_stage);
      console.log("huu")
      if (!review) {
        review = {
          review_stage,
          presentation,
          report,
          code_review,
          viva,
          total_marks,
          feedback,
          date: date || new Date() // Use provided date or default to now
        };
        projectReview.reviews.push(review);
      } else {
        // If the review already exists, update its components and feedback
        review.presentation = presentation;
        review.report = report;
        review.code_review = code_review;
        review.viva = viva;
        review.total_marks = total_marks;
        review.feedback = feedback;
        review.date = date || new Date(); // Update the date
      }
      // const attendanceCourses = student.attendance ? student.attendance.map(a => a.courses).flat() : [];
      // if (attendanceCourses.some(course => course.courseCode === null)) {
      //   console.error("Duplicate courseCode found or courseCode is null.");
      //   continue; // Skip saving this record
      // }
      // Save the updated student record
      await student.save();
    }

    res.status(200).json({ message: 'Project review data processed successfully.' });
  } catch (error) {
    console.error('Error updating project review:', error);
    res.status(500).json({
      message: 'An error occurred while updating the project review',
      error
    });
  }
};

module.exports = { ProjectReviewUpload };

