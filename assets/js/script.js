// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", writeBtn);

// Function to create buttons with the value of whatever was typed in the search bar
function writeBtn(){
const inputBoxEl = document.getElementById("inputBox"); //Selectors
const searchListEl = document.getElementById("searchList"); 

const cityName = inputBoxEl.value; // New variable based on the string typed into the input box

localStorage.setItem('StoredCityName', cityName);  // This whole program is badly organized and I'd have to rewrite everything to get it to read from localStorage. I give up
        var getStored = localStorage.getItem('StoredCityName');
        console.log(getStored);

if(cityName!==""){ // Doesn't make a button if the string is empty
searchListEl.insertAdjacentHTML('afterend', '<button id='+ getStored +' class="searchres">'+ getStored +'</button>'); // Creates button elements under the search list element and gives them cityName
callWeatherAPI(getStored);




// Calling the Weather API
function callWeatherAPI(cityName){
var cityCurrentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=b5d4186b9b4d74b711271811c8313863';
var cityFiveDayWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=b5d4186b9b4d74b711271811c8313863';

 console.log(cityCurrentWeatherUrl);
 console.log(cityFiveDayWeatherUrl);

 fetch(cityCurrentWeatherUrl) // Given a valid city name, returns object with current weather conditions.
    .then(function(response){
        return response.json();
    })
    .then(function(weatherData){
        console.log(weatherData);


    const currentTemp = weatherData.main.temp - 273.15 // Temp is given in degrees kelvin, need celsius. 
    roundedCurrentTemp = Math.round(currentTemp*100)/100; //Rounding our temp to two decimal places

    // More Selectors
    // Current Day
    const cityNameEl = document.getElementById("cityName");
    const tempEl = document.getElementById("temp");
    const windEl = document.getElementById("wind");
    const humidityEl = document.getElementById("humidity");
    const UVindexEl = document.getElementById("UVindex");
    const iconEl = document.getElementById("icon");

    // Day 1
    const temp1El = document.getElementById("day1Temp");
    const wind1El = document.getElementById("day1Wind");
    const humidity1El = document.getElementById("day1Humidity");
    const icon1El = document.getElementById("day1Icon");
    //Day 2
    const temp2El = document.getElementById("day2Temp");
    const wind2El = document.getElementById("day2Wind");
    const humidity2El = document.getElementById("day2Humidity");
    const icon2El = document.getElementById("day2Icon");
    //Day 3
    const temp3El = document.getElementById("day3Temp");
    const wind3El = document.getElementById("day3Wind");
    const humidity3El = document.getElementById("day3Humidity");
    const icon3El = document.getElementById("day3Icon");
    //Day 4
    const temp4El = document.getElementById("day4Temp");
    const wind4El = document.getElementById("day4Wind");
    const humidity4El = document.getElementById("day4Humidity");
    const icon4El = document.getElementById("day4Icon");
    //Day 5
    const temp5El = document.getElementById("day5Temp");
    const wind5El = document.getElementById("day5Wind");
    const humidity5El = document.getElementById("day5Humidity");
    const icon5El = document.getElementById("day5Icon");
    
    
    
    
    
    
    
    
    // Date stuff goes here
    const dateEl = document.getElementById("date");
    const day1El = document.getElementById("day1Date");
    const day2El = document.getElementById("day2Date");
    const day3El = document.getElementById("day3Date");
    const day4El = document.getElementById("day4Date");
    const day5El = document.getElementById("day5Date");

    today = moment();
    var currentDate = today.format("DD-MM-YY");
    var day1Date = moment().add(1, 'days').format("DD-MM-YY");
    var day2Date = moment().add(2, 'days').format("DD-MM-YY");
    var day3Date = moment().add(3, 'days').format("DD-MM-YY");
    var day4Date = moment().add(4, 'days').format("DD-MM-YY");
    var day5Date = moment().add(5, 'days').format("DD-MM-YY");
    
    dateEl.innerHTML = '('+currentDate+')';
    day1El.innerHTML = '('+day1Date+')';
    day2El.innerHTML = '('+day2Date+')';
    day3El.innerHTML = '('+day3Date+')';
    day4El.innerHTML = '('+day4Date+')';
    day5El.innerHTML = '('+day5Date+')';
    
    

    
    
    cityNameEl.innerHTML = weatherData.name; 
    tempEl.innerHTML = "Temp: " + roundedCurrentTemp + "°C";
    windEl.innerHTML = "Wind: " + weatherData.wind.speed + "m/s";
    humidityEl.innerHTML = "Humidity: " + weatherData.main.humidity + "%";
    iconEl.src = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
    

    // To get UV index, i need long & lat of a city as the API I'd need to use doesn't take city name as a parameter.
    // To get long+lat of a city, I can look it up using the data used above(ex. weatherData.coord.lat & weatherData.coord.lon).
    // I'll also use the One Call API to grab the daily forcasts. Could have used it earlier but I'd still need to call the Current Weather one 
    
    

    var longitude = weatherData.coord.lon;
    var latitude = weatherData.coord.lat;

    var OneCallAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude={part}&appid=b5d4186b9b4d74b711271811c8313863';


    
    fetch(OneCallAPIUrl)
        .then(function(response2){
            return response2.json();

        })
        .then(function(OneCallData){
            console.log(OneCallData);
            
            
            
            
            UVindexEl.innerHTML = "UV Index: " + OneCallData.current.uvi; //Current UV Index
            
            
            if((OneCallData.current.uvi) <= 3){ //Changes background color depending on UV Index. 
                UVindexEl.style.backgroundColor = "green";
            }else if((OneCallData.current.uvi)<= 7){
                UVindexEl.style.backgroundColor = "orange";
            }else{UVindexEl.style.backgroundColor = "red";}

             var day1TempCelcius = OneCallData.daily[0].temp.day - 273.15; //Changing all the temps to celsius. 
             var day2TempCelcius = OneCallData.daily[1].temp.day - 273.15;
             var day3TempCelcius = OneCallData.daily[2].temp.day - 273.15;
             var day4TempCelcius = OneCallData.daily[3].temp.day - 273.15;
             var day5TempCelcius = OneCallData.daily[4].temp.day - 273.15;

            var roundedCurrentTemp1 = Math.round(day1TempCelcius*100)/100;
            var roundedCurrentTemp2 = Math.round(day2TempCelcius*100)/100;
            var roundedCurrentTemp3 = Math.round(day3TempCelcius*100)/100;
            var roundedCurrentTemp4 = Math.round(day4TempCelcius*100)/100;
            var roundedCurrentTemp5 = Math.round(day5TempCelcius*100)/100;
             

            temp1El.innerHTML ="Temp: "+ roundedCurrentTemp1 +"°C"; //Adding my elements based on the API data.
            wind1El.innerHTML = "Wind: "+ OneCallData.daily[0].wind_speed + "m/s";
            humidity1El.innerHTML = "Humidity: "+ OneCallData.daily[0].humidity + "%";
           icon1El.src = "http://openweathermap.org/img/wn/"+ OneCallData.daily[0].weather[0].icon +"@2x.png";
           icon1El.style.display = "block"; //Making my img visible

           temp2El.innerHTML ="Temp: "+ roundedCurrentTemp2 +"°C";
            wind2El.innerHTML = "Wind: "+ OneCallData.daily[1].wind_speed + "m/s";
            humidity2El.innerHTML = "Humidity: "+ OneCallData.daily[1].humidity + "%";
            icon2El.src = "http://openweathermap.org/img/wn/"+ OneCallData.daily[1].weather[0].icon +"@2x.png";
            icon2El.style.display = "block";

            temp3El.innerHTML ="Temp: "+ roundedCurrentTemp3 +"°C";
            wind3El.innerHTML = "Wind: "+ OneCallData.daily[2].wind_speed + "m/s";
            humidity3El.innerHTML = "Humidity: "+ OneCallData.daily[2].humidity + "%";
            icon3El.src = "http://openweathermap.org/img/wn/"+ OneCallData.daily[2].weather[0].icon +"@2x.png";
            icon3El.style.display = "block";

            temp4El.innerHTML ="Temp: "+ roundedCurrentTemp4 +"°C";
            wind4El.innerHTML = "Wind: "+ OneCallData.daily[3].wind_speed + "m/s";
            humidity4El.innerHTML = "Humidity: "+ OneCallData.daily[3].humidity + "%";
            icon4El.src = "http://openweathermap.org/img/wn/"+ OneCallData.daily[3].weather[0].icon +"@2x.png";
            icon4El.style.display = "block";

            temp5El.innerHTML ="Temp: "+ roundedCurrentTemp5 +"°C";
            wind5El.innerHTML = "Wind: "+ OneCallData.daily[4].wind_speed + "m/s";
            humidity5El.innerHTML = "Humidity: "+ OneCallData.daily[4].humidity + "%";
            icon5El.src = "http://openweathermap.org/img/wn/"+ OneCallData.daily[4].weather[0].icon +"@2x.png";
            icon5El.style.display = "block";





        });

        
    
    
    
    
    });


    




    






}}







}

