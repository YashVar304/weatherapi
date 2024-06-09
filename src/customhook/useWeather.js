import { useEffect, useState } from "react";

function useWeather({city}){
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const apiKey="fcef69b40c017531b6a6e6bf9f0c1d84"
    useEffect(()=>{
        if(city){
            setLoading(true);
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then((res)=>{
                if(!res.ok){
                    setData(null);
                    throw new Error("City not found");

                }
                return res.json();})
            .then((data)=>{
                setData(data);
                setError(null);
                setLoading(false);
            })
            .catch((error)=>{
                setData(null);
                setError(error);
                setLoading(false);
            })
        }
        else{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
                    .then((res)=>{
                        if(!res.ok){
                            throw new Error("City not found");
                        }
                        return res.json();
                    }
                        )
                    .then((data)=>{
                        setData(data);
                        setError(null);
                        setLoading(false);
                    })
                    .catch((error)=>{
                        setError(error);
                        setData(null)
                        setLoading(false);
                    })
                })
            }
        }
    },[city])
    
    
    return {data,loading,error};
}
export default useWeather;