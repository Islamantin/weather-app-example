import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/ignoreTransform.js",
    "^.+\\.scss$": "<rootDir>/ignoreTransform.js",
  },
  testEnvironment: "jsdom"
};

export default config;
