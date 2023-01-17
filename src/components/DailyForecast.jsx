import React from "react";
import { useSelector } from "react-redux";
import { selectDaily } from "../store/weatherSlice";
import styles from "./DailyForecast.module.css";
import DailyForecastCard from "./DailyForecastCard";

const arr = [1, 2, 3];

const DailyForecast = () => {
  const daily = useSelector(selectDaily);

  const nextThreeDays = daily.data.slice(1, 4);

  return (
    <div className={styles.dailyForcastContainer}>
      {nextThreeDays.map((item) => {
        return <DailyForecastCard key={item.time} dailyForecast={item} />;
      })}
    </div>
  );
};

export default DailyForecast;
