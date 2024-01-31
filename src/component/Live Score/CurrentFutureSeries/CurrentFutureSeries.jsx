import React, { useState } from "react";
import InternationalTab from "./components/InternationalTab";
import DomesticTab from "./components/DomesticTab";
import T20LeaguesTab from "./components/T20LeaguesTab";
import WomenTab from "./components/WomenTab";
import style from "./CurrentFutureSeries.module.css";

export default function CurrentFutureSeries() {
  const [activeTab, setActiveTab] = useState("International");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.wrapper}>
      <h2>Cricket Schedule</h2>
      <div className={style.scheduleTabs}>
        <button
          className={`${style.tabBtn}  ${
            activeTab === "International" && style.activeTabBtn
          }`}
          onClick={() => {
            handleTabClick("International");
          }}
        >
          International
        </button>
        <button
          className={`${style.tabBtn}  ${
            activeTab === "Domestic" && style.activeTabBtn
          }`}
          onClick={() => {
            handleTabClick("Domestic");
          }}
        >
          Domestic & Others
        </button>
        <button
          className={`${style.tabBtn}  ${
            activeTab === "T20 Leagues" && style.activeTabBtn
          }`}
          onClick={() => {
            handleTabClick("T20 Leagues");
          }}
        >
          T20 Leagues
        </button>
        <button
          className={`${style.tabBtn}  ${
            activeTab === "Women" && style.activeTabBtn
          }`}
          onClick={() => {
            handleTabClick("Women");
          }}
        >
          Women
        </button>
      </div>

      {activeTab === "International" && <InternationalTab />}
      {activeTab === "Domestic" && <DomesticTab />}
      {activeTab === "T20 Leagues" && <T20LeaguesTab />}
      {activeTab === "Women" && <WomenTab />}
    </div>
  );
}
