const mongoose = require('mongoose');
const Student = require("../../models/studentModel"); // Adjust the path as needed

// POST route to create or update LinkedIn posts
const LinkedInPostUpload = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).send('No data provided.');
    }

    for (const record of data) {
      
      const keys = Object.keys(record);
      const [prn_no,
        semesterNumber,
        postTitle,
        postLink,
        contentQuality,
        likes,
        comments,
        shares,
        relevanceToCourse,
        creativity,
        writingClarity,
        feedback,
        postDate,] = keys.map(key => record[key]);
        console.log(prn_no)
        if(!prn_no){
        console.error("PRN number is missing in the record.");
        continue; 
      }
      let student = await Student.findOne({ prn_no });
            if (!student) {
                // // If student does not exist, create a new one
                // student = new Student({
                //     prn_no,
                //     linkedin_post: [] // Initialize with empty assessment
                // });
                continue;
            }

            // Ensure that the assessment array is always initialized
            if (!student.linkedin_post) {
                student.linkedin_post = [];
            }
      // Find or initialize LinkedIn posts for the semester
      let linkedInPosts = student.linkedin_post.find(post => post.semesterNumber === semesterNumber);
      if (!linkedInPosts) {
        linkedInPosts = { semesterNumber, posts: [] };
        student.linkedin_post.push(linkedInPosts);
      }

      // Find or create the post
      let post = linkedInPosts.posts.find(p => p.postLink === postLink);
      if (!post) {
        post = {
          postTitle,
          postLink,
          contentQuality,
          engagement: {
            likes,
            comments,
            shares,
            engagementScore: likes + comments + shares, // Calculate score
          },
          marksBreakdown: {
            relevanceToCourse,
            creativity,
            writingClarity,
          },
          totalMarks: contentQuality +
                      (relevanceToCourse || 0) +
                      (creativity || 0) +
                      (writingClarity || 0),
          feedback,
          postDate,
        };
        linkedInPosts.posts.push(post);
      } else {
        // Update existing post
        post.postTitle = postTitle;
        post.contentQuality = contentQuality;
        post.engagement.likes = likes;
        post.engagement.comments = comments;
        post.engagement.shares = shares;
        post.engagement.engagementScore = likes + comments + shares; // Recalculate score
        post.marksBreakdown.relevanceToCourse = relevanceToCourse;
        post.marksBreakdown.creativity = creativity;
        post.marksBreakdown.writingClarity = writingClarity;
        post.totalMarks = contentQuality +
                          (relevanceToCourse || 0) +
                          (creativity || 0) +
                          (writingClarity || 0);
        post.feedback = feedback;
        post.postDate = postDate;
      }

      // Save the updated student record
      await student.save();
    }

    res.status(200).json({ message: 'LinkedIn post data processed successfully.' });
  } catch (error) {
    console.error('Error updating LinkedIn post:', error);
    res.status(500).json({
      message: 'An error occurred while updating the LinkedIn post',
      error
    });
  }
};

module.exports = { LinkedInPostUpload };
