import React, { useState, useEffect } from "react";
import axios from "axios";
import HomePageSyles from "./HomePage.module.css";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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

        // Filter and store matches in separate arrays based on matchType
        const domesticMatches = allMatches.find(
          (matchType) => matchType.matchType === "Domestic"
        );
        const internationalMatches = allMatches.find(
          (matchType) => matchType.matchType === "International"
        );
        const leagueMatches = allMatches.find(
          (matchType) => matchType.matchType === "League"
        );
        const womenMatches = allMatches.find(
          (matchType) => matchType.matchType === "Women"
        );

        const matches = {
          Domestic: domesticMatches
            ? domesticMatches.seriesMatches[0].seriesAdWrapper.matches
            : [],
          International: internationalMatches
            ? internationalMatches.seriesMatches[0].seriesAdWrapper.matches
            : [],
          League: leagueMatches
            ? leagueMatches.seriesMatches[0].seriesAdWrapper.matches
            : [],
          Women: womenMatches
            ? womenMatches.seriesMatches[0].seriesAdWrapper.matches
            : [],
        };

        setMatchInfo(matches);
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