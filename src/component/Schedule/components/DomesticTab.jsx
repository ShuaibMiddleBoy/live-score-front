import React, { useEffect, useState } from "react";
import style from "../Schedule.module.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const DomesticTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/domestic",
          {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              "X-RapidAPI-Host": `${import.meta.env.VITE_RAPIDAPI_HOST}`,
            },
          }
        );
        // Filter out objects with 'adDetail' and only keep 'scheduleAdWrapper'
        const filteredData = response.data.matchScheduleMap.filter(
          (item) => item.scheduleAdWrapper
        );
        setData(filteredData);
        setLoading(false);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.tabContainer}>
      {loading ? (
        <div className={style.spinnerContainer}>
          <div className={style.spinner}>
            <PulseLoader color={"#ff6b00"} loading={loading} size={15} />
          </div>
        </div>
      ) : (
        data.map((schedule, index) => (
          <div className={style.inner} key={index}>
            <div className={style.firstRow}>
              <h2>{schedule.scheduleAdWrapper.date}</h2>
            </div>
            <div className={style.secRow}>
              <div className={style.firstCol}>
                <h3 style={{ color: "#aaa" }}>
                  {schedule.scheduleAdWrapper.matchScheduleList[0].seriesName}
                </h3>
              </div>
              <div className={style.secCol}>
                <p>
                  {
                    schedule.scheduleAdWrapper.matchScheduleList[0].matchInfo[0]
                      .team1.teamName
                  }{" "}
                  vs{" "}
                  {
                    schedule.scheduleAdWrapper.matchScheduleList[0].matchInfo[0]
                      .team1.teamName
                  }
                  ,{" "}
                  {
                    schedule.scheduleAdWrapper.matchScheduleList[0].matchInfo[0]
                      .matchDesc
                  }
                </p>
                <p>
                  {
                    schedule.scheduleAdWrapper.matchScheduleList[0].matchInfo[0]
                      .venueInfo.ground
                  }
                  ,{" "}
                  {
                    schedule.scheduleAdWrapper.matchScheduleList[0].matchInfo[0]
                      .venueInfo.city
                  }
                </p>
              </div>
              <div className={style.thirdCol}>
                <span>
                  {new Date(
                    Number(
                      schedule.scheduleAdWrapper.matchScheduleList[0]
                        .matchInfo[0].startDate
                    )
                  ).toLocaleString()}{" "}
                  -{" "}
                  {new Date(
                    Number(
                      schedule.scheduleAdWrapper.matchScheduleList[0]
                        .matchInfo[0].endDate
                    )
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DomesticTab;
