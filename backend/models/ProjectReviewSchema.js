const mongoose = require('mongoose');

// Define schema for individual reviews within a project
const ReviewSchema = new mongoose.Schema({
  review_stage: {
    type: String,
    required: true,
    enum: ['Review 1', 'Mid-term Review', 'Final Review'],
  },
  presentation: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  report: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  code_review: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  viva: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  feedback: String,
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  _id: false
});

// Define schema for individual submissions within a project
const SubmissionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Submitted', 'Pending'],
    default: 'Submitted',
  },
  submission_marks: {
    type: Number,
    required: true,
  },
}, {
  _id: false,

});



// Define schema for project reviews per semester
const ProjectReviewSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  project_title: {
    type: String,
    required: false,
  },
  submission: SubmissionSchema,
  reviews: [ReviewSchema],
}, {
  _id: false,
});

// Export the schema
module.exports = { ProjectReviewSchema };
