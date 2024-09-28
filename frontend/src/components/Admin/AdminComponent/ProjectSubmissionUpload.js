// ProjectSubmissionUpload.js
import React, { useState } from 'react';
import FileUploadComponent from '../FileUploadComponent';
const ProjectSubmissionUpload = () => {
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
                uploadUrl="/api/Admin/project-submission" 
                uploadType="Project Submission Marks" 
                    onClose={handleToggleUpload} 
                />
            )}
        </div>
    );
 
};

export default ProjectSubmissionUpload;
