import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../api"; // Adjust the path based on your project structure
import { CloudUpload, FileText, Loader } from "lucide-react";

function ResumeChecker() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

  // Handle file upload using your API instance
  const handleUpload = async () => {
    if (!file) {
      alert("Please select or drop a PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await api.post("/api/extract-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText(response.data.text || "No text found in the PDF.");
    } catch (error) {
      console.error("Error:", error);
      setText("Error extracting text.");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Heading */}
      <div className="absolute top-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Resume Analyzer</h1>
        <p className="text-gray-600 mt-1">Upload your resume and extract insights</p>
      </div>

      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-white shadow-md rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-50"
      >
        <input {...getInputProps()} />
        <CloudUpload className="w-16 h-16 text-blue-500 mb-3" />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop your PDF here...</p>
        ) : (
          <p className="text-gray-600">Drag & drop a resume or click to upload</p>
        )}
      </div>

      {/* File Selection */}
      {file && (
        <div className="mt-4 p-3 bg-gray-200 rounded-lg flex items-center space-x-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <p className="text-sm text-gray-700">{file.name}</p>
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Extracting...</span>
            </div>
          ) : (
            "Upload & Extract Text"
          )}
        </button>
      )}

      {/* Display Extracted Text */}
      {text && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg w-3/4">
          <h3 className="text-lg font-semibold text-gray-800">Extracted Text:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
}

export default ResumeChecker;
