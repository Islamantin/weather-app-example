/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import App from "./app";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

jest.mock("axios");


describe("Weather App", () => {
  test("renders App component", () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText(/Enter city name/i)).toBeInTheDocument();
  });

  // Firing events doesn't work properly...

  test("user can type city name and see location otions", async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const cityInput = getByPlaceholderText(
      /Enter city name/i
    ) as HTMLInputElement;

    fireEvent.focus(cityInput);
    fireEvent.change(cityInput, { target: { value: "New York" } });

    expect(getByText(/Missouri/i)).toBeInTheDocument();
  });

  test("user can select location and see the current weather", async () => {
    const { getByPlaceholderText, findByText } = render(<App />);
    const cityInput = getByPlaceholderText(
      /Enter city name/i
    ) as HTMLInputElement;

    fireEvent.focus(cityInput);
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.keyDown(cityInput, { key: "Enter" });

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?lat=40.7127281&lon=-74.0060152&units=metric&appid=${API_KEY}`
    );

    await findByText(/NOW/i);
  });
});
