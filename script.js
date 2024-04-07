 //variable that stores newDate constructor
 let current = new Date();

 //function that displays current day of week and time for top of page
 function displayDate() {
     let dateN = document.getElementById('current-date'); 
     let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     let curDay = daysOfWeek[current.getDay()];
     let timeNow = `${curDay} ${current.getHours()}:${String(current.getMinutes()).padStart(2, '0')}`; //using padStart to include trailing 0

     dateN.innerHTML = timeNow;
 }

 displayDate();


 //function which make api call for city when searched 
 function searchCity(city) {

    //store api details
    
     let apiKey = "a4f536208c7fa73d4b60d99t63da3bo2";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    // console.log(apiUrl);

     /*
        make api call and upate the interface
        use axios to get weather data and update temperature
      */
     axios.get(apiUrl).then(function (response) {
      
         //gets current temperature in entered city
         let temperature = response.data.temperature.current;
      
         /*
         to print temperature value and weather description
         use Math.round function to round of temperature
         */
         let fahValue = document.querySelector('.fah-convert');
         fahValue.innerHTML = Math.round(temperature);

         //updates description
         let description = document.getElementById('description-weather');
         description.innerHTML = response.data.condition.description;

         //updates humitidy
         let humidity = document.getElementsByTagName('strong')[0];
         humidity.innerHTML = `${response.data.temperature.humidity}%`;

         //update wind speed
         let wind = document.getElementsByTagName('strong')[1];
         wind.innerHTML = `${response.data.wind.speed}km/h`;

         //update icon img
         let iconElement = document.getElementById('icon');
         iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="head-img" />`


     }).catch(function (error) {
         console.error("Error fetching weather data:", error);
     });
     getForecast("paris");
 }
  function searchCoords(lat, lon){
   

   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
   }else{
    console.log("not success")
   }

     function showPosition(position){
       let lat = position.coords.latitude;
       let lon = position.coords.longitude;

     
     let apiKey = "a4f536208c7fa73d4b60d99t63da3bo2";
    // let apiUrlCurrentPos = "https://api.shecodes.io/weather/v1/current?lat=-33.8067456&lon=18.5401344&key=a4f536208c7fa73d4b60d99t63da3bo2&units=metric";
     let apiCoordUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`; //interpolation worsk
//     // https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=a4f536208c7fa73d4b60d99t63da3bo2&units=metric
// console.log(apiUrlCurrentPos);
 console.log(apiCoordUrl);
 console.log(lat);
 console.log(lon);

 axios.get(apiCoordUrl).then(function (response) {
    //display current city 

  let cityByCoord = response.data.city;
   
   cityDisplay.innerHTML = cityByCoord;
     //gets current temperature in entered city
     let temperature = response.data.temperature.current;

     /*
     to print temperature value and weather description
     use Math.round function to round of temperature
     */
     let fahValue = document.querySelector('.fah-convert');
     fahValue.innerHTML = Math.round(temperature);

     //updates description
     let description = document.getElementById('description-weather');
     description.innerHTML = response.data.condition.description;

     //updates humitidy
     let humidity = document.getElementsByTagName('strong')[0];
     humidity.innerHTML = `${response.data.temperature.humidity}%`;

     //update wind speed
     let wind = document.getElementsByTagName('strong')[1];
     wind.innerHTML = `${response.data.wind.speed}km/h`;

     //update icon img
     let iconElement = document.getElementById('icon');
     iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="head-img" />`


 }).catch(function (error) {
     console.error("Error fetching weather data:", error);
 });
 getForecast("paris");
 }

}
 
  searchCoords();

 
 
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


 //function for forecast
 function getForecast(city) {
     let apiKey = "a4f536208c7fa73d4b60d99t63da3bo2";
     let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
     axios.get(apiUrl).then(displayForecast);
     console.log(apiUrl);
 }


 //function that get day in object for forecast
 function formatDay(timestamp) {
     let date = new Date(timestamp * 1000);
     let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
     return days[date.getDay()];
 }

 function displayForecast(response) {
     console.log(response.data)

     let forecastElement = document.querySelector('.cols-sm-5');

   
     let forecastHtml = '';
     response.data.daily.forEach(function (day, index) {
        if (index <= 4){
         forecastHtml = forecastHtml +

             `<div class="col-lg-2 ">
                <p>${formatDay(day.time)}</p>
                
                    <img src="${day.condition.icon_url}" />
                        <div>
                            <span class="deg-min">${Math.round(day.temperature.minimum)} &deg;</span>
                            <span class="deg-max">${Math.round(day.temperature.maximum)} &deg;</span>
                        </div>
            </div>`;
     }
     })
     forecastElement.innerHTML = forecastHtml;
    
    
 }


 //let formSubmit = document.getElementById('btn');
 let fahValue = document.querySelector('.fah-convert');
 let celsiusDis = document.querySelector('.cel-convert');
 let deleteDefaultCelsius = document.querySelector('.default-c');


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
      // deleteDefaultCelsius.remove(); - decide if needed??
 }

 fahValue.addEventListener('click', fahrenheitChange);
 celsiusDis.addEventListener('click', celsiusChange);

 //functionality for recording

//getting element event trigger

let recordElement = document.getElementById("microphone");
function record(){
    alert('hey');
}


//NTS: city parameter is how city is extracted

//geolation api

//recordElement.addEventListener('click', gotLocation);

//get user lat and longitude thorugh geolocation api
//  function gotLocation (position){
//          const {coords} = position;
//      let lat = coords.latitude;
//      let long = coords.longitude;
//      console.log(lat);
//      console.log(long);
    
//  }


//  navigator.geolocation.getCurrentPosition(gotLocation);
recordElement.addEventListener('click', record);