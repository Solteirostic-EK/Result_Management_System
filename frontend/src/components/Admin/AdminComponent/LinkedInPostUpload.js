// LinkedInPostUpload.js
import React, { useState } from 'react';
import FileUploadComponent from '../FileUploadComponent';
const LinkedInPostUpload = () => {
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
                uploadUrl="/api/Admin/linkedin-post" 
                uploadType="LinkedIn Post Marks" 
                    onClose={handleToggleUpload} 
                />
            )}
        </div>
    );
  
};

export default LinkedInPostUpload;
