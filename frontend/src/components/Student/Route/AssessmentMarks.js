import React, { useState } from 'react';
import { FaBook, FaPen, FaChartBar } from 'react-icons/fa'; // Import icons

// Custom styles for enhanced design
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f1f3f4',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: '0 auto',
};

const headerStyle = {
  color: '#444',
  textAlign: 'center',
  marginBottom: '20px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const buttonStyle = (isActive) => ({
  padding: '10px 15px',
  margin: '0 8px',
  borderRadius: '25px',
  cursor: 'pointer',
  backgroundColor: isActive ? '#0284c7' : '#cbd5e1',
  color: isActive ? '#ffffff' : '#333',
  border: 'none',
  transition: 'background-color 0.3s ease',
  fontWeight: isActive ? 'bold' : 'normal',
});

const semesterStyle = {
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
};

const courseCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const courseDetailsStyle = {
  flex: '1',
  marginRight: '15px',
};

const courseTitleStyle = {
  color: '#333',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const iconStyle = {
  marginRight: '8px',
  color: '#0284c7',
};

const progressBarContainerStyle = {
  backgroundColor: '#e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  height: '10px',
  marginTop: '5px',
};

const progressBarStyle = (percentage) => ({
  width: `${percentage}%`,
  backgroundColor: percentage >= 75 ? '#16a34a' : percentage >= 50 ? '#facc15' : '#dc2626',
  height: '100%',
  transition: 'width 0.3s ease',
});
const calculatePercentage = (obtainedMarks, fullMarks) => {
  return fullMarks ? ((obtainedMarks / fullMarks) * 100).toFixed(2) : 0;
};
const AssessmentMarks = ({ studentData }) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

  const semesters = studentData.assessment || [];
  const selectedSemester = semesters[selectedSemesterIndex];

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Student Assessment Dashboard</h2>

      {/* Semester selection buttons */}
      <div style={buttonContainerStyle}>
        {semesters.map((semester, index) => (
          <button
            key={index}
            style={buttonStyle(index === selectedSemesterIndex)}
            onClick={() => setSelectedSemesterIndex(index)}
          >
            Semester {semester.semesterNumber}
          </button>
        ))}
      </div>

      {/* Display selected semester's courses */}
      {semesters.length === 0 || !selectedSemester ? (
        <p>No assessment data available.</p>
      ) : 
       (
        <div style={semesterStyle}>
          <h3 style={headerStyle}>Semester {selectedSemester.semesterNumber}</h3>
          {selectedSemester.courses?.map((course, courseIndex) => {
            const internalPercentage = calculatePercentage(
              course.internalAssessment.averageMarks,
              course.internalAssessment.fullMarksPerTest
            );
            const theoryPercentage = calculatePercentage(
              course.examinationScheme.theoryExam?.obtainedMarks,
              course.examinationScheme.maxTheoryMarks
            );
            const totalPercentage = calculatePercentage(
              course.totalObtainedMarks,
              course.totalFullMarks
            );

            return (
              <div key={courseIndex} style={courseCardStyle}>
                <div style={courseDetailsStyle}>
                  <h4 style={courseTitleStyle}>
                    <FaBook style={iconStyle} />
                    {course.courseName} ({course.courseCode})
                  </h4>
                  <p>
                    <FaPen style={iconStyle} />
                    <strong>Internal Assessment:</strong> {course.internalAssessment.averageMarks} /{' '}
                    {course.internalAssessment.fullMarksPerTest} ({' '}
                    <span>{internalPercentage}%</span>{' '}
                    )
                  </p>
                  <div style={progressBarContainerStyle}>
                    <div style={progressBarStyle(internalPercentage)} />
                  </div>
                  <p>
                    <FaChartBar style={iconStyle} />
                    <strong>Theory Exam:</strong> {course.examinationScheme.theoryExam?.obtainedMarks} /{' '}
                    {course.examinationScheme.maxTheoryMarks} ({' '}
                    <span>{theoryPercentage}%</span>{' '}
                    )
                  </p>
                  <div style={progressBarContainerStyle}>
                    <div style={progressBarStyle(theoryPercentage)} />
                  </div>
                  <p>
                    <strong>Total Obtained Marks:</strong> {course.totalObtainedMarks} /{' '}
                    {course.totalFullMarks} ({' '}
                    <span>{totalPercentage}%</span>{' '}
                    )
                  </p>
                  <div style={progressBarContainerStyle}>
                    <div style={progressBarStyle(totalPercentage)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssessmentMarks;
