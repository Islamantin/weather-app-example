import React from "react";
import "../styles/weatherCard.scss";

interface WeatherCardProps {
  temperature: number;
  description: string;
  iconSrc: string;
  date: string;
  className?: string;
}

// Presentational component to show specific weather data 
const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  description,
  iconSrc,
  date,
  className,
}) => {
  const styles = className ? className : "";
  return (
    <div className={"card " + styles}>
      <p className="date">{date}</p>
      <div>
        <img className="icon" src={iconSrc} alt="Weather Icon" />
        <p className="temperature">{temperature}°C</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
