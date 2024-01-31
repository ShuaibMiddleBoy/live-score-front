import React, { useState, useEffect } from 'react';
import styles from './Recent.module.css';
import League from './League/League';
import Domestic from './Domestic/Domestic';
import International from './International/International';
import Women from './Women/Women';
import axios from 'axios';

export default function Recent() {
  const [selectedOption, setSelectedOption] = useState('International');
  const [matchTypes, setMatchTypes] = useState([]);

  useEffect(() => {
    // Fetch match types from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', {
          headers: {
            'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDAPI_HOST}`
          }
        });
        const matchTypesArray = response.data.typeMatches.map((matchType) => matchType.matchType);
        setMatchTypes(matchTypesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.recent}>
      <div className={styles.buttonContainer}>
        {matchTypes.map((matchType) => (
          <button
            key={matchType}
            className={`${styles.optionButton} ${
              selectedOption === matchType ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick(matchType)}
          >
            {matchType}
          </button>
        ))}
      </div>
      <div className={styles.contentContainer}>
        {selectedOption === 'League' && <League />}
        {selectedOption === 'Domestic' && <Domestic />}
        {selectedOption === 'International' && <International />}
        {selectedOption === 'Women' && <Women />}
      </div>
    </div>
  );
}