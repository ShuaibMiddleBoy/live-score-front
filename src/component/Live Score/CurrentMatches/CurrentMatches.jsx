import React, { useState } from "react";
import CurrentMatchesStyles from "./CurrentMatches.module.css";
import Live from "./Live/Live";
import Recent from "./Recent/Recent";
import Upcoming from "./Upcoming/Upcoming";

export default function CurrentMatches() {
  const [selectedTab, setSelectedTab] = useState("Live");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Live":
        return <Live />;
      case "Recent":
        return <Recent />;
      case "Upcoming":
        return <Upcoming />;
      default:
        return null;
    }
  };

  return (
    <div className={CurrentMatchesStyles.mainTabMenu}>
      <div className={CurrentMatchesStyles.tabMenu}>
        <button
          className={`${CurrentMatchesStyles.tabButton} ${
            selectedTab === "Live" ? CurrentMatchesStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Live")}
        >
          Live
        </button>
        <button
          className={`${CurrentMatchesStyles.tabButton} ${
            selectedTab === "Recent" ? CurrentMatchesStyles.defaultSelected : ""
          }`}
          onClick={() => handleTabClick("Recent")}
        >
          Recent
        </button>
        <button
          className={`${CurrentMatchesStyles.tabButton} ${
            selectedTab === "Upcoming"
              ? CurrentMatchesStyles.defaultSelected
              : ""
          }`}
          onClick={() => handleTabClick("Upcoming")}
        >
          Upcoming
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}
