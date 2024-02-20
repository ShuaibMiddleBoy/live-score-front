import React, { useEffect, useState } from "react";
import axios from "axios";
import SpotlightStyles from "../News.module.css";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Helmet } from "react-helmet-async"; 

export default function Spotlight() {
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
          "https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/2",
          options
        );
        const data = await response.json();

        // Filter out objects with 'story' key
        const filteredData = data.storyList.filter((item) => "story" in item);

        // Phrase the content and set it in the state
        const phrasedData = await Promise.all(
          filteredData.map(async (news) => {
            const paraphrasedHline = await paraphraseContent(news.story.hline);
            return { ...news, story: { ...news.story, hline: paraphrasedHline } };
          })
        );

        setNewsData(phrasedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to paraphrase the content using the API
  const paraphraseContent = async (content) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}chatbots/paraphrase-generated-content`,
        { content }
      );
      return response.data.paraphrasedContent;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If rate limit exceeded, return original content
        console.error("Rate limit exceeded for paraphrasing. Using original content.");
        return content;
      } else {
        // For other errors, log and return original content
        console.error("Error paraphrasing content:", error);
        return content; // Return the original content in case of an error
      }
    }
  };  

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
      <div className={SpotlightStyles.spinnerContainer}>
        <div className={SpotlightStyles.spinner}>
          <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
        </div>
      </div>
    ) : (
      <>
        <Helmet>
        <meta
          name="Spotlight description"
          content="Stay in the know with our spotlight on breaking cricket news. Get the latest updates, in-depth coverage, and real-time alerts. Your go-to source for the latest in cricket!"
        />
      </Helmet>
      <h3 className={SpotlightStyles.headingContainer}>
      Breaking News | Spotlight News on Cricket
      </h3>
        <div className={SpotlightStyles.container}>
          {newsData.map((news, index) => (
            <div
              key={index}
              className={SpotlightStyles.card}
              onClick={() => handleCardClick(news.story.id)}
            >
              <div className={SpotlightStyles.cardImage}>
                <img
                  src={getPlayerImageURL(news.story.imageId, index)}
                  alt="News"
                />
              </div>
              <div className={SpotlightStyles.cardContent}>
                <div className={SpotlightStyles.cardCategory}>
                  <span>{news.story.context}</span>
                </div>
                <div className={SpotlightStyles.cardHeading}>
                  <h3>{news.story.hline}</h3>
                </div>
                <div className={SpotlightStyles.cardPara}>
                  <p>{news.story.intro}</p>
                </div>
                <div className={SpotlightStyles.cardTime}>
                  <span>{getTimeAgo(news.story.pubTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}