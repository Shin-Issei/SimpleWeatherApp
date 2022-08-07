let DOMdata;
const tempDisplay = document.querySelector("#temprature-display");
const locationDisplay = document.querySelector("#location-display");
const currentConditions = document.querySelector("#current-conditions");
const windSpd = document.querySelector("#wind-speed");
const locationRequest = document.querySelector("#location-search");
const searchSubmit = document.querySelector("#location-search-submit");
const unitSwitch = document.querySelector("#unitSwitch");
let selectMetricUnits = false;


async function getWeatherData(queryValue) {

  let response;
  
  if(isNaN(queryValue * 2)){
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&appid=a630f28475b650382bb96ea713e55d1d`)
  } 

  else{
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${queryValue}&appid=a630f28475b650382bb96ea713e55d1d`);
  }




  const weatherData = await response.json();
  console.log(weatherData);
  if (weatherData.cod === "400"){
    locationDisplay.textContent = weatherData.message;
  }
  if (weatherData.cod === "404"){
    // alert(weatherData.message)
    locationDisplay.textContent = weatherData.message
  }
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

  function DOMDataDisplay(dataObject,) {
  
  locationDisplay.textContent = dataObject.name
  tempDisplay.textContent = displayTemp(dataObject, selectMetricUnits);
  currentConditions.textContent = displayCurrentConditions(dataObject);
  windSpd.textContent = displayWindSpeed(dataObject, selectMetricUnits)
}

function displayTemp(wd, metric) { // wd means weather data. It's shorter.
  if(metric){
    let tempCelcius = (wd.temp - 273.15)
    return `Temperature ${Math.round(tempCelcius)}\u00b0C`;
  }
  let tempFahrenheit = ((wd.temp - 273.15) * 9) / 5 + 32;
  return `Temperature ${Math.round(tempFahrenheit)}\u00b0F`;
}

function displayCurrentConditions(wd) {
  return `Conditions Outside: ${wd.currentConditions}`;
}

function displayWindSpeed(wd, metric) {
  if(metric){
    return `Wind: ${Math.round(wd.wind * 1.609)} KPH`
  }
  return `Wind: ${Math.round(wd.wind)} MPH`;
}

function clearCurrentData(){
  locationDisplay.textContent = null;
    tempDisplay.textContent = null
    currentConditions.textContent = null;
    windSpd.textContent = null;
}



searchSubmit.addEventListener("click", () =>{
  clearCurrentData();
  
  getWeatherData(locationRequest.value)
    .then((data) => {
      DOMdata = new createDOMDataObject(data);
      console.log(data);
    })
    .then(() => {
      DOMDataDisplay(DOMdata);
      console.table(DOMdata);
    });
});

unitSwitch.addEventListener("click", ()=>{
  if (selectMetricUnits === false){
    selectMetricUnits = true;
  }
  else{
    selectMetricUnits = false;
  }
  DOMDataDisplay(DOMdata);
})


