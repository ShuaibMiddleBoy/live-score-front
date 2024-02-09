import React, { useState, useEffect } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import HomePageSyles from "./HomePage.module.css";

export default function HomePage() {
  const [matchInfo, setMatchInfo] = useState({
    Domestic: [],
    International: [],
    League: [],
    Women: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );

        // Retrieve all types of matches
        const allMatches = response.data.typeMatches;

        // Initialize objects to store selected matches
        let selectedMatches = {
          Domestic: [],
          International: [],
          League: [],
          Women: [],
        };

        // Variable to keep track of total matches selected
        let totalSelectedMatches = 0;

        // Loop through allMatches to select matches from each type until total count reaches 6
        allMatches.forEach((matchType) => {
          if (totalSelectedMatches < 6) {
            switch (matchType.matchType) {
              case "Domestic":
                selectedMatches.Domestic.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, 1)
                );
                totalSelectedMatches += 1;
                break;
              case "International":
                selectedMatches.International.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, 2)
                );
                totalSelectedMatches += 2;
                break;
              case "League":
                selectedMatches.League.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, 1)
                );
                totalSelectedMatches += 1;
                break;
              case "Women":
                selectedMatches.Women.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, 2)
                );
                totalSelectedMatches += 2;
                break;
              default:
                break;
            }
          }
        });

        // If still fewer than 6 matches have been selected, fetch additional matches from any type
        if (totalSelectedMatches < 6) {
          allMatches.forEach((matchType) => {
            if (totalSelectedMatches < 6) {
              const remaining = 6 - totalSelectedMatches;
              const matchesToAdd = Math.min(
                remaining,
                matchType.seriesMatches[0].seriesAdWrapper.matches.length
              );

              switch (matchType.matchType) {
                case "Domestic":
                  selectedMatches.Domestic.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, matchesToAdd)
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "International":
                  selectedMatches.International.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, matchesToAdd)
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "League":
                  selectedMatches.League.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, matchesToAdd)
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "Women":
                  selectedMatches.Women.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(0, matchesToAdd)
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                default:
                  break;
              }
            }
          });
        }

        setMatchInfo(selectedMatches);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();

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
      <div className={HomePageSyles.spinnerContainer}>
        <div className={HomePageSyles.spinner}>
          <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
        </div>
      </div>
      <div className={HomePageSyles.Container}>
        {loading ? null : (
          <>
            {Object.keys(matchInfo).map((matchType) =>
              matchInfo[matchType].map((match, index) => (
                <div
                  key={index}
                  onClick={() => goToMatchDetails(match.matchInfo.matchId)}
                  className={HomePageSyles.matchCard}
                >
                  <div className={HomePageSyles.matchHeader}>
                    <h2>{match.matchInfo.seriesName}</h2>
                    <h3>
                      {match.matchInfo.team1.teamName} vs{" "}
                      {match.matchInfo.team2.teamName}
                    </h3>
                  </div>
                  <div className={HomePageSyles.teamInfo}>
                    <div className={HomePageSyles.team}>
                      <div className={HomePageSyles.teamName}>
                        <img
                          src={getPlayerImageURL(
                            match.matchInfo.team1.imageId,
                            index
                          )}
                          alt="News"
                        />
                      </div>
                      <div className={HomePageSyles.teamName}>
                        {match.matchInfo.team1.teamSName}
                      </div>
                      <div className={HomePageSyles.teamScore}>
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
                    <div className={HomePageSyles.team}>
                      <div className={HomePageSyles.teamName}>
                        <img
                          src={getPlayerImageURL(
                            match.matchInfo.team2.imageId,
                            index
                          )}
                          alt="News"
                        />
                      </div>
                      <div className={HomePageSyles.teamName}>
                        {match.matchInfo.team2.teamSName}
                      </div>
                      <div className={HomePageSyles.teamScore}>
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
                  <div className={HomePageSyles.matchResult}>
                    <p>{match.matchInfo.status}</p>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
