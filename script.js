let DOMdata;
let F_or_C = true; // true means it converts to farenhieight
const tempDisplay = document.querySelector("#temprature-display");
const locationDisplay = document.querySelector("#location-display");
const currentConditions = document.querySelector("#current-conditions");
const windSpd = document.querySelector("#wind-speed");

// I can get the data using this but for now just use JUNKDATA as a 'return value'
async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

function createDOMDataObject(args) {
  //Create the object ONLY
  const temp = args.main.temp;
  const name = args.name;
  const currentConditions = args.weather[0].main;
  const wind = args.wind.speed;
  return { temp, name, currentConditions, wind };
}

// displayFns() are called in DOMDataDisplay().

function DOMDataDisplay(dataObject) {
  // argument will be DomData from previous .then()
  locationDisplay.textContent = dataObject.name
  tempDisplay.textContent = displayTemp(dataObject);
  currentConditions.textContent = displayCurrentConditions(dataObject);
  windSpd.textContent = displayWindSpeed(dataObject)
}

function displayTemp(wd) { // wd means weather data. It's shorter
  // handle user preference for conversion Fahrenheit or Celsius
  let tempFahrenheit = ((wd.temp - 273.15) * 9) / 5 + 32;
  let tempCelsius = wd.temp - 273.15;
  if (F_or_C === false) {
    return `${Math.round(tempCelsius)}\u00b0C`;
  }
  return `${Math.round(tempFahrenheit)}\u00b0F`;
}

function displayCurrentConditions(wd) {
  return wd.currentConditions;
}

function displayWindSpeed(wd) {
  return wd.wind;
}

getWeatherData(
  "https://api.openweathermap.org/data/2.5/weather?zip=06053&appid=a630f28475b650382bb96ea713e55d1d"
)
  .then((data) => {
    DOMdata = new createDOMDataObject(data);
    console.log(data);
  })
  .then(() => {
    DOMDataDisplay(DOMdata);
    console.table(DOMdata);
  });
