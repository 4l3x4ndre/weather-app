# weather-app
A simple weather app using React Native and OpenWeatherMap API

## How it works

When the user types in a city name, the app fetchs data from https://openweathermap.org/find.
It then shows a list of names given by the api.

If the user clicks on a suggestion, the app stores the city id in the state, and it then fetchs the data through the api with the city id.

A simple animation appears to show the weather.

# Build

Copy `config.js.sample` in `config.js` and write your appkey down.
