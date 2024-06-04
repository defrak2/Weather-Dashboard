const button = document.querySelector('#search-btn')
const errorText = document.querySelector('.error')

const currentWeatherDiv = document.querySelector('#display-today')
const forecastDiv = document.querySelector('#display-forecast')
const searchHistoryList = document.querySelector('#search-history')


let searchHistory = []

button.addEventListener('click', function(event){
  event.preventDefault();
  fetchWeatherData();
});



function fetchWeatherData() {
  const inputValue = document.querySelector('.inputValue')
  const city = inputValue.value
  const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=fd9ef7dbe0229fd31347b03516a3d415`;


  
  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      fetchForecast(data[0].lat, data[0].lon);



    })
  
    .catch(error => {
      console.log('Error fetching geolocation data:', error)
    });

  }
  function fetchForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fd9ef7dbe0229fd31347b03516a3d415`)

      .then(response => response.json())
      .then(data => {    
        console.log(data);

      })
  }
function saveToLocalStorage () {
  //when clicking
}
function readFromLocalStorage() {
  //at ready
}
function createTodayCard() {

}
function createForecastCards() {

}

function createCityButtons() {
  
}
//1. fetch data from API
//2. save data items to local storage
//3. read data items from local storage
//4. create card for today forecast and append to html
//5. create cards for 5 day forecast and append to html
//6. function to render the list
// 7. ready function