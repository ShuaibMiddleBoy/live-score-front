import React, { useState } from "react";
import BattingStyles from "./Batting.module.css";
import ODIMatches from "./ODIMatches/ODIMatches";
import T20Matches from "./T20Matches/T20Matches";

export default function Batting() {
  const [selectedFormat, setSelectedFormat] = useState("ODI");

  const handleOptionClick = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className={BattingStyles.batters}>
      <div className={BattingStyles.buttonContainer}>
        <button
          className={`${BattingStyles.optionButton} ${
            selectedFormat === "ODI" ? BattingStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("ODI")}
        >
          ODI
        </button>
        <button
          className={`${BattingStyles.optionButton} ${
            selectedFormat === "T20" ? BattingStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("T20")}
        >
          T20
        </button>
      </div>
      <div className={BattingStyles.contentContainer}>
        {selectedFormat === "ODI" && <ODIMatches />}
        {selectedFormat === "T20" && <T20Matches />}
      </div>
    </div>
  );
}
