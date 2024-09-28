
import FileUploadComponent from '../FileUploadComponent';
import React, { useState } from 'react';
const AssessmentUpload = () => {
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
          uploadUrl="/api/Admin/assesment-upload"
          uploadType="Assessment Marks" onClose={handleToggleUpload}
        />
      )}
    </div>


  );
};

export default AssessmentUpload;
