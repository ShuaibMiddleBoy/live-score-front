import React, { useState } from "react";
import AllroundersStyles from "./Allrounders.module.css";
import TestMatches from "./TestMatches/TestMatches";
import ODIMatches from "./ODIMatches/ODIMatches";
import T20Matches from "./T20Matches/T20Matches";

export default function Allrounders() {
  const [selectedFormat, setSelectedFormat] = useState("TEST");

  const handleOptionClick = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className={AllroundersStyles.allrounders}>
      <div className={AllroundersStyles.buttonContainer}>
        <button
          className={`${AllroundersStyles.optionButton} ${
            selectedFormat === "TEST" ? AllroundersStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("TEST")}
        >
          TEST
        </button>
        <button
          className={`${AllroundersStyles.optionButton} ${
            selectedFormat === "ODI" ? AllroundersStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("ODI")}
        >
          ODI
        </button>
        <button
          className={`${AllroundersStyles.optionButton} ${
            selectedFormat === "T20" ? AllroundersStyles.selected : ""
          }`}
          onClick={() => handleOptionClick("T20")}
        >
          T20
        </button>
      </div>
      <div className={AllroundersStyles.contentContainer}>
        {selectedFormat === "TEST" && <TestMatches />}
        {selectedFormat === "ODI" && <ODIMatches />}
        {selectedFormat === "T20" && <T20Matches />}
      </div>
    </div>
  );
}
