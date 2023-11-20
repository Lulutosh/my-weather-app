 //variable that stores newDate constructor
 let current = new Date();

 //function that displays current day of week and time
 function displayDate() {
     let dateN = document.getElementById('current-date'); //moved this to id 'current-details'
     let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     let curDay = daysOfWeek[current.getDay()];

     let timeNow = `${curDay} ${current.getHours()}:${String(current.getMinutes()).padStart(2, '0')}`; //using padStart to include trailing 0

     dateN.innerHTML = timeNow;

 }

 displayDate();

 //function which make api call for city searched data
 function searchCity(city) {

     // make api call and upate the interface

     let apiKey = "a4f536208c7fa73d4b60d99t63da3bo2";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
     console.log(apiUrl);

     //use axios to get weather data and update temperatur
     axios.get(apiUrl).then(function (response) {
         console.log(response);
         console.log(response.data.temperature.current);
         console.log(response.data.condition.icon_url);

         //     let weatherImg = document.createElement('img')
         //     weatherImg.src = response.data.condition.icon_url;
         //     console.log(weatherImg.src);
         //    console.log(`background: url(${response.data.condition.icon_url} no - repeat fixed center)`);
         //console.log(background: url("http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png") no - repeat fixed center);
         //gets current temperature in entered city
         let temperature = response.data.temperature.current;
         console.log(temperature);
         //to print temperature value and weather description
         let fahValue = document.querySelector('.fah-convert');
         fahValue.innerHTML = Math.round(temperature);

         //updates description
         let description = document.getElementById('description-weather');
         description.innerHTML = response.data.condition.description;

         //updates humitidy
         let humidity = document.getElementsByTagName('strong')[0];
         humidity.innerHTML = response.data.temperature.humidity;

         //update wind
         let wind = document.getElementsByTagName('strong')[1];
         wind.innerHTML = `${response.data.wind.speed}km/h`;
        
         //update icon
         let iconElement = document.getElementById('icon');
         iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="head-img" />`

         //  cityDisplay.innerHTML = `Current temperature in ${city} is ${temperature}°C`;
         //  fahValue.innerHTML = `${Math.round(temperature * 9 / 5 + 32)} &deg;F`;
         // let descriptionDisplay = document.querySelector('.description');
         //descriptionDisplay.innerHTML = response.data.weather[0].description;
         console.log(response.data.condition.description);


         //console.log(response.data.weather[0].description);

         // deleteDefaultCelsius.remove();
     }).catch(function (error) {
         console.error("Error fetching weather data:", error);
     });
 }

 //search engine function, display the city name the user enters
 let formSubmit = document.getElementById('btn');
 let cityDisplay = document.querySelector('.city-name');
 console.log(formSubmit);
 formSubmit.addEventListener('click', function (event) {
     event.preventDefault();
     let search = document.querySelector(".form-control");
     let userCity = search.value;
     cityDisplay.innerHTML = userCity;


     //pass city entered to parameter if function call
     searchCity(search.value)


 });
 //default value on load - doesn't work
 //searchCity("Pretoria");



 //storing api key for authorization and celsius-fahrenheight conversion 
 //let apiKey = "a4f536208c7fa73d4b60d99t63da3bo2";


 //let formSubmit = document.getElementById('btn');
 let fahValue = document.querySelector('.fah-convert');
 let celsiusDis = document.querySelector('.cel-convert');
 let deleteDefaultCelsius = document.querySelector('.default-c');


 //notr to self- delete function, get code you need
 function getWeather(city) {
     //  let apiUrl = "https://api.shecodes.io/weather/v1/current?query={query}&key={key}";
     console.log(apiUrl);
     axios.get(apiUrl).then(function (response) {
         const temperature = response.data.main.temp;
         //  cityDisplay.innerHTML = `Current temperature in ${city} is ${temperature}°C`;
         fahValue.innerHTML = `${Math.round(temperature * 9 / 5 + 32)} &deg;F`;
         let descriptionDisplay = document.querySelector('.description');
         descriptionDisplay.innerHTML = response.data.weather[0].description;


         console.log(response.data.weather[0].description);

         // deleteDefaultCelsius.remove();
     }).catch(function (error) {
         console.error("Error fetching weather data:", error);
     });
 }


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