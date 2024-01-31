import React, { useState } from 'react';
import LiveScoreStyles from './LiveScore.module.css'; 

import CurrentMatches from './CurrentMatches/CurrentMatches';
import CurrentFutureSeries from './CurrentFutureSeries/CurrentFutureSeries';
import MatchesByDay from './MatchesByDay/MatchesByDay';
import Teams from './Teams/Teams';

export default function LiveScore() {
  const [selectedMenu, setSelectedMenu] = useState('Current Matches');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <div className={LiveScoreStyles.menu}> {/* Use styles.menu */}
        <button
          className={`menu-button ${selectedMenu === 'Current Matches' ? LiveScoreStyles.selected : ''}`}
          onClick={() => handleMenuClick('Current Matches')}
        >
          Current Matches
        </button>
        <button
          className={`menu-button ${selectedMenu === 'Current & Future Series' ? LiveScoreStyles.selected : ''}`}
          onClick={() => handleMenuClick('Current & Future Series')}
        >
          Current & Future Series
        </button>
        <button
          className={`menu-button ${selectedMenu === 'Matches By Day' ? LiveScoreStyles.selected : ''}`}
          onClick={() => handleMenuClick('Matches By Day')}
        >
          Matches By Day
        </button>
        <button
          className={`menu-button ${selectedMenu === 'Teams' ? LiveScoreStyles.selected : ''}`}
          onClick={() => handleMenuClick('Teams')}
        >
          Teams
        </button>
      </div>
      <div className={LiveScoreStyles.content}> {/* Use styles.content */}
        {selectedMenu === 'Current Matches' && <CurrentMatches />}
        {selectedMenu === 'Current & Future Series' && <CurrentFutureSeries />}
        {selectedMenu === 'Matches By Day' && <MatchesByDay />}
        {selectedMenu === 'Teams' && <Teams />}
      </div>
    </div>
  );
}