import React from "react";
import { ReactSkycon } from "react-skycons-extended";
import { formatIconName } from "../helpers/helerFunctions";
import styles from "./DailyForecastCard.module.css";

const DailyForecastCard = ({ dailyForecast }) => {
  const day = new Date(dailyForecast.time * 1000).toLocaleString("en-us", {
    weekday: "short",
  });

  return (
    <div className={styles.cardContainer}>
      <div className={styles.upperContainer}>
        <ReactSkycon
          icon={formatIconName(dailyForecast.icon)}
          color={"#832233"}
          size="50"
        />
        <p>{day}</p>
      </div>
      <div className={styles.lowerContainer}>
        <p className={styles.maxTemp}>
          {Math.round(dailyForecast.temperatureMax)}°C
        </p>
        <p className={styles.lowTemp}>
          {Math.round(dailyForecast.temperatureMin)}°C
        </p>
      </div>
    </div>
  );
};

export default DailyForecastCard;
