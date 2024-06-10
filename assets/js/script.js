const button = document.querySelector('#search-btn')
const todayBox = document.querySelector('#today-content')
const forecastBox = document.querySelector('#forecast-content')
const errorText = document.querySelector('.error')
// const emojiItem = document.querySelector('#emoji-item')

const searchHistoryList = document.querySelector('#search-history')


let searchHistory = []

button.addEventListener('click', function(event){
  event.preventDefault();
  fetchWeatherData();
});



function fetchWeatherData() {
  const inputValue = document.querySelector('.inputValue');
  const city = inputValue.value;
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=fd9ef7dbe0229fd31347b03516a3d415`)

      .then(response => response.json())
      .then(data => {    
        console.log(data);
      //   if (!data || !data.results || data.results.length === 0) {
      //     console.log('No Results returned!')
      //     return;
      // }
      createForecastCards(data);
      createTodayCard(data);
// for (let i=1; i< 6; i++){
//   if (data[i])
// }
      // data.results.forEach(function(answer) {
      //     createTodayCard(answer);
      // })
      })
  }
function saveToLocalStorage () {
  //when clicking
}
function readFromLocalStorage() {
  //at ready
}
function createTodayCard(data) {
  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');

  const todayCity = document.createElement('h3');
  todayCity.textContent = data.city.name + data.list[0].dt_txt;
  //add date here too as well as emoji for sun/cloud/rain

  todayCard.append(todayCity);

  const todayTemp = document.createElement('p');
  todayTemp.textContent= data.list[0].main.temp_max;


  const todayWind = document.createElement('p');
  todayWind.textContent = data.list[0].wind.speed;

  const todayHumidity = document.createElement('p');
  todayHumidity.textContent = data.list[0].main.humidity;

  todayCard.appendChild(todayTemp);
  todayCard.appendChild(todayWind);
  todayCard.appendChild(todayHumidity);

  todayBox.appendChild(todayCard);
}
function createForecastCards(data) {


  for (let i=5; i < data.list.length; i+=8){
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');
  
    const forecastDescription = document.createElement('h5');
    forecastDescription.textContent = data.list[i].dt_txt+data.list[i].weather[0].description;
    //add date here too as well as emoji for sun/cloud/rain add a if statement that creates emojis
  
    forecastCard.append(forecastDescription);
  
    const forecastTemp = document.createElement('p');
    forecastTemp.textContent= 'Temp:' + data.list[i].main.temp;
  
    const forecastWind = document.createElement('p');
    forecastWind.textContent = 'Wind:' + data.list[i].wind.speed;
  
    const forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = 'Humidity:' + data.list[i].main.humidity;
  
    forecastCard.appendChild(forecastTemp);
    forecastCard.appendChild(forecastWind);
    forecastCard.appendChild(forecastHumidity);
  
    forecastBox.appendChild(forecastCard);
  }
  
}



function createCityButtons() {
  const searchCity = document.createElement('button');
 //city name here
}
//1. fetch data from API
//2. save data items to local storage
//3. read data items from local storage
//4. create card for today forecast and append to html
//5. create cards for 5 day forecast and append to html
//6. function to render the list
// 7. ready function