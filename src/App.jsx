// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { IoEyeOutline } from "react-icons/io5";
import { LuDroplet, LuDroplets } from "react-icons/lu";
import useWeather from "./customhook/useWeather";
import { Gauge } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import InfoCard from "./components/InfoCard";
import AddCityCard from "./components/AddCityCard";
import { FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { toggleTheme } from "./features/themeSlice";
import { addCity, updateCity } from "./features/citySlice";
import { IoIosAdd } from "react-icons/io";

function App() {
  // State variables
  const [searchedCity, setSearchedCity] = useState("");
  const [searchAddCity, setSearchAddCity] = useState("");
  const [time, setTime] = useState("");

  // Redux state variables
  const city = useSelector((state) => state.city.city);
  const cities = useSelector((state) => state.city.cityArray);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  // Custom hook for fetching weather data
  const weather = useWeather({ city });
  const date = new Date();

  // Effect to update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Effect to load cities from localStorage on initial render
  useEffect(() => {
    let cities = JSON.parse(localStorage.getItem("cities"));
    if (cities && cities.length > 0) {
      for (let i = 0; i < cities.length; i++) {
        dispatch(addCity(cities[i]));
      }
    }
  }, []);

  // Effect to save cities to localStorage whenever cities state changes
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  // Function to handle theme toggling
  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  // Effect to set theme class on HTML element whenever theme changes
  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  // Render JSX
  return (
    <div className="min-h-screen p-3 md:p-10 bg-gradient-to-br to-blue-500 from-white dark:from-gray-300 dark:to-black bg-cover bg-center">
      <div className="flex flex-wrap flex-col-responsive w-full h-full dark:bg-opacity-50 rounded-2xl dark:bg-slate-50 bg-blue-500 bg-opacity-50">
        <div className=" w-full md:w-[40%]">
          {weather.loading && (
            <p className="text-white dark:text-black ">Loading...</p>
          )}
          <div className="flex flex-col p-5 md:p-10 h-full">
            {/* Search bar for location */}
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center bg-white px-3 py-1 dark:bg-black dark:bg-opacity-70 rounded-3xl">
                <CiLocationOn size={25} className="dark:text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full rounded-lg outline-none bg-transparent dark:text-gray-400 "
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
              {/* Theme toggle button */}
              {theme === "light" ? (
                <FaToggleOff
                  size={30}
                  className="text-white cursor-pointer"
                  onClick={themeHandler}
                />
              ) : (
                <FaToggleOn
                  size={30}
                  className=" cursor-pointer"
                  onClick={themeHandler}
                />
              )}
            </div>
            {/* Display date and time */}
            <div className="w-full h-full mt-5">
              <div className="flex justify-between px-5 items-center">
                <h1 className="text-white dark:text-gray-700">
                  {Date().slice(0, 15)}
                </h1>
                <p className="text-white text-lg dark:text-gray-700">
                  {time.slice(0, 8)}
                </p>
              </div>
              {/* Display weather information */}
              {weather.error ? (
                <div className="flex justify-center items-center h-56">
                  <p className="text-white dark:text-black ">City not found</p>
                </div>
              ) : (
                <div className="flex justify-evenly items-center">
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://openweathermap.org/img/wn/${
                        weather &&
                        weather.data &&
                        weather.data.weather &&
                        weather.data.weather[0].icon
                      }@2x.png`}
                      alt="weather"
                      className="w-40 h-40"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center py-10">
                    <h1 className="text-white text-5xl md:text-6xl font-ubuntu dark:text-gray-700">
                      {weather &&
                        weather.data &&
                        weather.data.main &&
                        Math.floor(weather.data.main.temp - 273)}
                      °
                    </h1>
                    <h3 className="text-white text-xl mt-3 mr-5 font-thin font-ubuntu dark:text-gray-700">
                      {weather &&
                        weather.data &&
                        weather.data.weather &&
                        weather.data.weather[0].main}
                    </h3>
                    <h1 className="text-white text-xl mt-3 mr-5 font-ubuntu dark:text-gray-700">
                      {weather &&
                        weather.data &&
                        weather.data.name &&
                        weather.data.name}
                    </h1>
                  </div>
                </div>
              )}
              {/* Display additional weather information */}
              <div className="flex flex-col gap-2">
                <InfoCard
                  icon={<LiaTemperatureLowSolid className="mr-2" />}
                  name="Feels Like"
                  value={
                    weather &&
                    weather.data &&
                    weather.data.main &&
                    Math.floor(weather.data.main.feels_like - 273) + "°"
                  }
                />
                <InfoCard
                  icon={<Gauge className="mr-2" />}
                  name="Pressure"
                  value={
                    weather &&
                    weather.data &&
                    weather.data.main &&
                    weather.data.main.pressure + " hPa"
                  }
                />
                <InfoCard
                  icon={<IoEyeOutline className="mr-2" />}
                  name="Visibility"
                  value={
                    weather &&
                    weather.data &&
                    weather.data.visibility / 1000 + " km"
                  }
                />
                <InfoCard
                  icon={<LuDroplet className="mr-2" />}
                  name="Humidity"
                  value={
                    weather &&
                    weather.data &&
                    weather.data.main &&
                    weather.data.main.humidity + "%"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%]">
          <div className="p-5 md:p-10">
            {/* Add City section */}
            <div className="bg-black bg-opacity-30 rounded-2xl p-5 ">
              <div className="flex justify-between">
                <h1 className="text-white text-2xl">Cities</h1>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center bg-white px-3 py-1 dark:bg-black dark:bg-opacity-70 rounded-3xl">
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
                      <IoIosAdd className="text-xl dark:text-gray-400 " />
                    </button>
                  </div>
                </div>
              </div>
              {/* List of added cities */}
              <div className="scroll-container">
                {cities &&
                  cities.map((city) => <AddCityCard key={city} city={city} />)}
              </div>
            </div>
            {/* Additional weather information */}
            <div className="flex mt-4 flex-wrap gap-3 bg-opacity-30 rounded-2xl">
              {/* Wind information */}
              <div className="w-full md:w-[48%] flex bg-opacity-70 bg-black p-5 rounded-2xl ">
                <div className="flex flex-col justify-between flex-[1] ">
                  <h1 className="text-white text-xl mb-5 font-mono">Wind</h1>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col ">
                      <h1 className="text-white text-lg  font-ubuntu">Speed</h1>
                      <h1 className="text-white text-md font-ubuntu">
                        {weather &&
                          weather.data &&
                          weather.data.wind &&
                          weather.data.wind.speed}{" "}
                        m/s
                      </h1>
                    </div>
                    <hr />
                    <div className="flex flex-col ">
                      <h1 className="text-white text-lg font-ubuntu">Degree</h1>
                      <h1 className="text-white text-md font-ubuntu">
                        {weather &&
                          weather.data &&
                          weather.data.wind &&
                          weather.data.wind.deg}
                        °
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center flex-[2]">
                  <FaWind size={60} className="text-white" />
                </div>{" "}
              </div>
              {/* Sunrise & Sunset information */}
              <div className="w-full md:w-[48%]  flex bg-opacity-70 bg-black p-5 rounded-2xl ">
                <div className="flex flex-col w-full ">
                  <h1 className="text-white text-xl mb-5 font-mono">
                    Sunrise & Sunset
                  </h1>
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between items-center ">
                      <div className="flex flex-col">
                        <p className="text-white text-lg font-ubuntu">
                          Sunrise
                        </p>
                        <p className="text-white text-md font-ubuntu">
                          {weather &&
                            weather.data &&
                            weather.data.sys &&
                            new Date(
                              weather.data.sys.sunrise * 1000
                            ).toLocaleTimeString()}
                        </p>
                      </div>
                      <FiSunrise className=" text-white mr-5" size={40} />
                    </div>
                    <hr />
                    <div className="flex justify-between items-center ">
                      <div className="flex flex-col ">
                        <p className="text-white text-lg font-ubuntu">Sunset</p>
                        <p className="text-white text-md font-ubuntu">
                          {weather &&
                            weather.data &&
                            weather.data.sys &&
                            new Date(
                              weather.data.sys.sunset * 1000
                            ).toLocaleTimeString()}
                        </p>
                      </div>
                      <FiSunset className=" text-white mr-5" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
