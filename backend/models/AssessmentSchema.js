const mongoose = require('mongoose');

// Define the internal assessment schema with custom methods and enhanced names
const InternalAssessmentSchema = new mongoose.Schema({
  firstTest: {
    obtainedMarks: { type: Number, default: null, min: 0 },
  },
  secondTest: {
    obtainedMarks: { type: Number, default: null, min: 0 },
  },
  fullMarksPerTest: { type: Number, required: true, min: 0 },
  averageMarks: {
    type: Number,
    default: function() {
      const test1Marks = this.firstTest?.obtainedMarks || 0;
      const test2Marks = this.secondTest?.obtainedMarks || 0;
      return ((test1Marks + test2Marks) / 2) || null;
    }
  }
},{
_id: false 
});

// Define the examination scheme schema with clear field names
const ExaminationSchemeSchema = new mongoose.Schema({
  theoryExam: {
    obtainedMarks: { type: Number, default: null, min: 0 },
  },
  maxTheoryMarks: { type: Number, required: true, min: 0 },
}, { _id: false }
);

// Define the course schema with validation, custom methods, and default values
const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true , unique: true },
  courseName: { type: String, required: true },
  internalAssessment: { type: InternalAssessmentSchema, required: true },
  examinationScheme: { type: ExaminationSchemeSchema, required: true },
  totalObtainedMarks: {
    type: Number,
    default: function() {
      const internalAvg = this.internalAssessment.averageMarks || 0;
      const theoryMarks = this.examinationScheme.theoryExam?.obtainedMarks || 0;
      return internalAvg + theoryMarks;
    }
  },
  totalFullMarks: {
    type: Number,
    default: function() {
      const fullInternalMarks = this.internalAssessment.fullMarksPerTest  || 0;
      const fullTheoryMarks = this.examinationScheme.maxTheoryMarks || 0;
      return fullInternalMarks + fullTheoryMarks;
    }
  }
}
);

// Pre-save hook to validate course marks before saving
CourseSchema.pre('save', function(next) {
  if (this.totalObtainedMarks > this.totalFullMarks) {
    return next(new Error('Total obtained marks cannot exceed full marks.'));
  }
  next();
});


// Define the main assessment schema

const AssessmentSchema = new mongoose.Schema({
    
      semesterNumber: { type: Number, required: true, min: 1, max: 8 },
      courses: {
        type: [CourseSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'] // Example: max 10 courses per semester
      }
    },{
      _id: false 

    }
);



// Validation function for array length
function arrayLimit(val) {
  return val.length <= 10;
}





module.exports = { AssessmentSchema };
