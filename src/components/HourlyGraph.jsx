import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useSelector } from "react-redux";
import { selectHourly } from "../store/weatherSlice";
import styles from "./HourlyGraph.module.css";

ChartJS.register(...registerables);

const HourlyGraph = () => {
  const hourly = useSelector(selectHourly);

  const temperatureData = hourly.data
    .filter((item, index) => index < 24)
    .map((item) => `${Math.round(item.temperature)}`);

  const temperatureLabels = hourly.data
    .filter((item, index) => index < 24)
    .map((item) => {
      const dateObj = new Date(item.time * 1000);
      const hours = dateObj.getHours();
      return `${hours + 1}h`;
    });

  const data = {
    labels: temperatureLabels,
    datasets: [
      {
        labels: "Hourly Weather",
        data: temperatureData,
        backgroundColor: "white",
        pointBorderColor: "#832233",
        fill: true,
        tension: 0.4,
        showLine: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // This hides all text in the legend and also the labels.
      },
    },
    scales: {
      y: {
        min: Math.min(...temperatureData) - 1,
        max: Math.max(...temperatureData) + 1,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <section className={styles.hourlyGraph}>
      <Line data={data} options={options} />
    </section>
  );
};

export default HourlyGraph;
