let currentTime = new Date();

let today = document.querySelector("#current-time");

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

today.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  cityTemp.innerHTML = `${temp}°C`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} mps`;
  feelsLike.innerHTML = `Feels Like: ${response.data.main.feels_like}°C`;
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiKey = "3d9fc9302f2e9be4c97538b2fa4f9483";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3d9fc9302f2e9be4c97538b2fa4f9483";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);
let getLocation = document.querySelector("#current-location");
getLocation.addEventListener("click", currentLocation);
