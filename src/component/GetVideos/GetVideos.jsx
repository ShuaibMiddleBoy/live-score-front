import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetVideosStyles from './GetVideos.module.css';
import { PulseLoader } from 'react-spinners';
import { Player } from 'video-react';

// Import Video-React CSS for styles
import 'video-react/dist/video-react.css';

export default function GetVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos from the API
    axios.get(`${import.meta.env.VITE_BASE_URL}videos/get-videos`)
      .then(response => {
        setVideos(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className={GetVideosStyles.container}>
        {/* Display videos */}
        <div className={GetVideosStyles.videoContainer}>
        {loading ? (
        <div className={GetVideosStyles.spinnerContainer}>
          <div className={GetVideosStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
            videos.map((video) => (
              <div key={video._id} className={GetVideosStyles.card}>
                <div className={GetVideosStyles.cardContent}>
                  <div className={GetVideosStyles.cardVideo}>
                    <Player>
                      <source src={`http://localhost:3000${video.video}`} />
                    </Player>
                  </div>
                  <div className={GetVideosStyles.cardTitle}>
                    <h3>{video.title}</h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}