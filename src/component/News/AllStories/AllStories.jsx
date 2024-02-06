import React, { useEffect, useState } from "react";
import AllStoriesStyles from "../News.module.css";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { Helmet } from "react-helmet-async"; 

export default function AllStories() {
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
          "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
          options
        );
        const data = await response.json();

        // Filter out objects with 'ad' key
        const filteredData = data.storyList.filter((item) => "story" in item);

        const paraphrasedData = await Promise.all(filteredData.map(async (news) => {
          const paraphrasedHline = await paraphraseText(news.story.hline);
          return { ...news, paraphrasedHline };
        }));

        setNewsData(paraphrasedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 10000;
    return `${import.meta.env.VITE_BASE_URL}images/get-images/${imageId}?delay=${delay}`;
  };

  const handleCardClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  const paraphraseText = async (text) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/chatbots/paraphrase-generated-content",
        {
          prompt: text,
        }
      );

      return response.data.paraphrasedContent;
    } catch (error) {
      console.error("Error paraphrasing content:", error);
      return text; // Return the original text in case of error
    }
  };

  return (
    <div>
      <Helmet>
        <meta
          name="All Stories description"
          content="Stay informed with our cricket news hub. Get the latest updates, breaking news, and in-depth coverage of all things cricket in real-time. Your go-to source for cricket updates!"
        />
      </Helmet>
      <h3 className={AllStoriesStyles.headingContainer}>
      Cricket News | Cricket Updates | Live Alerts
      </h3>
    <div>
      {loading ? (
        <div className={AllStoriesStyles.spinnerContainer}>
          <div className={AllStoriesStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={AllStoriesStyles.container}>
          {newsData.map((news, index) => (
            <div
              key={index}
              className={AllStoriesStyles.card}
              onClick={() => handleCardClick(news.story.id)}
            >
              <div className={AllStoriesStyles.cardImage}>
                <img
                  src={getPlayerImageURL(news.story.imageId, index)}
                  alt="News"
                />
              </div>
              <div className={AllStoriesStyles.cardContent}>
                <div className={AllStoriesStyles.cardCategory}>
                  <span>{news.story.context}</span>
                </div>
                <div className={AllStoriesStyles.cardHeading}>
                  <h3>{news.paraphrasedHline}</h3>
                </div>
                <div className={AllStoriesStyles.cardPara}>
                  <p>{news.story.intro}</p>
                </div>
                <div className={AllStoriesStyles.cardTime}>
                  <span>
                    {new Date(parseInt(news.story.pubTime)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
