// src/customhook/useWeatherForecast.js
import { useState, useEffect } from 'react';

const useWeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState({ loading: true, data: null, error: null });
  const apiKey = 'fcef69b40c017531b6a6e6bf9f0c1d84';  // Use the environment variable

  useEffect(() => {
    if (city && apiKey) {
      const fetchForecast = async () => {
        try {
          setForecast({ loading: true, data: null, error: null });
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched forecast data:', data);  // Debug log
          setForecast({ loading: false, data, error: null });
        } catch (error) {
          console.error('Error fetching forecast:', error);  // Debug log
          setForecast({ loading: false, data: null, error: error.message });
        }
      };
      fetchForecast();
    }
    if(!city){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
                .then((res)=>{
                    if(!res.ok){
                        throw new Error("City not found");
                    }
                    return res.json();
                })
                .then((data)=>{
                    setForecast({loading:false,data,error:null});
                })
                .catch((error)=>{
                    setForecast({loading:false,data:null,error:error.message});
                })
            })
        }
    }
    
  }, [city, apiKey]);

  return forecast;
};

export default useWeatherForecast;
