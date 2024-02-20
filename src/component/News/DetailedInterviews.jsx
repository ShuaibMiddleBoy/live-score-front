import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailedInterviews.module.css";

export default function DetailedInterviews() {
  const { newsId } = useParams(); // Get the newsId from route params
  const [detailedNews, setDetailedNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailedNews = async () => {
      const apiUrl = `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${newsId}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
          "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
        },
      };

      try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        // Remove words like '@B1$' from the content
        const cleanedContent = data.content.map(contentItem => {
          if (contentItem.content?.contentType === "text") {
            return {
              ...contentItem,
              content: {
                ...contentItem.content,
                contentValue: contentItem.content.contentValue.replace(/@[\w\d]*\$[\w\d]*/g, "")
              }
            };
          }
          return contentItem;
        });

        setDetailedNews({ ...data, content: cleanedContent });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching detailed news data:", error);
        setLoading(false);
      }
    };

    fetchDetailedNews();
  }, [newsId]);

  return (
    <div className={styles.interviewContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className={styles.title}>{detailedNews.headline}</h1>
          <p className={styles.meta}>
            by {detailedNews.authors[0].name} • Last updated on{" "}
            {new Date(parseInt(detailedNews.publishTime)).toLocaleString()}
          </p>
          <div className={styles.paragraphs}>
            {detailedNews.content && Array.isArray(detailedNews.content) ? (
              detailedNews.content
                .filter(
                  (contentItem) => contentItem.content?.contentType === "text"
                )
                .map((contentItem, index) => (
                  <p key={index}>{contentItem.content?.contentValue}</p>
                ))
            ) : (
              <p>No content available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
