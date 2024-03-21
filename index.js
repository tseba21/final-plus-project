function searchCity(city) {
  let apiKey = "te41005c6ao302b3034af61b1f22f9a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windspeedElement = document.querySelector("#wind-speed");
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wendesday",
      "thusday",
      "friday",
      "satarday",
    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hours}: ${minutes}`;
  }

  let iconElement = document.querySelector(".current-temperature-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

function eventHandler(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestomp) {
  let date = new Date(timestomp * 1000);
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wendesday",
    "thusday",
    "friday",
    "satarday",
  ];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "te41005c6ao302b3034af61b1f22f9a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecasthtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecasthtml =
        forecasthtml +
        `
        <div class="weather-forecast" id="forecast">
              <div class="weather-forecast-day">
            
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${
                  day.condition.icon_url
                }" class="weather-forecast-icon"/>
  
                  <div class="weather-forecast-temperatures">
  
                  <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}</strong>
              </div>
  
              <div class="weather-forecast-temperature">
              ${Math.round(day.temperature.minimum)}
              </div>
              </div>
              </div>
              `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecasthtml;
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", eventHandler);

searchCity("paris");
