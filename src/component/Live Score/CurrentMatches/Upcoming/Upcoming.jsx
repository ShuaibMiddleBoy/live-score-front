import React, { useState, useEffect } from 'react';
import UpcomingStyles from './Upcoming.module.css';
import League from './League/League';
import Domestic from './Domestic/Domestic';
import International from './International/International';
import Women from './Women/Women';
import axios from 'axios';

export default function Upcoming() {
  const [selectedOption, setSelectedOption] = useState('League');
  const [matchTypes, setMatchTypes] = useState([]);

  useEffect(() => {
    // Fetch match types from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming', {
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
    <div className={UpcomingStyles.upcoming}>
      <div className={UpcomingStyles.buttonContainer}>
        {matchTypes.map((matchType) => (
          <button
            key={matchType}
            className={`${UpcomingStyles.optionButton} ${
              selectedOption === matchType ? UpcomingStyles.selected : ''
            }`}
            onClick={() => handleOptionClick(matchType)}
          >
            {matchType}
          </button>
        ))}
      </div>
      <div className={UpcomingStyles.contentContainer}>
        {selectedOption === 'League' && <League />}
        {selectedOption === 'Domestic' && <Domestic />}
        {selectedOption === 'International' && <International />}
        {selectedOption === 'Women' && <Women />}
      </div>
    </div>
  );
}