/* eslint-disable no-unused-vars */
import api from "@/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !date) {
      toast.error("Please select a file and date.");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("date", date);

    try {
      setLoading(true);
      const { data } = await api.post("/api/reports/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        setResult(data);
        console.log(data);
        toast.success("Uploaded successfully");
      } else {
        toast.error("Error in uploading report");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Upload Report
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Share your documents securely
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <svg
                    className="w-8 h-8 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 text-center">
                    <span className="font-medium text-blue-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PDF, PNG, JPG, GIF (Max. 10MB)
                  </span>
                </label>
              </div>
              {file && (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg mt-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Upload Report</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {result?.aiInsight && (
        <div className="mt-4 p-3 border">
          <h3 className="font-semibold">AI Summary (preview)</h3>
          <p>{result.aiInsight.englishSummary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadReport;
