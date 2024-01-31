import React, { useState, useEffect } from "react";
import LiveStyles from "./Live.module.css";
import League from "./League/League";
import Domestic from "./Domestic/Domestic";
import International from "./International/International";
import Women from "./Women/Women";
import axios from "axios";

export default function Live() {
  const [selectedOption, setSelectedOption] = useState("");
  const [matchTypes, setMatchTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );
        const matchTypesArray = response.data.typeMatches.map(
          (matchType) => matchType.matchType
        );
        setMatchTypes(matchTypesArray);

        // Set the selectedOption to the first matchType if available
        if (matchTypesArray.length > 0) {
          setSelectedOption(matchTypesArray[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={LiveStyles.live}>
      <div className={LiveStyles.buttonContainer}>
        {matchTypes.map((matchType) => (
          <button
            key={matchType}
            className={`${LiveStyles.optionButton} ${
              selectedOption === matchType ? LiveStyles.selected : ""
            }`}
            onClick={() => handleOptionClick(matchType)}
          >
            {matchType}
          </button>
        ))}
      </div>
      <div className={LiveStyles.contentContainer}>
        {selectedOption === "League" && <League />}
        {selectedOption === "Domestic" && <Domestic />}
        {selectedOption === "International" && <International />}
        {selectedOption === "Women" && <Women />}
      </div>
    </div>
  );
}
