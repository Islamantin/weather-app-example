import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./weatherCard";
import "../styles/weatherPanel.scss";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface WeatherData {
  temperature: number;
  description: string;
  iconSrc: string;
  dateLabel: string;
}

interface WeatherPanelProps {
  label: string;
  lat: number;
  lon: number;
}

// Repesents all the weather data by specified location
const WeatherPanel: React.FC<WeatherPanelProps> = ({ label, lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<WeatherData[]>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const castResponseData = (data: any): WeatherData => {
      const temperature = Math.floor(data.main.temp);
      const description = data.weather[0].description;
      const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const date = new Date(data.dt_txt);
      const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`;
      return {
        temperature,
        description,
        iconSrc,
        dateLabel,
      };
    };

    // Current weather request
    const fetchWeatherData = async () => {
      const request = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      request.catch((e) => {
        setError(e.message);
      });
      const response = await request;
      try {
        setWeatherData(castResponseData(response.data));
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      }
    };

    // Requesting 5 days weather forecast
    const fetchForecastData = async () => {
      const request = axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      request.catch((e) => {
        setError(e.message);
      });
      const response = await request;
      try {
        const days = (response.data.list as any[])
          .filter((value, ind) => {
            if (ind < 2) return false;
            return (ind - 2) % 8 === 0;
          })
          .map((val, ind) => castResponseData(val));
        setForecastData(days);
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      }
    };

    fetchWeatherData().then(fetchForecastData);
  }, [label, lat, lon]);

  return (
    <>
      {weatherData ? (
        <>
          <p>{label}</p>
          <WeatherCard
            temperature={weatherData.temperature}
            description={weatherData.description}
            iconSrc={weatherData.iconSrc}
            date={"NOW"}
          />
          {forecastData && (
            <div className="forecast">
              {forecastData.map((val, ind) => (
                <WeatherCard
                  key={"forecast-" + ind}
                  className="small"
                  temperature={val.temperature}
                  description={val.description}
                  iconSrc={val.iconSrc}
                  date={val.dateLabel}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default WeatherPanel;
