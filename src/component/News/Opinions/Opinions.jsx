import React, { useEffect, useState } from "react";
import OpinionsStyles from "../News.module.css";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Opinions() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
          "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
        },
      };

      try {
        const response = await fetch(
          "https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/3",
          options
        );
        const data = await response.json();

        // Filter out objects with 'story' key
        const filteredData = data.storyList.filter((item) => "story" in item);

        setNewsData(filteredData);
        setLoading(false);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 10000;
    return `${
      import.meta.env.VITE_BASE_URL
    }images/get-images/${imageId}?delay=${delay}`;
  };

  const getTimeAgo = (pubTime) => {
    const currentTime = new Date();
    const pubDateTime = new Date(parseInt(pubTime));
    const timeDifference = currentTime - pubDateTime;

    if (timeDifference < 60000) {
      return "Just now";
    } else if (timeDifference < 3600000) {
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo}m ago`;
    } else if (timeDifference < 86400000) {
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo}h ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo}d ago`;
    }
  };
  const handleCardClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <div>
      {loading ? (
        <div className={OpinionsStyles.spinnerContainer}>
          <div className={OpinionsStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={OpinionsStyles.container}>
          {newsData.map((news, index) => (
            <div
              key={index}
              className={OpinionsStyles.card}
              onClick={() => handleCardClick(news.story.id)}
            >
              <div className={OpinionsStyles.cardImage}>
                <img
                  src={getPlayerImageURL(news.story.imageId, index)}
                  alt="News"
                />
              </div>
              <div className={OpinionsStyles.cardContent}>
                <div className={OpinionsStyles.cardCategory}>
                  <span>{news.story.context}</span>
                </div>
                <div className={OpinionsStyles.cardHeading}>
                  <h3>{news.story.hline}</h3>
                </div>
                <div className={OpinionsStyles.cardPara}>
                  <p>{news.story.intro}</p>
                </div>
                <div className={OpinionsStyles.cardTime}>
                  <span>{getTimeAgo(news.story.pubTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
