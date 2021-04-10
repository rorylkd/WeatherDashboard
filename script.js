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
    });


}}









