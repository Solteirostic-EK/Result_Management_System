// AttendanceUpload.js
import React, { useState } from 'react';
import FileUploadComponent from '../FileUploadComponent';
const AttendanceUpload = () => {

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
          uploadUrl="/api/Admin/attendance-upload" uploadType="Attendance Marks" onClose={handleToggleUpload}
        />
      )}
    </div>


  );


};

export default AttendanceUpload;
