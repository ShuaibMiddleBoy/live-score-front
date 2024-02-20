import React, { useState, useEffect } from 'react';
import DisclaimerStyles from './Disclaimer.module.css';
import axios from 'axios';

const Disclaimer = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}cookies/accept-cookie`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('acceptedDisclaimer', 'true');
        setAccepted(true); // Set accepted to true
      })
      .catch((error) => {
        console.error('Error accepting cookie:', error);
      });
  };

  useEffect(() => {
    const hasAccepted = localStorage.getItem('acceptedDisclaimer') === 'true';
    setAccepted(hasAccepted); // Update state based on localStorage
  }, []);

  if (accepted) {
    return null;
  }

  return (
    <div className={DisclaimerStyles.mainDisclaimer}>
      <div className={DisclaimerStyles.disclaimer} style={{ width: '70%' }}>
        <div className={DisclaimerStyles.content}>
          <p>
            This website uses cookies to enhance the user experience. By using this website, you consent to our use of cookies.
          </p>
          <button className={DisclaimerStyles.Disclaimerbtn} onClick={handleAccept}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;