import React, { useState } from "react";
import TeamsStyles from "./Teams.module.css";
import ODIMatches from "./ODIMatches/ODIMatches";
import T20Matches from "./T20Matches/T20Matches";

export default function Teams() {
  const [selectedFormat, setSelectedFormat] = useState("ODI");

  const handleOptionClick = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className={TeamsStyles.teams}>
      <div className={TeamsStyles.buttonContainer}>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedFormat === "ODI" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("ODI")}
        >
          ODI
        </button>
        <button
          className={`${TeamsStyles.optionButton} ${
            selectedFormat === "T20" ? TeamsStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("T20")}
        >
          T20
        </button>
      </div>
      <div className={TeamsStyles.contentContainer}>
        {selectedFormat === "ODI" && <ODIMatches />}
        {selectedFormat === "T20" && <T20Matches />}
      </div>
    </div>
  );
}
