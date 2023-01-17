import React, { useEffect } from "react";
import styles from "./LeftPanel.module.css";
import { ReactSkycon } from "react-skycons-extended";
import ClipLoader from "react-spinners/ClipLoader";
import { formatDate, formatIconName } from "../helpers/helerFunctions";
import {
  selectCity,
  selectCoordinates,
  selectCountry,
  selectCurrently,
} from "../store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserCity } from "../store/weatherSlice";

const LeftPanel = () => {
  const currently = useSelector(selectCurrently);
  const coordinates = useSelector(selectCoordinates);
  const city = useSelector(selectCity);
  const country = useSelector(selectCountry);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(coordinates).length > 0) dispatch(getUserCity(coordinates));
  }, [coordinates]);

  return (
    <section className={styles.container}>
      {Object.keys(currently).length > 0 ? (
        <>
          <div className={styles.topContainer}>
            <ReactSkycon
              icon={formatIconName(currently.icon)}
              color={"white"}
              size="160"
            />
          </div>
          <div className={styles.middleContainer}>
            <p>{currently.summary}</p>
          </div>
          <div className={styles.bottomContainer}>
            {!city ? (
              <ClipLoader color="white" />
            ) : (
              <>
                <p>
                  {city}, {country}
                </p>
                <p>{formatDate(currently.time * 1000)}</p>
              </>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default LeftPanel;
