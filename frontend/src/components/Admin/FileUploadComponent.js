import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { FaUpload, FaFileExcel, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUploadComponent = ({ uploadUrl, uploadType, onClose }) => {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
            previewFile(e.target.files[0]);
        }
    };

    // Preview the file before uploading
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setPreviewData(jsonData.slice(0, 5)); // Preview first 5 rows
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setMessage('Please upload a file first.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            try {
                console.log(uploadUrl)
                await axios.post(uploadUrl, jsonData);
                toast.success(`${uploadType} uploaded successfully!`);
                setMessage('');
                setFile(null); // Clear the file input after successful upload
                setPreviewData([]); // Clear the preview
            } catch (error) {
                toast.error(`Failed to upload ${uploadType}`);
                setMessage('Failed to upload');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container my-4">
            <div className="card p-4 shadow">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-center">Upload {uploadType} <FaFileExcel /></h2>
                    <button onClick={onClose} className="btn btn-danger">
                        <FaTimes />
                    </button>
                </div>
                <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={handleFileChange} 
                    className="form-control mb-3" 
                />
                <button 
                    onClick={handleFileUpload} 
                    className="btn btn-primary btn-block mb-3"
                >
                    <FaUpload /> Upload
                </button>
                {message && <p className="text-danger">{message}</p>}

                {previewData.length > 0 && (
                    <div className="preview-section">
                        <h3>File Preview (First 5 Rows):</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    {previewData[0].map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.slice(1).map((row, index) => (
                                    <tr key={index}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadComponent;
