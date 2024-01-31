import React, { useEffect, useState } from "react";
import BlogsStyles from "./Blogs.module.css";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}blogs/get-blogs`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  // Function to truncate the description to the first 15 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  return (
    <div>
      {loading ? (
        <div className={BlogsStyles.spinnerContainer}>
          <div className={BlogsStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={BlogsStyles.container}>
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className={BlogsStyles.blogLink}
            >
              <div className={BlogsStyles.card}>
                <div className={BlogsStyles.cardImage}>
                  <img src={`http://localhost:3000${blog.Image}`} alt="Blog" />
                </div>
                <div className={BlogsStyles.cardContent}>
                  <div className={BlogsStyles.cardCategory}>
                    <span>{blog.Category}</span>
                  </div>
                  <div className={BlogsStyles.cardHeading}>
                    <h3>{blog.Title}</h3>
                  </div>
                  <div className={BlogsStyles.cardPara}>
                    <p>{truncateDescription(blog.Description)}</p>
                  </div>
                  <div className={BlogsStyles.cardTime}>
                    <span>{new Date(blog.Date).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
