 //variable that stores newDate constructor
 let current = new Date();

 //function that displays current day of week and time
 function displayDate() {
     let dateN = document.querySelector('p');
     let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     let curDay = daysOfWeek[current.getDay()];
     let timeNow = `${curDay} ${current.getHours()}:${current.getMinutes()}`;
     dateN.innerHTML = timeNow;
 }

 displayDate();

 //storing api key for authorization and celsius-fahrenheight conversion 
 let apiKey = "a867e25f2d83db579421a57fd8e937ec";
 let cityDisplay = document.querySelector('.city-name');
 let formSubmit = document.querySelector('.input-group');
 let fahValue = document.querySelector('.fah-convert');
 let celsiusDis = document.querySelector('.cel-convert');
 let deleteDefaultCelsius = document.querySelector('.default-c');

 function getWeather(city) {
     let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
console.log(apiUrl);
     axios.get(apiUrl).then(function (response) {
         const temperature = response.data.main.temp;
         cityDisplay.innerHTML = `Current temperature in ${city} is ${temperature}°C`;
         fahValue.innerHTML = `${Math.round(temperature * 9 / 5 + 32)} &deg;F`;
          let descriptionDisplay = document.querySelector('.description');
         descriptionDisplay.innerHTML = response.data.weather[0].description;
                 
         
         console.log(response.data.weather[0].description);
         
        // deleteDefaultCelsius.remove();
     }).catch(function (error) {
         console.error("Error fetching weather data:", error);
     });
 }

 formSubmit.addEventListener('submit', function (event) {
     event.preventDefault();
     let search = document.querySelector(".form-control");
     let userCity = search.value;
    
     getWeather(userCity);
 });

 // Convert Celsius to Fahrenheit and Vice Versa
 
 function fahrenheitChange(event) {
     event.preventDefault();
     let celsiusValue = parseInt(celsiusDis.innerHTML, 10);
     let conversion = (celsiusValue * 9 / 5) + 32;
     fahValue.innerHTML = `${Math.round(conversion)} &deg;F`;
     deleteDefaultCelsius.remove();
 }

 //convert fahrenheight to celsius
 function celsiusChange(event) {
     event.preventDefault();
     let fahrenheitValue = parseInt(fahValue.innerHTML, 10);
     let conversion = (fahrenheitValue - 32) * 5 / 9;
     celsiusDis.innerHTML = `${Math.round(conversion)} &deg;C`;
     deleteDefaultCelsius.remove();
 }

 fahValue.addEventListener('click', fahrenheitChange);
 celsiusDis.addEventListener('click', celsiusChange);
