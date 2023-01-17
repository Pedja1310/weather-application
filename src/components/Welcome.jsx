import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeatherForecast,
  selectLoading,
  setCoordinates,
} from "../store/weatherSlice";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const loading = useSelector(selectLoading);
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
      {loading === "loading" ? (
        <div className={styles.loaderContainer}>
          <ClipLoader color="#832233" size="64px" />
        </div>
      ) : (
        <>
          <h1 className={styles.header}>
            Weather forecast
            <br /> application
          </h1>
          <p className={styles.subheader}>
            Please click on button and allow browser to get your coordinates
          </p>
        </>
      )}
      <button className={styles.ctaBtn} onClick={getClientLocation}>
        Get coordinates
      </button>
    </div>
  );
};

export default Welcome;
