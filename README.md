# Weather Application Example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A simple React application to display the current weather and a 5-day forecast in a specific location.\
Data is queried from [openweathermap.org](https://openweathermap.org) API.

## How to run
1. Add `.env` file to the project's root directory with the following contents\
`REACT_APP_WEATHER_API_KEY={KEY}`\
Where `{KEY}` is your 32-character API key provided by openweathermap.org
2. Refering root directory run these commands in CLI\
`npm install`\
`npm run start`
3. Open http://localhost:3000 to view app in the browser.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the Jest test runner.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
