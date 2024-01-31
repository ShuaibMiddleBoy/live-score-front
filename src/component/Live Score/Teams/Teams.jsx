import React, { useState } from "react";
import TeamsStyles from "./Teams.module.css";
import International from "./International/International";
import League from "./League/League";
import Domestic from "./Domestic/Domestic";
import Women from "./Women/Women";

export default function Teams() {
  const [selectedOption, setSelectedOption] = useState("International");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={TeamsStyles.team}>
      <h2>Cricket Teams</h2>
      <div className={TeamsStyles.buttonContainer}>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedOption === "International" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("International")}
        >
          International
        </button>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedOption === "League" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("League")}
        >
          League
        </button>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedOption === "Domestic" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("Domestic")}
        >
          Domestic
        </button>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedOption === "Women" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("Women")}
        >
          Women
        </button>
      </div>
      <div className={TeamsStyles.contentContainer}>
        {selectedOption === "International" && <International />}
        {selectedOption === "League" && <League />}
        {selectedOption === "Domestic" && <Domestic />}
        {selectedOption === "Women" && <Women />}
      </div>
    </div>
  );
}
