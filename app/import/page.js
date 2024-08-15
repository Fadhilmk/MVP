"use client";
import React from "react";
import axios from "axios";

const Import = () => {
  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/process-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form>
      <h1>Upload Excel File</h1>
      <input type="file" onChange={handleExcelUpload} />
    </form>
  );
};

export default Import;
