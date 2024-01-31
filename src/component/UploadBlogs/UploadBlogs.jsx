import React, { useState } from "react";
import BlogsStyles from "./UploadBlogs.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadBlogs() {
  const [formData, setFormData] = useState({
    Title: "",
    Category: "",
    Date: "",
    Description: "",
    Image: null,
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
      Image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Category", formData.Category);
    formDataToSend.append("Date", formData.Date);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("Image", formData.Image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}blogs/create-blogs`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Blog created successfully");
        setFormData({
          Title: "",
          Category: "",
          Date: "",
          Description: "",
          Image: null,
        });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={BlogsStyles.container}>
        <h1 className={BlogsStyles.title}>Upload Blogs here</h1>
        <form className={BlogsStyles.form} onSubmit={handleSubmit}>
          <div className={BlogsStyles.formGroup}>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="Title"
              name="Title"
              className={BlogsStyles.input}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={BlogsStyles.mainFormGroup}>
            <div className={BlogsStyles.formGroup}>
              <label htmlFor="Category">Category</label>
              <input
                type="text"
                id="Category"
                name="Category"
                className={BlogsStyles.input}
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
            <div className={BlogsStyles.formGroup}>
              <label htmlFor="Date">Date</label>
              <input
                type="date"
                id="Date"
                name="Date"
                className={BlogsStyles.input}
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={BlogsStyles.formGroup}>
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              name="Description"
              rows={8}
              className={BlogsStyles.textarea}
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={BlogsStyles.formGroup}>
            <label htmlFor="Image">Upload File</label>
            <input
              type="file"
              id="Image"
              name="Image"
              className={BlogsStyles.fileInput}
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className={BlogsStyles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}