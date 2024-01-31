import React, { useState } from "react";
import RankingsStyles from "./MenRankings.module.css";
import Allrounders from "./Allrounders/Allrounders";
import Batting from "./Batting/Batting";
import Bowling from "./Bowling/Bowling";
import Teams from "./Teams/Teams";

export default function MenRankings() {
  const [selectedTab, setSelectedTab] = useState("Batting");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Allrounders":
        return <Allrounders />;
      case "Batting":
        return <Batting />;
      case "Bowling":
        return <Bowling />;
      case "Teams":
        return <Teams />;
      default:
        return null;
    }
  };
  return (
    <div className={RankingsStyles.mainTabMenu}>
      <h2>ICC Cricket Rankings - Men's</h2>
      <div className={RankingsStyles.tabMenu}>
        <button
          className={`${RankingsStyles.tabButton} ${
            selectedTab === "Batting" ? RankingsStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Batting")}
        >
          Batting
        </button>
        <button
          className={`${RankingsStyles.tabButton} ${
            selectedTab === "Bowling" ? RankingsStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Bowling")}
        >
          Bowling
        </button>
        <button
          className={`${RankingsStyles.tabButton} ${
            selectedTab === "Allrounders" ? RankingsStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Allrounders")}
        >
          Allrounders
        </button>
        <button
          className={`${RankingsStyles.tabButton} ${
            selectedTab === "Teams" ? RankingsStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Teams")}
        >
          Teams
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}
