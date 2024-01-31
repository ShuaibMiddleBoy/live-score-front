import React, { useState } from "react";
import BowlingStyles from "./Bowling.module.css";
import TestMatches from "./TestMatches/TestMatches";
import ODIMatches from "./ODIMatches/ODIMatches";
import T20Matches from "./T20Matches/T20Matches";

export default function Bowling() {
  const [selectedFormat, setSelectedFormat] = useState("TEST");

  const handleOptionClick = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className={BowlingStyles.bowlers}>
      <div className={BowlingStyles.buttonContainer}>
        <button
          className={`${BowlingStyles.optionButton} ${
            selectedFormat === "TEST" ? BowlingStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("TEST")}
        >
          TEST
        </button>
        <button
          className={`${BowlingStyles.optionButton} ${
            selectedFormat === "ODI" ? BowlingStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("ODI")}
        >
          ODI
        </button>
        <button
          className={`${BowlingStyles.optionButton} ${
            selectedFormat === "T20" ? BowlingStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("T20")}
        >
          T20
        </button>
      </div>
      <div className={BowlingStyles.contentContainer}>
        {selectedFormat === "TEST" && <TestMatches />}
        {selectedFormat === "ODI" && <ODIMatches />}
        {selectedFormat === "T20" && <T20Matches />}
      </div>
    </div>
  );
}
