import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PulseLoader } from "react-spinners";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomePageSyles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [matchInfo, setMatchInfo] = useState({
    Domestic: [],
    International: [],
    League: [],
    Women: [],
  });
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(3); // State to hold slides per view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                    0,
                    1
                  )
                );
                totalSelectedMatches += 1;
                break;
              case "International":
                selectedMatches.International.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                    0,
                    2
                  )
                );
                totalSelectedMatches += 2;
                break;
              case "League":
                selectedMatches.League.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                    0,
                    1
                  )
                );
                totalSelectedMatches += 1;
                break;
              case "Women":
                selectedMatches.Women.push(
                  ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                    0,
                    2
                  )
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
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                      0,
                      matchesToAdd
                    )
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "International":
                  selectedMatches.International.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                      0,
                      matchesToAdd
                    )
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "League":
                  selectedMatches.League.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                      0,
                      matchesToAdd
                    )
                  );
                  totalSelectedMatches += matchesToAdd;
                  break;
                case "Women":
                  selectedMatches.Women.push(
                    ...matchType.seriesMatches[0].seriesAdWrapper.matches.slice(
                      0,
                      matchesToAdd
                    )
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
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    }, 3000); // Slide to the next card every 1 second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Update slides per view based on window width
      if (window.innerWidth < 700) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial slides per view
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 1000;
    return `${
      import.meta.env.VITE_BASE_URL
    }images/get-images/${imageId}?delay=${delay}`;
  };

  const goToMatchDetails = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className={HomePageSyles.mainContainer}>
      {windowWidth >= 700 ? (
        <React.Fragment>
          <KeyboardArrowLeftIcon
            style={{ color: "#aaa", fontSize: "45px", cursor: "pointer" }}
            onClick={goToPrevSlide}
          />
          <div className={HomePageSyles.PrimaryContainer}>
            {loading ? (
              <div className={HomePageSyles.spinnerContainer}>
                <div className={HomePageSyles.spinner}>
                  <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
                </div>
              </div>
            ) : (
              <Swiper
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={slidesPerView}
                navigation={{
                  prevEl: ".prevButton",
                  nextEl: ".nextButton",
                }}
                className="mySwiper"
                loop={true}
                loopAdditionalSlides={1}
                loopFillGroupWithBlank={true}
              >
                {/* Duplicate first slide at the end */}
                {Object.keys(matchInfo).map((matchType) =>
                  matchInfo[matchType].map((match, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() =>
                          goToMatchDetails(match.matchInfo.matchId)
                        }
                        className={HomePageSyles.matchCard}
                        style={{ minHeight: "230px" }}
                      >
                        <div className={HomePageSyles.matchHeader}>
                          <h2 className={HomePageSyles.matchMainHeading}>
                            {match.matchInfo.seriesName}
                          </h2>
                          <h3 className={HomePageSyles.matchPrimaryHeading}>
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
                                alt="Team 1"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team1.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team1Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team1Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team1Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team1Score?.inngs2 &&
                                match.matchScore?.team1Score?.inngs2?.runs !==
                                  undefined
                                  ? ` & ${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.wickets
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
                                alt="Team 2"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team2.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team2Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team2Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team2Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team2Score?.inngs2
                                  ? ` & ${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.wickets
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
                    </SwiperSlide>
                  ))
                )}
                {/* Duplicate last slide at the beginning */}
                {Object.keys(matchInfo).map((matchType) =>
                  matchInfo[matchType].map((match, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() =>
                          goToMatchDetails(match.matchInfo.matchId)
                        }
                        className={HomePageSyles.matchCard}
                        style={{ minHeight: "230px" }}
                      >
                        <div className={HomePageSyles.matchHeader}>
                          <h2 className={HomePageSyles.matchMainHeading}>
                            {match.matchInfo.seriesName}
                          </h2>
                          <h3 className={HomePageSyles.matchPrimaryHeading}>
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
                                alt="Team 1"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team1.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team1Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team1Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team1Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team1Score?.inngs2 &&
                                match.matchScore?.team1Score?.inngs2?.runs !==
                                  undefined
                                  ? ` & ${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.wickets
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
                                alt="Team 2"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team2.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team2Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team2Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team2Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team2Score?.inngs2
                                  ? ` & ${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.wickets
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
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            )}
          </div>
          <KeyboardArrowRightIcon
            style={{ color: "#aaa", fontSize: "45px", cursor: "pointer" }}
            onClick={goToNextSlide}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={HomePageSyles.PrimaryContainer}>
            {loading ? (
              <div className={HomePageSyles.spinnerContainer}>
                <div className={HomePageSyles.spinner}>
                  <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
                </div>
              </div>
            ) : (
              <Swiper
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={slidesPerView}
                navigation={{
                  prevEl: ".prevButton",
                  nextEl: ".nextButton",
                }}
                className="mySwiper"
                loop={true}
                loopAdditionalSlides={1}
                loopFillGroupWithBlank={true}
              >
                {/* Duplicate first slide at the end */}
                {Object.keys(matchInfo).map((matchType) =>
                  matchInfo[matchType].map((match, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() =>
                          goToMatchDetails(match.matchInfo.matchId)
                        }
                        className={HomePageSyles.matchCard}
                        style={{ minHeight: "230px" }}
                      >
                        <div className={HomePageSyles.matchHeader}>
                          <h2 className={HomePageSyles.matchMainHeading}>
                            {match.matchInfo.seriesName}
                          </h2>
                          <h3 className={HomePageSyles.matchPrimaryHeading}>
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
                                alt="Team 1"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team1.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team1Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team1Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team1Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team1Score?.inngs2 &&
                                match.matchScore?.team1Score?.inngs2?.runs !==
                                  undefined
                                  ? ` & ${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.wickets
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
                                alt="Team 2"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team2.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team2Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team2Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team2Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team2Score?.inngs2
                                  ? ` & ${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.wickets
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
                    </SwiperSlide>
                  ))
                )}
                {/* Duplicate last slide at the beginning */}
                {Object.keys(matchInfo).map((matchType) =>
                  matchInfo[matchType].map((match, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() =>
                          goToMatchDetails(match.matchInfo.matchId)
                        }
                        className={HomePageSyles.matchCard}
                        style={{ minHeight: "230px" }}
                      >
                        <div className={HomePageSyles.matchHeader}>
                          <h2 className={HomePageSyles.matchMainHeading}>
                            {match.matchInfo.seriesName}
                          </h2>
                          <h3 className={HomePageSyles.matchPrimaryHeading}>
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
                                alt="Team 1"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team1.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team1Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team1Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team1Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team1Score?.inngs2 &&
                                match.matchScore?.team1Score?.inngs2?.runs !==
                                  undefined
                                  ? ` & ${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team1Score?.inngs2
                                        ?.wickets
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
                                alt="Team 2"
                              />
                            </div>
                            <div className={HomePageSyles.teamName}>
                              {match.matchInfo.team2.teamSName}
                            </div>
                            <div className={HomePageSyles.teamScore}>
                              {`${
                                match.matchScore?.team2Score?.inngs1?.runs ?? ""
                              }${
                                match.matchScore?.team2Score?.inngs1?.wickets
                                  ? `-${match.matchScore?.team2Score?.inngs1?.wickets}`
                                  : ""
                              }${
                                match.matchScore?.team2Score?.inngs2
                                  ? ` & ${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.runs ?? ""
                                    }${
                                      match.matchScore?.team2Score?.inngs2
                                        ?.wickets
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
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
