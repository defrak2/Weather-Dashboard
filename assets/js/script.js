const button = document.querySelector('#search-btn')
const todayBox = document.querySelector('#today-content');
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
        if (!data || !data.results || data.results.length === 0) {
          console.log('No Results returned!')
          return;
      }
      createTodayCard();
      data.results.forEach(function(answer) {
          createForecastCards(answer);
      })
      })
  }
function saveToLocalStorage () {
  //when clicking
}
function readFromLocalStorage() {
  //at ready
}
function createTodayCard(resultItem) {
  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');

  const todayCity = document.createElement('h3');
  todayCity.textContent = resultItem.city.name ;
  //add date here too as well as emoji for sun/cloud/rain

  todayCard.append(todayCity);

  const todayTemp = document.createElement('p');
  todayTemp.textContent = resultItem.list.main.temp_max;

  const todayWind = document.createElement('p');
  todayWind.textContent = resultItem.list.wind.speed;

  const todayHumidity = document.createElement('p');
  todayHumidity.textContent = resultItem.list.main.humidity;

  todayWind.append(todayHumidity);

  todayTemp.append(todayWind);

  todayCard.append(todayTemp);

  todayBox.append(todayCard);
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