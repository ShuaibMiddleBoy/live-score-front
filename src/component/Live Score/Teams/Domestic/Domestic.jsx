import React, { useEffect, useState } from "react";
import DomesticStyles from "./Domestic.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function Domestic() {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/domestic",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );
        setTeamsData(response.data.list.slice(1, 50));
        setLoading(false);
        console.log(response.data.list);
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
    <div className={DomesticStyles.primaryDomestic}>
      {loading ? (
        <div className={DomesticStyles.spinnerContainer}>
          <div className={DomesticStyles.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className={DomesticStyles.domestic}>
          {teamsData.map((team, index) => (
            <div className={DomesticStyles.team} key={index}>
              <img
                src={getPlayerImageURL(team.imageId, index)}
                alt={team.teamName}
                className={DomesticStyles.flag}
              />
              <span className={DomesticStyles.name}>{team.teamName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
