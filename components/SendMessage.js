"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const ImportSubscribersForm = () => {
 
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/import', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Subscribers imported successfully!');
          router.back();
        } else {
          alert('Error importing subscribers.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error importing subscribers.');
      }
    } else {
      alert('Please select a file');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Import Subscribers</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="upload-file" className="block text-sm font-medium text-gray-700 mb-2">Upload Email List CSV or Excel</label>
          <input
            type="file"
            id="upload-file"
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Import Subscribers
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportSubscribersForm;
