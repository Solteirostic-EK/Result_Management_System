const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  shares: { type: Number, required: true },
  engagementScore: { type: Number }, // Calculated score
}, { _id: false });

const MarksBreakdownSchema = new mongoose.Schema({
  relevanceToCourse: { type: Number, min: 0, max: 10 },
  creativity: { type: Number, min: 0, max: 10 },
  writingClarity: { type: Number, min: 0, max: 5 },
}, { _id: false });

const PostSchema = new mongoose.Schema({
  postTitle: { type: String, required: true },
  postLink: { type: String, required: true },
  contentQuality: { type: Number, required: true, min: 0, max: 25 },
  engagement: EngagementSchema,
  marksBreakdown: MarksBreakdownSchema,
  totalMarks: { type: Number },
  feedback: { type: String },
  postDate: { type: Date, required: true },
});

// Calculate engagementScore and totalMarks before saving the document
PostSchema.pre('save', function (next) {
  this.engagement.engagementScore = this.engagement.likes + this.engagement.comments + this.engagement.shares;
  this.totalMarks = this.contentQuality +
                    (this.marksBreakdown.relevanceToCourse || 0) +
                    (this.marksBreakdown.creativity || 0) +
                    (this.marksBreakdown.writingClarity || 0);
  next();
});

const LinkedInPostSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true, min: 1, max: 8 },
  posts: [PostSchema],
});

module.exports = { LinkedInPostSchema };
