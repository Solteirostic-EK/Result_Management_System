import React, { useState } from 'react';
import { FaLinkedin, FaStar, FaThumbsUp } from 'react-icons/fa'; // Import icons

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
};

const postCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const postTitleStyle = {
  color: '#333',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const iconStyle = {
  marginRight: '8px',
  color: '#0284c7',
};

const LinkedInPostMarks = ({ studentData }) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const semesters = studentData.linkedin_post || [];
  const selectedSemester = semesters[selectedSemesterIndex];

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Student LinkedIn Post Marks</h2>

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

      {semesters.length === 0 || !selectedSemester ? (
        <p>No LinkedIn post data available.</p>
      ) : (
        <div style={semesterStyle}>
          <h3 style={headerStyle}>Semester {selectedSemester.semesterNumber}</h3>
          {selectedSemester.posts.map((post, postIndex) => (
            <div key={postIndex} style={postCardStyle}>
              <h4 style={postTitleStyle}>
                <FaLinkedin style={iconStyle} />
                {post.postTitle}
              </h4>
              <p><strong>Link:</strong> <a href={post.postLink} target="_blank" rel="noopener noreferrer">{post.postLink}</a></p>
              <p><FaThumbsUp style={iconStyle} /> Likes: {post.engagement.likes}</p>
              <p><strong>Content Quality:</strong> {post.contentQuality} / 25</p>
              <p><strong>Engagement Score:</strong> {post.engagement.engagementScore}</p>
              <p><strong>Total Marks:</strong> {post.totalMarks}</p>
              <p><strong>Feedback:</strong> {post.feedback}</p>
              <p><strong>Post Date:</strong> {new Date(post.postDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInPostMarks;
