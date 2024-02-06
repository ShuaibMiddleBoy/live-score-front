import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Upcoming.module.css";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; 

export default function International() {
  const [matchInfo, setMatchInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );

        // Filter matches based on matchType (International or Domestic)
        const domesticMatches = response.data.typeMatches.find(
          (matchType) => matchType.matchType === "International"
        );

        if (domesticMatches) {
          setMatchInfo(
            domesticMatches.seriesMatches[0].seriesAdWrapper.matches
          );
        } else {
          setMatchInfo([]);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();

    // Use a timer to fetch data every minute
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const goToMatchDetails = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };
  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 1000;
    return `${
      import.meta.env.VITE_BASE_URL
    }images/get-images/${imageId}?delay=${delay}`;
  };

  return (
    <div>
      <Helmet>
        <meta
          name="Upcoming International description"
          content="Explore the excitement of upcoming live cricket matches with our comprehensive schedule. Stay ahead with real-time updates, ensuring you never miss a moment of the action!"
        />
      </Helmet>
      <h3 className={styles.headingContainer}>
      Upcoming Match Updates | Live Cricket
      </h3>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
        </div>
      </div>
      <div className={styles.Container}>
        {loading
          ? null
          : matchInfo.map((match, index) => (
              <div
                key={index}
                onClick={() => goToMatchDetails(match.matchInfo.matchId)}
                className={styles.matchCard}
              >
                <div className={styles.matchHeader}>
                  <h2>{match.matchInfo.seriesName}</h2>
                  <h3>
                    {match.matchInfo.team1.teamName} vs{" "}
                    {match.matchInfo.team2.teamName}
                  </h3>
                </div>
                <div className={styles.teamInfo}>
                  <div className={styles.team}>
                    <div className={styles.teamName}>
                      <img
                        src={getPlayerImageURL(
                          match.matchInfo.team1.imageId,
                          index
                        )}
                        alt="News"
                      />
                    </div>
                    <div className={styles.teamName}>
                      {match.matchInfo.team1.teamSName}
                    </div>
                    <div className={styles.teamScore}>
                      {`${match.matchScore?.team1Score?.inngs1?.runs ?? ""}${
                        match.matchScore?.team1Score?.inngs1?.wickets
                          ? `-${match.matchScore?.team1Score?.inngs1?.wickets}`
                          : ""
                      }${
                        match.matchScore?.team1Score?.inngs2 &&
                        match.matchScore?.team1Score?.inngs2?.runs !== undefined
                          ? ` & ${match.matchScore?.team1Score?.inngs2?.runs}${
                              match.matchScore?.team1Score?.inngs2?.wickets
                                ? `-${match.matchScore?.team1Score?.inngs2?.wickets}`
                                : ""
                            }`
                          : ""
                      }`}
                      {match.matchScore?.team1Score?.inngs1?.overs
                        ? ` (${match.matchScore?.team1Score?.inngs1?.overs} Ovs)`
                        : ""}
                    </div>
                  </div>
                  <div className={styles.team}>
                    <div className={styles.teamName}>
                      <img
                        src={getPlayerImageURL(
                          match.matchInfo.team2.imageId,
                          index
                        )}
                        alt="News"
                      />
                    </div>
                    <div className={styles.teamName}>
                      {match.matchInfo.team2.teamSName}
                    </div>
                    <div className={styles.teamScore}>
                      {`${match.matchScore?.team2Score?.inngs1?.runs ?? ""}${
                        match.matchScore?.team2Score?.inngs1?.wickets
                          ? `-${match.matchScore?.team2Score?.inngs1?.wickets}`
                          : ""
                      }${
                        match.matchScore?.team2Score?.inngs2
                          ? ` & ${
                              match.matchScore?.team2Score?.inngs2?.runs ?? ""
                            }${
                              match.matchScore?.team2Score?.inngs2?.wickets
                                ? `-${match.matchScore?.team2Score?.inngs2?.wickets}`
                                : ""
                            }`
                          : ""
                      }`}
                      {match.matchScore?.team2Score?.inngs1?.overs
                        ? ` (${match.matchScore?.team2Score?.inngs1?.overs} Ovs)`
                        : ""}
                    </div>
                  </div>
                </div>
                <div className={styles.matchResult}>
                  <p>{match.matchInfo.status}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
