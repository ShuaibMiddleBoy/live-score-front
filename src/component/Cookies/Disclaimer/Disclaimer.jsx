import React, { useState, useEffect } from 'react';
import DisclaimerStyles from './Disclaimer.module.css';
import axios from 'axios';

const Disclaimer = () => {
  const [accepted, setAccepted] = useState(false);
  const [width, setWidth] = useState('100%');

  const handleAccept = () => {
    // Make a POST request to the API to store cookie acceptance
    axios.post(`${import.meta.env.VITE_BASE_URL}cookies/accept-cookie`)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('acceptedDisclaimer', 'true');
        setAccepted(true);
        setWidth('0%');
      })
      .catch((error) => {
        console.error('Error accepting cookie:', error);
      });
  };

  // Check if the user has previously accepted the disclaimer
  const hasAccepted = localStorage.getItem('acceptedDisclaimer') === 'true';

  useEffect(() => {
    if (hasAccepted) {
      setWidth('0%');
    }
  }, [hasAccepted]);

  return (
    <div className={DisclaimerStyles.disclaimer} style={{ width: width }}>
      {!hasAccepted && !accepted && (
        <div className={DisclaimerStyles.content}>
          <p>
            This website uses cookies to enhance the user experience. By using this website, you consent to our use of cookies.
          </p>
          <button className={DisclaimerStyles.Disclaimerbtn} onClick={handleAccept}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;