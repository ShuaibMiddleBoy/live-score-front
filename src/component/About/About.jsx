import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import AboutStyles from './About.module.css';

export default function About() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element && window.scrollY + window.innerHeight >= element.offsetTop) {
        setFadeIn(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="about">
      <CSSTransition
        in={fadeIn}
        timeout={500} 
        classNames="fade"
        unmountOnExit
      >
        <div className={AboutStyles.container}>
          <h1 className={AboutStyles.title}>About Midwicket</h1>
          <p className={AboutStyles.description}>
            Midwicket is a dedicated platform for cricket enthusiasts, providing you with the latest news, scores, and insights into the world of cricket.
          </p>
          <div className={AboutStyles.features}>
            <div className={AboutStyles.feature}>
              <h2 className={AboutStyles.featureTitle}>Comprehensive Coverage</h2>
              <p className={AboutStyles.featureText}>
                We cover all major cricket tournaments and events, keeping you updated with live scores and match highlights.
              </p>
            </div>
            <div className={AboutStyles.feature}>
              <h2 className={AboutStyles.featureTitle}>Expert Analysis</h2>
              <p className={AboutStyles.featureText}>
                Our team of cricket experts provides in-depth analysis, player statistics, and predictions to enhance your cricket experience.
              </p>
            </div>
            <div className={AboutStyles.feature}>
              <h2 className={AboutStyles.featureTitle}>Community Engagement</h2>
              <p className={AboutStyles.featureText}>
                Join our passionate cricket community, discuss your favorite teams, players, and share your opinions on the game.
              </p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}