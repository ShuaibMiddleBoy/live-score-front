import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FullBlogs.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function FullBlogs() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();

  // Fetch an individual blog by its ID
  const fetchBlogById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}blogs/get-blog/${blogId}`
      );
      setBlog(response.data); // Assuming response.data contains the entire blog object
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [blogId]);

  return (
    <div className={styles.interviewContainer}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : blog ? (
        <>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.meta}>
            • Last updated on {new Date(blog.updatedAt).toLocaleString()}
          </p>
          <div className={styles.image}>
            <img src={`${import.meta.env.VITE_BASE_URL}${blog.Image}`} alt="Blog" />
          </div>
          <div className={styles.paragraphs}>
            {blog.Description ? (
              <p>{blog.Description}</p>
            ) : (
              <p style={{ color: "#aaa" }}>No content available</p>
            )}
          </div>
        </>
      ) : (
        <p style={{ color: "#aaa" }}>No blog data available</p>
      )}
    </div>
  );
}