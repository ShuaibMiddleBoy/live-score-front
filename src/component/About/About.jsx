import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import AboutStyles from "./About.module.css";
import { Helmet } from "react-helmet-async";

export default function About() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about");
      if (element && window.scrollY + window.innerHeight >= element.offsetTop) {
        setFadeIn(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="about">
      <CSSTransition in={fadeIn} timeout={500} classNames="fade" unmountOnExit>
        <div className={AboutStyles.container}>
            <Helmet>
              <meta
                name="About us description"
                content="Midwicket stands as a specialized platform catering to the fervor of cricket enthusiasts, furnishing the most recent updates, scores, and profound insights into the cricketing world."
              />
            </Helmet>
            <h1 className={AboutStyles.title}>About Midwicket</h1>
            <p className={AboutStyles.description}>
              Midwicket is a dedicated platform for cricket enthusiasts,
              providing you with the latest news, scores, and insights into the
              world of cricket.
            </p>
          <div className={AboutStyles.features}>
            <div className={AboutStyles.feature}>
            <Helmet>
              <meta
                name="Comprehensive Coverage description"
                content="Midwicket covers all the major cricket tournaments and events. The website keeps you updated with highlights and live scores."
              />
            </Helmet>
              <h2 className={AboutStyles.featureTitle}>
                Comprehensive Coverage
              </h2>
              <p className={AboutStyles.featureText}>
                We cover all major cricket tournaments and events, keeping you
                updated with live scores and match highlights.
              </p>
            </div>
            <div className={AboutStyles.feature}>
            <Helmet>
              <meta
                name="Expert Analysis description"
                content="Our expert team gives you in depth analysis, player statistics and the predictions so that you can enjoy your cricket experience"
              />
            </Helmet>
              <h2 className={AboutStyles.featureTitle}>Expert Analysis</h2>
              <p className={AboutStyles.featureText}>
                Our team of cricket experts provides in-depth analysis, player
                statistics, and predictions to enhance your cricket experience.
              </p>
            </div>
            <div className={AboutStyles.feature}>
            <Helmet>
              <meta
                name="Community Engagement description"
                content="Join our Passionate community of cricket, you can discuss your favorite teams, players, leagues and you also share your opinions on the games. "
              />
            </Helmet>
              <h2 className={AboutStyles.featureTitle}>Community Engagement</h2>
              <p className={AboutStyles.featureText}>
                Join our passionate cricket community, discuss your favorite
                teams, players, and share your opinions on the game.
              </p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
