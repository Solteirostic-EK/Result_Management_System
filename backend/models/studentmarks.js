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
});

// Define the examination scheme schema with clear field names
const ExaminationSchemeSchema = new mongoose.Schema({
  theoryExam: {
    obtainedMarks: { type: Number, default: null, min: 0 },
  },
  maxTheoryMarks: { type: Number, required: true, min: 0 },
});

// Define the course schema with validation, custom methods, and default values
const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
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
});

// Pre-save hook to validate course marks before saving
CourseSchema.pre('save', function(next) {
  if (this.totalObtainedMarks > this.totalFullMarks) {
    return next(new Error('Total obtained marks cannot exceed full marks.'));
  }
  next();
});

// Branch codes mapping
const branchCodes = {
  'Computer Engineering': 'CE',
  'Mechanical Engineering': 'ME',
  'Electronics Engineering': 'EE',
  // Add other branches as needed
};
// PRN generator function
async function generatePRN(joining_year, branch) {
  const branchCode = branchCodes[branch];

  if (!branchCode) {
    throw new Error(`Invalid branch: ${branch}`);
  }

  // Count the number of students in the same year and branch
  const count = await StudentMarks.countDocuments({ joining_year, branch });

  // Increment by 1 for the next student in the same year and branch
  const sequenceNumber = count + 1;

  // Format PRN as {JoiningYear}{BranchCode}{SequenceNumber}
  const prn_no = `${joining_year}${branchCode}${String(sequenceNumber).padStart(3, '0')}`;
  return prn_no;
}

// Define the main assessment schema
const AssessmentSchema = new mongoose.Schema({
  prn_no: { 
    type: String, 
    required: true, 
    unique: true, // Ensure PRN is unique across all records
    validate: {
      validator: function(v) {
        // Extract joining_year (first 4 digits) and branch code (next 2 characters)
        const year = v.substring(0, 4);
        const branchCode = v.substring(4, 6);

        // Ensure the year is a valid number (e.g., a recent year)
        const isYearValid = /^\d{4}$/.test(year) && parseInt(year) >= 2000 && parseInt(year) <= new Date().getFullYear();

        // Ensure the branch code is valid from the branchCodes mapping
        const isBranchValid = Object.values(branchCodes).includes(branchCode);

        // Ensure the sequence number is a valid 3-digit number
        const sequenceNumber = v.substring(6);
        const isSequenceValid = /^\d{3}$/.test(sequenceNumber);

        return isYearValid && isBranchValid && isSequenceValid;
      },
      message: props => `${props.value} is not a valid PRN!`
    }
  }, // Branch must be one of the keys in branchCodes
  semesters: [
    {
      semesterNumber: { type: Number, required: true, min: 1, max: 8 },
      courses: {
        type: [CourseSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'] // Example: max 10 courses per semester
      }
    }
  ]
});

// Pre-save hook to auto-generate PRN if it's not provided
AssessmentSchema.pre('save', async function(next) {
  if (!this.prn_no) {
    this.prn_no = await generatePRN(this.joining_year, this.branch);
  }
  next();
});

// Validation function for array length
function arrayLimit(val) {
  return val.length <= 10;
}

// Static method to find a student by PRN and semester
AssessmentSchema.statics.findByPrnAndSemester = async function(prn_no, semesterNumber) {
  return this.findOne({ prn_no, "semesters.semesterNumber": semesterNumber });
};

