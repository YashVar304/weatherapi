// src/components/WeatherForecast.js
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import moment from "moment";

const WeatherForecast = ({ forecast }) => {
  if (forecast.loading) {
    return <p className="text-white dark:text-black">Loading forecast...</p>;
  }

  if (forecast.error) {
    return (
      <p className="text-white dark:text-black">Error: {forecast.error}</p>
    );
  }

  if (!forecast.data) {
    return (
      <p className="text-white dark:text-black">No forecast data available</p>
    );
  }

  const labels = forecast.data.list.map((item) => {
    return window.innerWidth < 640
      ? moment(item.dt_txt).format("ddd")
      : moment(item.dt_txt).format("ddd, hA"); // Responsive date format
  });

  const temperatures = forecast.data.list.map((item) => {
    return item.main.temp - 273.15; // Convert from Kelvin to Celsius
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3, // smooth lines
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: window.innerWidth < 640 ? 10 : 12, // Responsive font size
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "white",
          font: {
            size: window.innerWidth < 640 ? 10 : 12, // Responsive font size
          },
          maxTicksLimit: 5, // Limit the number of ticks
          autoSkip: false,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: window.innerWidth < 640 ? 10 : 12, // Responsive font size
          },
          maxTicksLimit: 7, // Limit the number of ticks
          autoSkip: true,
          callback: function (value, index) {
            // Show only every 4th label to reduce clutter
            return index % 4 === 0 ? this.getLabelForValue(value) : "";
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="bg-black bg-opacity-70 rounded-2xl p-5">
      <h2 className="text-white  text-base md:text-lg lg:text-xl font-ubuntu mb-4">
        7-Day Weather Forecast
      </h2>
      <div className="relative h-40 md:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeatherForecast;
