import React, { useState, useEffect } from "react";
import axios from "axios";
import StylesTestMatches from "../../Matches.module.css";
import { PulseLoader } from "react-spinners";
import { Helmet } from "react-helmet-async"; 

export default function TestMatches() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen",
          {
            params: { formatType: "test" },
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );
        setRankings(response.data.rank);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlayerImageURL = (faceImageId, index) => {
    const delay = index * 6000;
    return `${
      import.meta.env.VITE_BASE_URL
    }images/get-images/${faceImageId}?delay=${delay}`;
  };

  return (
    <div className={StylesTestMatches.rankingsContainer}>
      {loading ? (
        <div className={StylesTestMatches.spinnerContainer}>
          <div className={StylesTestMatches.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <>
        <div>
      <Helmet>
        <meta
          name="Test Men’s Batting description"
          content="Stay updated with live Men’s ICC Batting Cricket Rankings for Test cricket. Explore the latest standings, ratings, and current positions of players in the dynamic world of Test cricket!"
        />
      </Helmet>
      <h3 className={StylesTestMatches.headingContainer} style={{ color: "#ff6b00", fontSize: "20px",marginBottom: "15px" }}>
      Men’s ICC Batting Cricket Rankings | Test Cricket
      </h3>
      </div>
        <table className={StylesTestMatches.rankingsTable}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Player</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((rank, index) => (
              <tr key={rank.id}>
                <td>{rank.rank}</td>
                <td>
                  <div className={StylesTestMatches.playerInfo}>
                    <img
                      src={getPlayerImageURL(rank.faceImageId, index)}
                      alt={rank.name}
                      className={StylesTestMatches.playerImage}
                    />
                    <div>
                      <div>{rank.name}</div>
                      <div className={StylesTestMatches.country}>
                        {rank.country}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{rank.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
