// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", writeBtn);

// Function to create buttons with the value of whatever was typed in the search bar
function writeBtn(){
const inputBoxEl = document.getElementById("inputBox"); //Selectors
const searchListEl = document.getElementById("searchList"); 

const cityName = inputBoxEl.value; // New variable based on the string typed into the input box
if(cityName!==""){ // Doesn't make a button if the string is empty
searchListEl.insertAdjacentHTML('afterend', '<button class="searchres">'+ cityName +'</button>'); // Creates button elements under the search list element and gives them cityName

// Calling the Weather API

var cityCurrentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=b5d4186b9b4d74b711271811c8313863';
var cityFiveDayWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=b5d4186b9b4d74b711271811c8313863';

 console.log(cityCurrentWeatherUrl);
 console.log(cityFiveDayWeatherUrl);

 fetch(cityCurrentWeatherUrl) // Given a valid city name, returns object with current weather conditions.
    .then(function(response){
        return response.json();
    })
    .then(function(weatherData){
        console.log(weatherData);
        console.log(weatherData.name);
        console.log(weatherData.main.temp);

    const currentTemp = weatherData.main.temp - 273.15 // Temp is given in degrees kelvin, need celsius. 
    console.log(currentTemp);
    roundedCurrentTemp = Math.round(currentTemp*100)/100; //Rounding our temp to two decimal places
    console.log(roundedCurrentTemp);

    // More Selectors

    const cityNameEl = document.getElementById("cityName");
    const tempEl = document.getElementById("temp");
    const windEl = document.getElementById("wind");
    const humidityEl = document.getElementById("humidity");
    const UVindexEl = document.getElementById("UVindex");
    const iconEl = document.getElementById("icon");
    
    // Date stuff goes here
    const dateEl = document.getElementById("date");
    today = moment();
    var currentDate = today.format("DD-MM-YY");
    dateEl.innerHTML = currentDate;
    
    
    cityNameEl.innerHTML = weatherData.name; 
    tempEl.innerHTML = "Temp: " + roundedCurrentTemp + "°C";
    windEl.innerHTML = "Wind: " + weatherData.wind.speed + "m/s";
    humidityEl.innerHTML = "Humidity: " + weatherData.main.humidity + "%";
    iconEl.src = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
    // tempEl.innerHTML = "UV Index: " + ;
    
    
    
    });


    




    
}}









