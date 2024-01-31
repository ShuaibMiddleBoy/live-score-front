import React, { useState } from "react";
import AllroundersStyles from "./Allrounders.module.css";
import ODIMatches from "./ODIMatches/ODIMatches";
import T20Matches from "./T20Matches/T20Matches";

export default function Allrounders() {
  const [selectedFormat, setSelectedFormat] = useState("ODI");

  const handleOptionClick = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className={AllroundersStyles.allrounders}>
      <div className={AllroundersStyles.buttonContainer}>
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
        {selectedFormat === "ODI" && <ODIMatches />}
        {selectedFormat === "T20" && <T20Matches />}
      </div>
    </div>
  );
}
