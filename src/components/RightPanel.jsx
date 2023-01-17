import React from "react";
import { useSelector } from "react-redux";
import { selectCity, selectCurrently } from "../store/weatherSlice";
import styles from "./RightPanel.module.css";
import HourlyGraph from "./HourlyGraph";
import DailyForecast from "./DailyForecast";
import Welcome from "./Welcome";

const RightPanel = () => {
  const currently = useSelector(selectCurrently);

  return (
    <section className={styles.container}>
      {Object.keys(currently).length === 0 ? (
        <Welcome />
      ) : (
        <>
          <div className={styles.topContainer}>
            {Math.round(currently.temperature)} <span>°C</span>
          </div>
          <div className={styles.middleContainer}>
            <HourlyGraph />
          </div>
          <div className={styles.bottomContainer}>
            <DailyForecast />
          </div>
        </>
      )}
    </section>
  );
};

export default RightPanel;
