import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai"; // Import the delete and info icons
import useWeather from "../customhook/useWeather";
import { removeCity, updateCity } from "../features/citySlice";
import { useDispatch } from "react-redux";

function AddCityCard({ city }) {
  const weather = useWeather({ city });
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center min-w-40 bg-opacity-30 bg-blue-300 dark:bg-opacity-50 dark:bg-gray-50 p-3 rounded-lg my-2"
      key={city}
    >
      {weather.loading && <p>Loading...</p>}
      {weather.error ? dispatch(removeCity(city)) : null}
      {weather.data ? (
        <>
          <div className="flex w-full justify-between items-center ">
            <button
              className="text-white dark:text-gray-700 flex items-center"
              onClick={() => setCity(city)}
            >
              <p className="font-mono text-sky-400 dark:text-gray-700">
                {weather && weather.data && weather.data.name}
              </p>
              <CiLocationOn
                size={15}
                className="text-sky-400 dark:text-gray-700 ml-0.5 "
              />
            </button>
            <button
              className="text-white dark:text-gray-700 flex items-center"
              onClick={() => {
                dispatch(removeCity(city));
              }}
            >
              <AiFillDelete size={20} className="ml-2 text-red-500" />
            </button>
          </div>
          <div className="flex items-center flex-col">
            <img
              src={`http://openweathermap.org/img/wn/${
                weather &&
                weather.data &&
                weather.data.weather &&
                weather.data.weather[0].icon
              }@2x.png`}
              alt="weather"
              className="w-20 h-20 "
            />
            <h1 className="text-white dark:text-gray-700 font-ubuntu">
              {weather &&
                weather.data &&
                weather.data.main &&
                Math.floor(weather.data.main.temp - 273.15)}{" "}
              °C
            </h1>
          </div>
          <button
            className="text-white dark:text-gray-700 flex items-center mt-2 font-mono"
            onClick={() => {
              dispatch(updateCity(city));
            }}
          >
            <AiOutlineInfoCircle size={20} className="mr-2" />
            See Details
          </button>
        </>
      ) : (
        <p>City not found</p>
      )}
    </div>
  );
}

export default AddCityCard;
