import React, { useEffect, useState } from "react";
import styles from "./fullScores.module.css";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";

const FullScorecard = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState([]);
  const [innings, setInnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchResponse = await axios.get(
          `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );

        const matchData = matchResponse.data;

        setMatch(matchData);
        setInnings(matchData.scoreCard);
        console.log(matchData.scoreCard);
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
  }, [matchId]);

  const renderScoreDetails = (inning) => {
    if (inning && inning.scoreDetails) {
      const { runs, wickets, overs } = inning.scoreDetails;
      return (
        <p style={{ color: "#aaa" }}>
          {runs}/{wickets} (overs: {overs})
        </p>
      );
    } else {
      return null;
    }
  };
  const renderBattingTable = (batsmenData) => {
    return (
      <table className={styles.batingTable}>
        <thead>
          <tr>
            <td>Batter</td>
            <td>R</td>
            <td>B</td>
            <td>4s</td>
            <td>6s</td>
            <td>SR</td>
          </tr>
        </thead>
        <tbody>
          {Object.values(batsmenData).map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td className={styles.bts}>
                <span>
                  {player.batName}
                  {player.isCaptain && <span> (c)</span>}
                  {player.isKeeper && <span> (wk)</span>}
                  {player.outDesc === "not out" && <span> *</span>}
                </span>
                {player.outDesc && <span> {player.outDesc}</span>}
              </td>
              <td>{player.runs}</td>
              <td>{player.balls}</td>
              <td>{player.fours}</td>
              <td>{player.sixes}</td>
              <td>{player.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to render fall of wickets for an inning
  const renderFallOfWickets = (wicketsData) => {
    return (
      <div className={styles.fallOfWickts}>
        {Object.values(wicketsData).map((wicket, wicketIndex) => (
          <span key={wicketIndex}>
            <span style={{ color: "#ff6b00" }}>
              {wicket.wktRuns}-{wicket.wktNbr}
            </span>
            <span style={{ color: "#aaa" }}>
              ({wicket.batName},{wicket.wktOver})
            </span>
            {wicketIndex < Object.values(wicketsData).length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    );
  };

  // Function to render bowling table for an inning
  const renderBowlingTable = (bowlersData) => {
    return (
      <table className={styles.bowlerTable}>
        <thead>
          <tr>
            <td>Bowler</td>
            <td>O</td>
            <td>M</td>
            <td>R</td>
            <td>W</td>
            <td>NB</td>
            <td>WD</td>
            <td>Econ</td>
          </tr>
        </thead>
        <tbody>
          {Object.values(bowlersData).map((bowler, bowlerIndex) => (
            <tr key={bowlerIndex}>
              <td>
                {bowler.bowlName}
                {bowler.isCaptain && <span> (c)</span>}
              </td>
              <td>{bowler.overs}</td>
              <td>{bowler.maidens}</td>
              <td>{bowler.runs}</td>
              <td>{bowler.wickets}</td>
              <td>{bowler.no_balls}</td>
              <td>{bowler.wides}</td>
              <td>{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.combinedComponent}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <>
          {Object.values(match).map((match, matchIndex) => (
            <div key={matchIndex} className={styles.container}>
              <div className={styles.inner1}>
                <h2 className={styles.seriesName}>
                  {match.seriesName} {match.matchDescription}
                </h2>
                <h3 className={styles.teams}>
                  {match.team1 && match.team1.name
                    ? `${match.team1.name} VS `
                    : ""}
                  {match.team2 && match.team2.shortName
                    ? `${match.team2.name}`
                    : ""}
                </h3>
              </div>
              <p className={styles.status}>{match.status}</p>
            </div>
          ))}
          <div className={styles.scorecard}>
            {innings.map((inning, index) => (
              <div key={index} className={styles.fullScoredContainer}>
                <div className={styles.inner}>
                  <h3>Inning {index + 1}</h3>
                  <div className={styles.section}>
                    {renderScoreDetails(inning)}
                  </div>
                </div>
                <div className={styles.section}>
                  {renderScoreDetails(inning.scoreDetails)}
                  {renderBattingTable(inning.batTeamDetails.batsmenData)}
                </div>
                <div className={styles.fallOfWicktsContainer}>
                  <h3>Fall of Wickets</h3>
                  {renderFallOfWickets(inning.wicketsData)}
                </div>
                <div className={styles.bowlerContainer}>
                  {renderBowlingTable(inning.bowlTeamDetails.bowlersData)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FullScorecard;
