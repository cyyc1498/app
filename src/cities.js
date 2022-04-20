/*let weather = {
  "paris": {
    temp: 19.7,
    humidity: 80
  },
  "tokyo": {
    temp: 17.3,
    humidity: 50
  },
  "lisbon": {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  "moscow": {
    temp: -5,
    humidity: 20
  }
};

// write your code here

let city = prompt("Enter a city");

if(city.toLowerCase() in weather){
  alert(`It is currently ${Math.round(weather[city]["temp"])}°C (${weather[city]["temp"]+32}°F) in ${city} with a humidty of ${weather[city]["humidity"]}`)
}else{
  alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)
}
*/
//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = document.querySelector("#time");


function timeDisplay(){
  let time = new Date();
  let days = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"]
  let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  if(time.getMinutes() < 10){
    return `${days[time.getDay()]}, ${month[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} -
   ${time.getHours()}:0${time.getMinutes()}`
  }else{
  let present = `${days[time.getDay()]}, ${month[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} -
   ${time.getHours()}:${time.getMinutes()}`
  return present
}
}
now.innerHTML = timeDisplay();


let apiKey = `273346a7322f8fd8336a2edf5af47985`;
let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric`;

  function changeDefaultTemp(response){
    console.log(response.data)
    let changeDTemp = Math.round(response.data.main.temp);
    let defaultTempEl = document.querySelector("#temp");
    defaultTempEl.innerHTML = changeDTemp;

    let changeDefaultDesc = response.data.weather[0].description;
    let defaultDesc = document.querySelector("#description");
    defaultDesc.innerHTML = changeDefaultDesc;

    let changeDWind = Math.round(response.data.wind.speed);
    let defaultWind = document.querySelector("#wind");
    defaultWind.innerHTML = changeDWind;

    let changeDFL = Math.round(response.data.main.feels_like);
    let defaultFL = document.querySelector("#feelsLike");
    defaultFL.innerHTML = changeDFL;

  }
  axios.get(apiUrl).then(changeDefaultTemp)


//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.


function citySearch(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");

  let newCity = (cityInput.value).toLowerCase();
  let main = document.querySelector("h1#city");
  main.innerHTML = newCity;

let apiKey = `273346a7322f8fd8336a2edf5af47985`;
let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;

function getCityTemp(response){
  console.log(response.data)
  let cityTemp = Math.round(response.data.main.temp)
  let tempSearched = document.querySelector("#temp")
  tempSearched.innerHTML = cityTemp;

  let wind = Math.round(response.data.wind.speed);
  let changeWind = document.querySelector("#wind")
  changeWind.innerHTML = wind;

  let getDescription = response.data.weather[0].description;
  let changeDescription = document.querySelector("#description")
  changeDescription.innerHTML = getDescription

  let getfeelsLike = Math.round(response.data.main.feels_like);
  let changeFeels = document.querySelector("#feelsLike");
  changeFeels.innerHTML = getfeelsLike;

}

axios.get(apiUrl).then(getCityTemp)
}

let cityForm = document.querySelector("#search-form")
cityForm.addEventListener("submit",citySearch)

/*🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. 
When clicking on it, it should convert the temperature to Fahrenheit. 
When clicking on Celsius, it should convert it back to Celsius.

let isCel = true;

function toFahrenheit(event){
  event.preventDefault();
  if(isCel === true){
    let toF = parseInt(document.querySelector("#temp").innerHTML)+32
    let tempF = document.querySelector("#temp").innerHTML = toF
    let unitF = document.querySelector("#unit").innerHTML="°F"
    let convertToF = document.querySelector("#conversion").innerHTML = "Convert to Celsius"
    isCel = false;

  }else{
    let toC = parseInt(document.querySelector("#temp").innerHTML)-32
    let tempC = document.querySelector("#temp").innerHTML = toC
    let unitC = document.querySelector("#unit").innerHTML = "°C"
    let convertToC = document.querySelector("#conversion").innerHTML = "Convert to Fahrenheit"
    isCel = true;
  }
}

let convertTemp = document.querySelector("#conversion")
convertTemp.addEventListener("click",toFahrenheit)
*/
/*In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.*/




/*🙀 Bonus point:
Add a Current Location button. When clicking on it, 
it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.*/



function showPosition(position) {
  
  console.log(position.coords);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `273346a7322f8fd8336a2edf5af47985`;
  let apiGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiGeo).then(geoTemp);
}

function getCurrentLoc(event){
  navigator.geolocation.getCurrentPosition(showPosition);
}



function geoTemp(response){
  
  console.log(response.data);
  let geoTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = geoTemp;

  let loc = response.data.name;
  let setLoc = document.querySelector("h1#city");
  setLoc.innerHTML = loc;

  let getDescription = response.data.weather[0].description;
  let setDescription = document.querySelector("#description")
  setDescription.innerHTML = getDescription;

  let setWind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = setWind;
 
  let setFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = setFeelsLike;

}

let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", getCurrentLoc);