import React, { useEffect, useState } from "react";
import InterviewsStyles from "../News.module.css";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Interviews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getParaphrasedText = async (text) => {
    try {
      const response = await fetch("https://api.ai21.com/studio/v1/paraphrase", {
        headers: {
          "Authorization": "Bearer M30BDw8tc376gOLhoVhZ9DC19SViWRlp", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "text": text
        }),
        method: "POST"
      });
      const data = await response.json();
      // Assuming the first suggestion is used
      return data.suggestions[0].text;
    } catch (error) {
      console.log(error);
      return text; // Return original text in case of error
    }
  };

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
          "https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/4",
          options
        );
        const data = await response.json();

        // Filter out objects with 'story' key
        const filteredData = data.storyList.filter((item) => "story" in item);

        // Paraphrase headlines and introduction text, then update state
        const paraphrasedData = await Promise.all(filteredData.map(async (item) => {
          const paraphrasedHline = await getParaphrasedText(item.story.hline);
          const paraphrasedIntro = await getParaphrasedText(item.story.intro);
          return { ...item, paraphrasedHline, paraphrasedIntro };
        }));

        setNewsData(paraphrasedData);
        setLoading(false);
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

  const handleCardClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <div>
      {loading ? (
        <div className={InterviewsStyles.spinnerContainer}>
          <div className={InterviewsStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={InterviewsStyles.container}>
          {newsData.map((news, index) => (
            <div
              key={index}
              className={InterviewsStyles.card}
              onClick={() => handleCardClick(news.story.id)}
            >
              <div className={InterviewsStyles.cardImage}>
                <img
                  src={getPlayerImageURL(news.story.imageId, index)}
                  alt="News"
                />
              </div>
              <div className={InterviewsStyles.cardContent}>
                <div className={InterviewsStyles.cardCategory}>
                  <span>{news.story.context}</span>
                </div>
                <div className={InterviewsStyles.cardHeading}>
                  <h3>{news.paraphrasedHline}</h3>
                </div>
                <div className={InterviewsStyles.cardPara}>
                  <p>{news.paraphrasedIntro}</p>
                </div>
                <div className={InterviewsStyles.cardTime}>
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