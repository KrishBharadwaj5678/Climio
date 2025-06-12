import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const Weather = () => {

  let [weatherData,setWeatherData] = useState(false);
  let inputRef = useRef();

  let allIcons = {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }

  let capatilizeError = (err)=>{
    return err.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  let search = async (city)=>{
    if(city === ""){
      toast.error("Enter City Name");
    }
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      let response = await fetch(url);
      let result = await response.json();
      if(!response.ok){
        toast.error(capatilizeError(result.message));
        return;
      }
      setWeatherData({
        humidity: result.main.humidity,
        windSpeed: result.wind.speed,
        temperature: Math.floor(result.main.temp),
        location: result.name,
        icon: allIcons[result.weather[0].icon] || clearIcon
      })
    } catch (error) {
      setWeatherData(false);
    }
  }

  useEffect(()=>{
    search("Delhi");
  },[])


  return (
      <div className='weather'>

       <ToastContainer/>

        {/* Top Section */}
        <div className="search-bar">
          <input type="text" placeholder='Search' ref={inputRef}/>
          <img src={SearchIcon} alt="Icon" onClick={()=>search(inputRef.current.value)}/>
        </div>
        
        {
          weatherData ? <>
            {/* Weather Icon */}
            <img src={weatherData.icon} alt="" className='weather-icon' />

            {/* Temperature */}
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>

            {/* Bottom Section */}
            <div className="weather-data">
              {/* Humidity */}
              <div className="col">
                <img src={humidityIcon} alt="Humidity" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              {/* Wind */}
              <div className="col">
                <img src={windIcon} alt="Wind" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind</span>
                </div>
              </div>
            </div>
          </> : <></>
        }

      </div>
  )
}

export default Weather