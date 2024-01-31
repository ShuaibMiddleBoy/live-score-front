import React, { useEffect, useState } from "react";
import AllStoriesStyles from "../News.module.css";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from 'axios';

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

        // Use a queue to process paraphrasing requests sequentially
        const paraphrasedData = [];
        for (const item of filteredData) {
          const paraphrasedHline = await getParaphrasedText(item.story.hline);
          const paraphrasedIntro = await getParaphrasedText(item.story.intro);
          paraphrasedData.push({ ...item, paraphrasedHline, paraphrasedIntro });
        }

        setNewsData(paraphrasedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getParaphrasedText = async (text) => {
    const options = {
      method: 'POST',
      url: 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '11f942ceefmsh60fc922bd658939p18eb25jsnd019c0c8347f',
        'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com',
      },
      data: {
        language: 'en',
        strength: 3,
        text: text,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.rewrite; // Assuming the API response provides the paraphrased text
    } catch (error) {
      console.error(error);
      return text; // Return original text in case of error
    }
  };

  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 10000;
    return `${import.meta.env.VITE_BASE_URL}images/get-images/${imageId}?delay=${delay}`;
  };

  const handleCardClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
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
                  <h3>{news.paraphrasedHline}</h3> {/* Use paraphrased headline */}
                </div>
                <div className={AllStoriesStyles.cardPara}>
                  <p>{news.paraphrasedIntro}</p> {/* Use paraphrased introduction text */}
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
  );
}