import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherForecast } from "../store/weatherSlice";
import {} from "../store/weatherSlice";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import styles from "./WeatherApp.module.css";

const WeatherApp = () => {
  return (
    <div className={styles.container}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default WeatherApp;
