import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadVideosStyles from "./UploadVideos.module.css";

export default function UploadVideos() {
  const [formData, setFormData] = useState({
    title: "",
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      video: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("video", formData.video);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}videos/create-video`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Video uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video. Please try again.");
      // You can add error handling logic or display an error message here
    }
  };

  return (
    <div>
      <div className={UploadVideosStyles.container}>
        <h1 className={UploadVideosStyles.title}>Upload Videos here</h1>
        <form className={UploadVideosStyles.form} onSubmit={handleSubmit}>
          <div className={UploadVideosStyles.formGroup}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              className={UploadVideosStyles.input}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={UploadVideosStyles.formGroup}>
            <label htmlFor="video">Upload Video*</label>
            <input
              type="file"
              id="video"
              name="video"
              className={UploadVideosStyles.fileInput}
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className={UploadVideosStyles.button}>
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}