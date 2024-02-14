import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FullBlogs.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import DOMPurify from "dompurify";

export default function FullBlogs() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [dynamicComments, setDynamicComments] = useState([]);

  const { blogId } = useParams();

  const fetchBlogById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}blogs/get-blog/${blogId}`
      );
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}comments/${blogId}/get-comments`
      );
      setDynamicComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchBlogById();
    fetchComments();
  }, [blogId]);

  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}comments/${blogId}/create-comment`,
        { Comment: comment }
      );
      console.log("Comment submitted:", response.data);
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

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
            <img
              src={`${import.meta.env.VITE_BASE_URL}${blog.Image}`}
              alt="Blog"
            />
          </div>
          <div className={styles.title}>
            <p>{blog.Title}</p>
          </div>
          <div className={styles.paragraphs}>
            {blog.Description ? (
              <div
                dangerouslySetInnerHTML={sanitizeHTML(blog.Description)}
              ></div>
            ) : (
              <p style={{ color: "#aaa" }}>No content available</p>
            )}
          </div>
          {/* Comment Box */}
          <div className={styles.commentBox}>
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              className={styles.commentInput}
            />
            <div className={styles.submitButtonStyles}>
              <button
                onClick={handleSubmitComment}
                className={styles.submitButton}
              >
                Submit
              </button>
            </div>
          </div>
          {/* Dynamic Comments */}
          <div className={styles.dynamicComments}>
            <h2>Comments</h2>
            <ul>
              {dynamicComments.length > 0 ? (
                dynamicComments.map((comment, index) => (
                  <li key={index}>
                    <p>{comment.Comment}</p>
                  </li>
                ))
              ) : (
                <p style={{ color: "#aaa" }}>No comments available</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p style={{ color: "#aaa" }}>No blog data available</p>
      )}
    </div>
  );
}
