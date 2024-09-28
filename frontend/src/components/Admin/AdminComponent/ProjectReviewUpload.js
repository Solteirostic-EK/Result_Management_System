// ProjectReviewUpload.js
import React, { useState } from 'react';
import FileUploadComponent from '../FileUploadComponent';
const ProjectReviewUpload = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleToggleUpload = () => {
    setShowUpload(!showUpload);
  };

  return (
    <div>
      <button onClick={handleToggleUpload} className="btn btn-success">
        {showUpload ? 'Close Upload' : 'Open Upload'}
      </button>

      {showUpload && (
        <FileUploadComponent
          uploadUrl="/api/Admin/project-review"
          uploadType="Project Review Marks"
          onClose={handleToggleUpload}
        />
      )}
    </div>
  );


};

export default ProjectReviewUpload;
