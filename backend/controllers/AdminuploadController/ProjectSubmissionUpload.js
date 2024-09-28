const mongoose = require('mongoose');
const Student = require("../../models/studentModel"); // Adjust the path as needed

// POST route to update or insert project review marks and submission data
const ProjectSubmissionUpload = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).send('No data provided.');
    }

    for (const record of data) {
      
      const keys = Object.keys(record);
      const [prn_no, 
        semesterNumber, 
        project_title,  
        submission_status, ] = keys.map(key => record[key]);

      if (!prn_no) {
        console.error("PRN number is missing in the record.");
        continue; // Skip records with missing PRN number
      }

  

      // Check if a student record exists for this PRN number
      let student = await Student.findOne({ prn_no });
      if (!student) {
        // Skip if student does not exist
        continue;
      }

      // Ensure project_review_marks is an array
      if (!Array.isArray(student.project_review_marks)) {
        student.project_review_marks = [];
      }

      // Find or create the project review for the current semester
      let projectReview = student.project_review_marks.find(sem => sem.semesterNumber === semesterNumber);
      if (!projectReview) {
        projectReview = {
          semesterNumber,
          project_title,
          reviews: [],
          submission: null, // No submissions initially
        };
        student.project_review_marks.push(projectReview);
      }
      if (projectReview.reviews.length !== 3) {
        await student.save();
        continue;
      } 
      // // Add or update the review in the project's reviews array
      // let review = projectReview.reviews.find(r => r.review_stage === review_stage);
      // if (!review) {
      //   await student.save();
      //   continue;
      // } 

      // Check if all required review stages are completed before moving to submission
      const requiredStages = ['Review 1', 'Mid-term Review', 'Final Review'];
      const completedStages = projectReview.reviews.map(r => r.review_stage);

      const allStagesCompleted = requiredStages.every(stage => completedStages.includes(stage));

      // Only process submission if all review stages are completed
      if (allStagesCompleted) {
        // Add or update submission data
        if (!projectReview.submission) {
          projectReview.submission = {
            // Use provided submission date or default to now
            status: submission_status ,
             submission_marks: null, // Initially null, calculated based on reviews
            
          };
        } else {
          // Update existing submission
          
          projectReview.submission.status = submission_status ;
          
        }
   
        // Submission marks are dynamically calculated based on review marks
        const totalMarks = projectReview.reviews.reduce((sum, review) => sum + review.total_marks, 0);
        projectReview.submission.submission_marks = totalMarks / projectReview.reviews.length;

      
        
      }

      // Save the updated student record
      await student.save();
    }

    res.status(200).json({ message: 'Project review and submission data processed successfully.' });
  } catch (error) {
    console.error('Error updating project review or submission:', error);
    res.status(500).json({
      message: 'An error occurred while updating the project review or submission',
      error
    });
  }
};

module.exports = { ProjectSubmissionUpload };
