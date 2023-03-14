import { useState } from "react";
import "./styles/app.scss";
import axios from "axios";
import WeatherPanel from "./components/weatherPanel";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Main component
// Shows input field for location search and list of options to select from
// After location being selected it renders WeatherPanel component
function App() {
  const [locationData, setLocationData] = useState<any>(undefined);
  const [input, setInput] = useState("London");
  const [options, setOptions] = useState<any[] | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [optionHighlightId, setOptionHighlightId] = useState(-1);

  const updateLocationSearch = async (input: string) => {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
    );
    setOptions(response.data);
  };

  const selectLocation = (location: any) => {
    setInput("");
    setOptions([]);
    setOptionHighlightId(-1);
    setLocationData(location);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="form">
          <input
            // Keyboard controlls
            onKeyDown={(e) => {
              if (!options) return;
              switch (e.code) {
                case "ArrowUp":
                  if (optionHighlightId < 0) setOptionHighlightId(0);
                  if (optionHighlightId > 0)
                    setOptionHighlightId(optionHighlightId - 1);
                  break;
                case "ArrowDown":
                  if (optionHighlightId < options.length - 1)
                    setOptionHighlightId(optionHighlightId + 1);
                  break;
                case "Enter":
                  if (options.length > 0) {
                    let id = optionHighlightId;
                    if (id < 0) id = 0;
                    selectLocation(options[id]);
                  }
                  break;
              }
            }}
            className="text-field"
            type="text"
            value={input}
            // When input changed location options to choose from are updated
            onChange={async (e) => {
              const value = e.target.value;
              setInput(value);
              if (value.length > 1) updateLocationSearch(value);
            }}
            placeholder="Enter city name"
            onFocus={() => {
              if (input.length > 1 && !options) updateLocationSearch(input);
              setShowOptions(true);
            }}
            onBlur={() => setTimeout(() => setShowOptions(false), 200)}
          />
        </div>
        {options && options.length > 0 && showOptions && (
          <ul
            onPointerEnter={() => {
              setOptionHighlightId(-1);
            }}
          >
            {options &&
              options.map((val, id) => (
                <li
                  className={
                    optionHighlightId > -1
                      ? id === optionHighlightId
                        ? "selected"
                        : "not-selected"
                      : ""
                  }
                  key={"city-option-" + id}
                  onClick={(e) => {
                    e.preventDefault();
                    selectLocation(val);
                  }}
                >
                  <div>{val.name}</div>
                  <div>{val.state}</div>
                  <div>{val.country}</div>
                </li>
              ))}
          </ul>
        )}
        {locationData && (
          // Data component render
          <WeatherPanel
            label={`${locationData.name}, ${locationData.state}, ${locationData.country}`}
            lat={locationData.lat}
            lon={locationData.lon}
          />
        )}
      </div>
    </div>
  );
}

export default App;
