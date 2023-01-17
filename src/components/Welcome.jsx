import React from "react";
import { useDispatch } from "react-redux";
import { getWeatherForecast, setCoordinates } from "../store/weatherSlice";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const dispatch = useDispatch();

  const getClientLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latLng = {};
      latLng.lat = position.coords.latitude;
      latLng.lng = position.coords.longitude;

      dispatch(getWeatherForecast(latLng));
      dispatch(setCoordinates(latLng));
    });
  };

  return (
    <div className={styles.welcome}>
      <h1 className={styles.header}>
        Weather forecast
        <br /> application
      </h1>
      <p className={styles.subheader}>
        Please click on button and allow browser to get your coordinates
      </p>
      <button className={styles.ctaBtn} onClick={getClientLocation}>
        Get coordinates
      </button>
    </div>
  );
};

export default Welcome;
