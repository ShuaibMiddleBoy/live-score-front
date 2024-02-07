import React, { useEffect, useState } from "react";
import BlogsStyles from "./Blogs.module.css";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10); // Number of blogs to display per page

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}blogs/get-blogs`) 
      .then((response) => {
        // Reverse the order of blogs to show the latest one at the top
        const reversedBlogs = response.data.reverse();
        console.log(reversedBlogs)
        setBlogs(reversedBlogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const truncateDescription = (description) => {
    if (!description) {
      return ""; // or any default value you prefer
    }
    
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

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
          {currentBlogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className={BlogsStyles.blogLink}
            >
              <div className={BlogsStyles.card}>
                <div className={BlogsStyles.cardImage}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${blog.Image}`}
                    alt="Blog"
                  />
                </div>
                <div className={BlogsStyles.cardContent}>
                  <div className={BlogsStyles.cardCategory}>
                    <span>{blog.Title}</span>
                  </div>
                  <div className={BlogsStyles.cardHeading}>
                    <h3>{blog.Title}</h3>
                  </div>
                  <div className={BlogsStyles.cardPara}>
                    <p>{truncateDescription(blog.Description)}</p>
                  </div>
                  <div className={BlogsStyles.cardTime}>
                    <span>{new Date(blog.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className={BlogsStyles.pagination}>
        <button
          className={`${BlogsStyles.paginationButton} ${
            currentPage === 1 ? BlogsStyles.disabled : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`${BlogsStyles.paginationButton} ${
                index + 1 === currentPage ? BlogsStyles.active : ""
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className={`${BlogsStyles.paginationButton} ${
            currentPage === Math.ceil(blogs.length / blogsPerPage)
              ? BlogsStyles.disabled
              : ""
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}