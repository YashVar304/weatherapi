// src/App.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { IoEyeOutline } from "react-icons/io5";
import { LuDroplet } from "react-icons/lu";
import useWeather from "./customhook/useWeather";
import useWeatherForecast from "./customhook/useWeatherForecast"; // Import the new custom hook
import { Gauge } from "lucide-react";
import { FaToggleOff, FaToggleOn, FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import InfoCard from "./components/InfoCard";
import AddCityCard from "./components/AddCityCard";
import WeatherForecast from "./components/WeatherForecast"; // Import the new component
import { toggleTheme } from "./features/themeSlice";
import { addCity, updateCity } from "./features/citySlice";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [searchAddCity, setSearchAddCity] = useState("");
  const [time, setTime] = useState("");

  const city = useSelector((state) => state.city.city);
  const cities = useSelector((state) => state.city.cityArray);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const weather = useWeather({ city });
  const forecast = useWeatherForecast({ city }); // Use the new custom hook

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen p-3 md:p-10 bg-gradient-to-br to-blue-500 from-white dark:from-gray-300 dark:to-black bg-cover bg-center">
      <div className="flex flex-wrap w-full h-full dark:bg-opacity-50 rounded-2xl dark:bg-slate-50 bg-blue-500 bg-opacity-50">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 p-5">
            {weather.loading && (
              <p className="text-white dark:text-black">Loading...</p>
            )}
            <div className="flex flex-col py-5 md:py-10 h-full">
              <div className="flex justify-between " style={{}}>
                <div className="flex items-center bg-white px-3 py-1 dark:bg-black dark:bg-opacity-70 rounded-3xl w-full">
                  <CiLocationOn size={25} className="dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full rounded-lg outline-none bg-transparent dark:text-gray-400"
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                  />
                  <button
                    className="text-black px-3 py-1 ml-2"
                    onClick={() => dispatch(updateCity(searchedCity))}
                  >
                    <CiSearch className="text-xl dark:text-gray-400" />
                  </button>
                </div>
                {theme === "light" ? (
                  <FaToggleOff
                    size={30}
                    className="text-white cursor-pointer ml-2"
                    onClick={themeHandler}
                  />
                ) : (
                  <FaToggleOn
                    size={30}
                    className="cursor-pointer ml-2"
                    onClick={themeHandler}
                  />
                )}
              </div>
              <div className="w-full h-full mt-5">
                <div className="flex justify-between px-5 items-center">
                  <p className="text-white text-md md:text-lg dark:text-gray-700 font-mono">
                    {Date().slice(0, 15)}
                  </p>
                  <p className="text-white text-md md:text-lg dark:text-gray-700 font-mono">
                    {time.slice(0, 8)}
                  </p>
                </div>
                {weather.error ? (
                  <div className="flex justify-center items-center h-56">
                    <p className="text-white dark:text-black">City not found</p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row justify-evenly items-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={`http://openweathermap.org/img/wn/${weather?.data?.weather?.[0]?.icon}@2x.png`}
                        alt="weather"
                        className="w-32 h-32 md:w-40 md:h-40"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                      <h1 className="text-white text-4xl md:text-6xl font-ubuntu dark:text-gray-700">
                        {weather?.data?.main &&
                          Math.floor(weather.data.main.temp - 273)}
                        °
                      </h1>
                      <h3 className="text-white text-lg md:text-xl mt-3 font-thin font-ubuntu dark:text-gray-700">
                        {weather?.data?.weather?.[0]?.main}
                      </h3>
                      <h1 className="text-white text-lg md:text-xl mt-3 font-ubuntu dark:text-gray-700">
                        {weather?.data?.name}
                      </h1>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2 mt-5">
                  <InfoCard
                    icon={
                      <LiaTemperatureLowSolid className="mr-2 text-sky-400 text-xl" />
                    }
                    name="Feels Like"
                    value={
                      weather?.data?.main &&
                      Math.floor(weather.data.main.feels_like - 273) + "°"
                    }
                  />
                  <InfoCard
                    icon={<Gauge className="mr-2 text-red-600" />}
                    name="Pressure"
                    value={
                      weather?.data?.main && weather.data.main.pressure + " hPa"
                    }
                  />
                  <InfoCard
                    icon={<IoEyeOutline className="mr-2 text-blue-500" />}
                    name="Visibility"
                    value={weather?.data?.visibility / 1000 + " km"}
                  />
                  <InfoCard
                    icon={<LuDroplet className="mr-2 text-blue-400" />}
                    name="Humidity"
                    value={
                      weather?.data?.main && weather.data.main.humidity + "%"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-5 flex flex-col-reverse md:flex-col">
            <div className="bg-black bg-opacity-70 rounded-2xl p-5 mt-3">
              <div className="flex justify-between items-center">
                <h1 className="text-white text-xl md:text-2xl mr-2 font-mono">
                  Cities
                </h1>
                <div className="flex items-center justify-center">
                  <div className="flex items-center bg-white px-3 py-1 dark:bg-black dark:bg-opacity-70 rounded-3xl w-full">
                    <CiLocationOn
                      size={25}
                      className="dark:text-gray-400 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Add City"
                      className="w-full rounded-lg outline-none bg-transparent dark:text-gray-400"
                      value={searchAddCity}
                      onChange={(e) => setSearchAddCity(e.target.value)}
                    />
                    <button
                      className="text-black px-3 py-1 ml-2"
                      onClick={() => {
                        dispatch(addCity(searchAddCity));
                        setSearchAddCity("");
                      }}
                    >
                      <IoIosAdd className="text-xl dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="scroll-container max-h-96 overflow-y-auto mt-5">
                {cities &&
                  cities.map((city, index) => (
                    <AddCityCard key={index} city={city} />
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 bg-opacity-30 rounded-2xl mt-4">
              <div className="w-full md:w-[48%] flex bg-opacity-70 bg-black p-5 rounded-2xl">
                <div className="flex flex-col justify-between flex-1">
                  <h1 className="text-white text-lg md:text-xl mb-5 font-mono">
                    Wind
                  </h1>
                  <div className="flex flex-col justify-between flex-[1]">
                    <div className="flex flex-col">
                      <h1 className="text-white text-md md:text-lg font-ubuntu">
                        Speed
                      </h1>
                      <h1 className="text-white text-sm md:text-md font-ubuntu">
                        {weather?.data?.wind?.speed} m/s
                      </h1>
                    </div>
                    <hr className="my-2" />
                    <div className="flex flex-col">
                      <h1 className="text-white text-md md:text-lg font-ubuntu">
                        Degree
                      </h1>
                      <h1 className="text-white text-sm md:text-md font-ubuntu">
                        {weather?.data?.wind?.deg}°
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center flex-[2]">
                  <FaWind size={60} className="text-sky-400" />
                </div>
              </div>
              <div className="w-full md:w-[48%] flex bg-opacity-70 bg-black p-5 rounded-2xl">
                <div className="flex flex-col w-full">
                  <h1 className="text-white text-lg md:text-xl mb-5 font-mono">
                    Sunrise & Sunset
                  </h1>
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-white text-md md:text-lg font-ubuntu">
                          Sunrise
                        </p>
                        <p className="text-white text-sm md:text-md font-ubuntu">
                          {weather?.data?.sys &&
                            new Date(
                              weather.data.sys.sunrise * 1000
                            ).toLocaleTimeString()}
                        </p>
                      </div>
                      <FiSunrise className="text-orange-400 mr-5" size={40} />
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-white text-md md:text-lg font-ubuntu">
                          Sunset
                        </p>
                        <p className="text-white text-sm md:text-md font-ubuntu">
                          {weather?.data?.sys &&
                            new Date(
                              weather.data.sys.sunset * 1000
                            ).toLocaleTimeString()}
                        </p>
                      </div>
                      <FiSunset className="text-orange-400 mr-5" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-5">
          <div className="bg-opacity-70 rounded-2xl mt-4">
            <WeatherForecast forecast={forecast} />{" "}
            {/* Add the forecast component */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
