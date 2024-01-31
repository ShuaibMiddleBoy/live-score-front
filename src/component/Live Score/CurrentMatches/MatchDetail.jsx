import React, { useEffect, useState } from "react";
import styles from "./MatchDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState([]);
  const [innings, setInnings] = useState([]);
  const [commentaryData, setCommentaryData] = useState([]);
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

        const commentaryResponse = await axios.get(
          `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/comm`,
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );

        const matchData = matchResponse.data;
        const formattedCommentaryData =
          commentaryResponse.data.commentaryList.map((commentary) => ({
            ...commentary,
            commText: commentary.commText.replace("B0$", ""),
          }));

        setMatch(matchData);
        setInnings(matchData.scoreCard);
        console.log(formattedCommentaryData);
        setCommentaryData(formattedCommentaryData);
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
    // Filter out players with outDesc as "not out" or "batting"
    const filteredBatsmen = Object.values(batsmenData).filter(
      (player) => player.outDesc === "not out" || player.outDesc === "batting"
    );

    return (
      <table className={styles.batingTable}>
        <thead>
          <tr>
            <th>Batter</th>
            <th>R</th>
            <th>B</th>
            <th>4s</th>
            <th>6s</th>
            <th>SR</th>
          </tr>
        </thead>
        <tbody>
          {filteredBatsmen.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
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
    // Filter out bowlers who are currently bowling (overs in decimal form)
    const filteredBowlers = Object.values(bowlersData).filter((bowler) => {
      const overs = parseFloat(bowler.overs);
      return !Number.isInteger(overs);
    });

    return (
      <table className={styles.bowlerTable}>
        <thead>
          <tr>
            <th>Bowler</th>
            <th>O</th>
            <th>M</th>
            <th>R</th>
            <th>W</th>
            <th>NB</th>
            <th>WD</th>
            <th>Econ</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(filteredBowlers).map((bowler, bowlerIndex) => (
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
          <p>
            <Link
              to={`/match-details/${matchId}/full-scorecard`}
              className={styles.customLink}
            >
              Full Scorecard
            </Link>
          </p>
          {Object.values(match).map((match, matchIndex) => (
            <div key={matchIndex} className={styles.container}>
              <div className={styles.inner1}>
                <h2 className={styles.seriesName} style={{ color: "#ff6b00" }}>
                  {match.seriesName} {match.matchDescription}
                </h2>
                <h3 className={styles.teams} style={{ color: "#aaa" }}>
                  {match.team1 && match.team1.shortName
                    ? `${match.team1.shortName}`
                    : ""}
                  {"     "}
                  {match.team2 && match.team2.shortName
                    ? `${match.team2.shortName}`
                    : ""}
                </h3>
              </div>
              <p style={{ color: "#aaa" }}>{match.status}</p>
            </div>
          ))}
          {innings.map((inning, index) => (
            <div key={index}>{renderScoreDetails(inning)}</div>
          ))}
          <div className={styles.scorecard}>
            {innings.map((inning, index) => (
              <div key={index} className={styles.fullScoredContainer}>
                <div className={styles.section}>
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
          <div className={styles.commentary}>
            {commentaryData.map((commentary, index) => (
              <div key={index}>
                <div className={styles.commentEntry}>
                  <div className={styles.commentTime}>
                    {commentary.timestamp &&
                      new Date(commentary.timestamp).toLocaleString()}
                  </div>
                  <div className={styles.commentText}>
                    {commentary.commText ? (
                      commentary.commText
                    ) : (
                      <span>Break Time...</span>
                    )}
                  </div>
                </div>
                {commentary.overSummary && (
                  <div className={styles.overSummary}>
                    <table>
                      <tbody>
                        <tr>
                          {Object.entries(commentary.overSummary).map(
                            ([key, value], idx) => (
                              <React.Fragment key={idx}>
                                <td style={{ color: "#ff6b00" }}>{key}</td>
                                <td>{value}</td>
                              </React.Fragment>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MatchDetail;
