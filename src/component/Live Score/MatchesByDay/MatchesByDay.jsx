import React, { useState } from "react";
import style from "./MatchesByDay.module.css";
import InternationalTab from "./components/InternationalTab";
import WomenTab from "./components/WomenTab";
import DomesticTab from "./components/DomesticTab";
import T20Leagues from "./components/T20LeaguesTab";

export default function MatchesByDay() {
  const [activeTab, setActiveTab] = useState("International");
  const handleSetActive = (setActive) => {
    setActiveTab(setActive);
  };
  return (
    <>
      <div className={style.wrapper}>
        <h2>Schedule</h2>
        <div className={style.scheduleTabs}>
          <button
            className={`${style.tabBtn}  ${
              activeTab === "International" && style.activeTabBtn
            }`}
            onClick={() => {
              handleSetActive("International");
            }}
          >
            International
          </button>
          <button
            className={`${style.tabBtn}  ${
              activeTab === "Domestic" && style.activeTabBtn
            }`}
            onClick={() => {
              handleSetActive("Domestic");
            }}
          >
            Domestic & Others
          </button>
          <button
            className={`${style.tabBtn}  ${
              activeTab === "T20 Leagues" && style.activeTabBtn
            }`}
            onClick={() => {
              handleSetActive("T20 Leagues");
            }}
          >
            T20 Leagues
          </button>
          <button
            className={`${style.tabBtn}  ${
              activeTab === "Women" && style.activeTabBtn
            }`}
            onClick={() => {
              handleSetActive("Women");
            }}
          >
            Women
          </button>
        </div>

        {activeTab === "International" && <InternationalTab />}
        {activeTab === "Domestic" && <DomesticTab />}
        {activeTab === "T20 Leagues" && <T20Leagues />}
        {activeTab === "Women" && <WomenTab />}
      </div>
    </>
  );
}
