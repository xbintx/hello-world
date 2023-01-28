// (Week 4) Feature #1: In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let dayHTML = document.querySelector("#day");
dayHTML.innerHTML = day;

let hour = now.getHours();
let min = now.getMinutes();

function twelveHourTime(hour) {
  if (hour > 12) {
    return hour - 12;
  }
  return hour;
}

function amOrPM(hour) {
  if (hour >= 12) {
    return "PM";
  }
  return "AM";
}

function isMinLessThan10(min) {
  if (min < 10) {
    return `0${min}`;
  }
  return min;
}

let timeHTML = document.querySelector("#time");
let newHour = twelveHourTime(hour);
let newMin = isMinLessThan10(min);
let suffix = amOrPM(hour);
timeHTML.innerHTML = `${newHour}:${newMin} ${suffix}`;

// (Week 4) Feature #2: Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// (week 5) In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function displayWeather(response) {
  let tempHTML = document.querySelector("#main-temp");
  let descriptionHTML = document.querySelector("#description");

  let temperatureApiResponse = Math.round(response.data.main.temp);
  let descriptionApiResponse = response.data.weather[0].description;

  // Update  Temperature & Description HTML
  tempHTML.innerHTML = temperatureApiResponse;
  descriptionHTML.innerHTML = descriptionApiResponse;
}

function updateCity(event) {
  //First update City
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityHTML = document.querySelector("#city");
  cityHTML.innerHTML = cityInput.value;

  //Second get temperature from API and update the Temp on Page
  let key = "e16177aecc767ad2e45ddcc2ca5e33b8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}

let search = document.querySelector(" .search-bar");
search.addEventListener("submit", updateCity);

// Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function convertToF(temp) {
  return temp * 1.8 + 32;
}

function convertToC(temp) {
  return (temp - 32) / 1.8;
}

function updateTempToF(event) {
  event.preventDefault();
  let currentCTemp = document.querySelector("#main-temp");
  let farenTemp = convertToF(currentCTemp.innerHTML);
  currentCTemp.innerHTML = farenTemp;
}

function updateTempToC(event) {
  event.preventDefault();
  let currentFTemp = document.querySelector("#main-temp");
  let celciusTemp = convertToC(currentFTemp.innerHTML);
  currentFTemp.innerHTML = celciusTemp;
}

let clickF = document.querySelector("#click-to-f");
clickF.addEventListener("click", updateTempToF);

let clickC = document.querySelector("#click-to-c");
clickC.addEventListener("click", updateTempToC);

// Week 5 Features
// Feature 1: In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
// Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

// Bonus Feature: Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
