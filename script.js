async function getCurrentWeatherByCity(city) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ccbd94e9532c44538aa104750250112&q=${city}&aqi=no`
  );
  const currentWeather = await data.json();
  console.log(currentWeather);

  return currentWeather;
}

// http://api.weatherapi.com/v1/forecast.json?key=ccbd94e9532c44538aa104750250112&q=London&days=1&aqi=no&alerts=no

const locationInput = document.querySelector(".city-input");

const locationButton = document.querySelector(".search-button");

locationButton.addEventListener("click", async () => {
  const locationInputValue = locationInput.value;
  const currentWeather = await getCurrentWeatherByCity(locationInputValue);
  const forecast = await getForecastByCity(locationInputValue);

  const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`;
  const currentWeatherTemperature = currentWeather.current.temp_c;
  const currentWeatherStatus = currentWeather.current.condition.text;

  resetWeatherApp();

  renderCurrentWeather(
    currentWeatherIcon,
    currentWeatherTemperature,
    currentWeatherStatus
  );

  renderForecast(forecast.forecast.forecastday[0].hour);
});

function renderCurrentWeather(iconSrc, temperature, status) {
  const currentWeatherIconEl = document.createElement("img");
  currentWeatherIconEl.setAttribute("class", "current-weather-icon");
  currentWeatherIconEl.setAttribute("src", iconSrc);

  const currentWeatherTemperatureEl = document.createElement("p");
  currentWeatherTemperatureEl.setAttribute(
    "class",
    "current-weather-temperature"
  );
  currentWeatherTemperatureEl.innerHTML = temperature;

  const currentWeatherStatusEl = document.createElement("p");
  currentWeatherStatusEl.setAttribute("class", "current-weather-status");
  currentWeatherStatusEl.innerHTML = status;

  const currentWeather = document.querySelector(".weather-display");
  currentWeather.appendChild(currentWeatherIconEl);
  currentWeather.appendChild(currentWeatherTemperatureEl);
  currentWeather.appendChild(currentWeatherStatusEl);
}

async function getForecastByCity(city) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ccbd94e9532c44538aa104750250112&q=${city}&days=1&aqi=no&alerts=no`
  );
  const forecast = await data.json();
  console.log(forecast);

  return forecast;
}

function createForecastElement(iconSrc, time, temperature) {
  const forecastElement = document.createElement("div");
  forecastElement.setAttribute("class", "forecast-item");

  const forecastTime = document.createElement("p");
  forecastTime.setAttribute("class", "forecast-time");
  forecastTime.innerHTML = time.slice(11);

  const forecastIcon = document.createElement("img");
  forecastIcon.setAttribute("class", "forecast-icon");
  forecastIcon.setAttribute("src", `${iconSrc}`);

  const forecastTemperature = document.createElement("p");
  forecastTemperature.setAttribute("class", "forecast-temperature");
  forecastTemperature.innerHTML = temperature;

  forecastElement.appendChild(forecastTime);
  forecastElement.appendChild(forecastIcon);
  forecastElement.appendChild(forecastTemperature);

  return forecastElement;
}

function renderForecast(forecast) {
  const forecastContainer = document.querySelector(".forecast");

  forecast.forEach((forecastItem) => {
    const forecastElement = createForecastElement(
      forecastItem.condition.icon,
      forecastItem.time,
      forecastItem.temp_c
    );
    forecastContainer.appendChild(forecastElement);
  });
}

function resetWeatherApp() {
  const currentWeather = document.querySelector(".weather-display");
  currentWeather.innerHTML = "";

  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
}
