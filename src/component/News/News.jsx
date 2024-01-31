import React, { useState } from "react";
import NewsStyles from "./News.module.css";
import AllStories from "./AllStories/AllStories";
import PrimaryNews from "./News/PrimaryNews";
import Spotlight from "./Spotlight/Spotlight";
import Special from "./Special/Special";
import Opinions from "./Opinions/Opinions";
import Stats from "./Stats/Stats";
import Interviews from "./Interviews/Interviews";
import LiveBlogs from "./LiveBlogs/LiveBlogs";

export default function News() {
  const [selectedMenu, setSelectedMenu] = useState("All Stories");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <div className={NewsStyles.menu}>
        {" "}
        {/* Use styles.menu */}
        <button
          className={`menu-button ${
            selectedMenu === "All Stories" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("All Stories")}
        >
          All Stories
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "News" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("News")}
        >
          News
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Spotlight" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Spotlight")}
        >
          Spotlight
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Opinions" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Opinions")}
        >
          Opinions
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Special" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Special")}
        >
          Special
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Stats" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Stats")}
        >
          Stats
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Interviews" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Interviews")}
        >
          Interviews
        </button>
        <button
          className={`menu-button ${
            selectedMenu === "Live Blogs" ? NewsStyles.selected : ""
          }`}
          onClick={() => handleMenuClick("Live Blogs")}
        >
          Live Blogs
        </button>
      </div>
      <div className={NewsStyles.content}>
        {selectedMenu === "All Stories" && <AllStories />}
        {selectedMenu === "News" && <PrimaryNews />}
        {selectedMenu === "Spotlight" && <Spotlight />}
        {selectedMenu === "Special" && <Special />}
        {selectedMenu === "Opinions" && <Opinions />}
        {selectedMenu === "Stats" && <Stats />}
        {selectedMenu === "Interviews" && <Interviews />}
        {selectedMenu === "Live Blogs" && <LiveBlogs />}
      </div>
    </div>
  );
}
