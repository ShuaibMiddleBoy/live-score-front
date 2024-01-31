import React, { useEffect, useState } from "react";
import style from "../CurrentFutureSeries.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const WomenTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/series/v1/women",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );
        setData(response.data.seriesMapProto || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.spinnerContainer}>
          <div className={style.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Month</th>
              <th>Series Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((seriesData, index) => (
              <tr key={index}>
                <td>{seriesData.date}</td>
                <td>
                  {seriesData.series.map((series, subIndex) => (
                    <div className={style.inner} key={subIndex}>
                      <div>{series.name}</div>
                      <div>
                        <span>
                          {new Date(
                            Number(series.startDt)
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(Number(series.endDt)).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default WomenTab;
