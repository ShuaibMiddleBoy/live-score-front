import React, { useEffect, useState } from "react";
import InternationalStyles from "./International.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function International() {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );

        // Filter out the data with key "13" (Associate Teams)
        const filteredData = response.data.list.filter(
          (team) => team.teamName !== "Associate Teams"
        );

        setTeamsData(filteredData.slice(1, 38));
        console.log(filteredData.slice(1, 20));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getPlayerImageURL = (imageId, index) => {
    const delay = index * 8000;
    return `${
      import.meta.env.VITE_BASE_URL
    }images/get-images/${imageId}?delay=${delay}`;
  };

  return (
    <div className={InternationalStyles.primaryInternational}>
      {loading ? (
        <div className={InternationalStyles.spinnerContainer}>
          <div className={InternationalStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={InternationalStyles.international}>
          {teamsData.map((team, index) => (
            <div className={InternationalStyles.team} key={index}>
              <img
                src={getPlayerImageURL(team.imageId, index)}
                alt={team.teamName}
                className={InternationalStyles.flag}
              />
              <span className={InternationalStyles.name}>{team.teamName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
