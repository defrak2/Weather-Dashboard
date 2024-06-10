const button = document.querySelector('#search-btn')
const todayBox = document.querySelector('#today-content')
const forecastBox = document.querySelector('#forecast-content')

const errorText = document.querySelector('.error')


const searchHistoryList = document.querySelector('#search-history')


let searchHistory = []

button.addEventListener('click', function(event){
  event.preventDefault();
  const inputValue = document.querySelector('.inputValue');
  const city = inputValue.value;
  
  fetchWeatherData(city);
  saveToLocalStorage(city);
  renderFromLocalStorage();
});



function fetchWeatherData(city) {
  todayBox.innerHTML = '';
  forecastBox.innerHTML = '';

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
        createTodayCard(data);
       createForecastCards(data);
      })
      .catch(error => {
        console.log('Error fetching forecast data:', error);
      })
  }
function saveToLocalStorage (city) {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
cities.push(city);
localStorage.setItem('cities', JSON.stringify(cities));
}


function renderFromLocalStorage() {

  const cities = JSON.parse(localStorage.getItem('cities')) || [];

  searchHistoryList.innerHTML = ''


  cities.forEach((city) => {
    const cityButton= document.createElement('button');

    cityButton.textContent = city;
    cityButton.classList.add('city-button');
    cityButton.addEventListener('click', (event) => {
      event.preventDefault();

      

      fetchWeatherData(city);
    });

    // const existingButton = searchHistoryList.querySelector(`button[data]city="${city}"]`);
    // if (!existingButton) {
    //   cityButton.setAttribute('data-city', city);
    // }
    if (!city) {
      console.log('error');
    } else {
      

          searchHistoryList.appendChild(cityButton);
 

};
  });
}
function createTodayCard(data) {
  const todayBox = document.querySelector('.today-box');
  let emojiSymbol= '';
    if (data.list[0].weather[0].description=== 'broken clouds') {
      emojiSymbol = '🌤️'}
      else if (data.list[0].weather[0].description=== 'clear sky') {
        emojiSymbol= '☀️'
      } else if (data.list[0].weather[0].description=== 'few clouds') {
        emojiSymbol= '🌤️'
      }
      else if (data.list[0].weather[0].description=== 'overcast clouds'){
        emojiSymbol= '☁️'
      }
      else if (data.list[0].weather[0].description=== 'scattered clouds'){
        emojiSymbol= '🌤️'
      }
      else if (data.list[0].weather[0].description=== 'light rain'){
        emojiSymbol= '🌧️'
      }
      else{
        emojiSymbol= 'unknown'
      }

  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');
  todayBox.appendChild(todayCard);
  const todayCity = document.createElement('h3');

  const dateString = data.list[0].dt_txt;
  const dateOnly = dateString.match(/\d{4}-\d{2}-\d{2}/)[0];
  const dateObj = new Date (dateOnly);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();

  const formattedDate = `${month} ${day}`;

  todayCity.textContent = `${data.city.name} (${formattedDate}) ${emojiSymbol}`;


  todayCard.append(todayCity);

  const todayTemp = document.createElement('p');
  todayTemp.textContent= `Temp: ${Math.floor(data.list[0].main.temp_max)}°F`;


  const todayWind = document.createElement('p');
  todayWind.textContent = `Wind: ${Math.floor(data.list[0].wind.speed)} mph`;

  const todayHumidity = document.createElement('p');
  todayHumidity.textContent = `Humidity: ${data.list[0].main.humidity} %`;



  todayCard.appendChild(todayTemp);
  todayCard.appendChild(todayWind);
  todayCard.appendChild(todayHumidity);


}
function createForecastCards(data) {

  const searchInputValue = document.querySelector('.inputValue').value;
  const forecastBox = document.querySelector('.forecast-box')
  if (searchInputValue) {
    const forecastHeader = document.createElement('h4');
    forecastHeader.classList.add('forecast-box');
    forecastHeader.id = 'forecast-content';
    forecastHeader.textContent = `5-Day Forecast in ${searchInputValue}`;    forecastBox.appendChild(forecastHeader);

  }

  for (let i=5; i < data.list.length; i+=8){
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');
    
    let emojiSymbol= '';
    if (data.list[i].weather[0].description=== 'broken clouds') {
      emojiSymbol = '🌤️'}
      else if (data.list[i].weather[0].description=== 'clear sky') {
        emojiSymbol= '☀️'
      } else if (data.list[i].weather[0].description=== 'few clouds') {
        emojiSymbol= '🌤️'
      }
      else if (data.list[i].weather[0].description=== 'overcast clouds'){
        emojiSymbol= '☁️'
      }
      else if (data.list[i].weather[0].description=== 'scattered clouds'){
        emojiSymbol= '🌤️'
      }
      else if (data.list[i].weather[0].description=== 'light rain'){
        emojiSymbol= '🌧️'
      }
      else{
        emojiSymbol= 'unknown'
      }

    const forecastDescription = document.createElement('h5');
    const dateString = data.list[i].dt_txt;
    const dateOnly = dateString.match(/\d{4}-\d{2}-\d{2}/)[0];
    const dateObj = new Date (dateOnly);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();

    const formattedDate = `${month} ${day}`;

    forecastDescription.textContent = `${formattedDate} ${emojiSymbol}`;

   forecastBox.appendChild(forecastCard);
    forecastCard.appendChild(forecastDescription);
  
    const forecastTemp = document.createElement('p');
    forecastTemp.textContent= `Temp: ${Math.floor(data.list[0].main.temp_max)}°F`;
  
    const forecastWind = document.createElement('p');
    forecastWind.textContent = `Wind: ${Math.floor(data.list[0].wind.speed)} mph`;
  
    const forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = `Humidity: ${data.list[0].main.humidity} %`;
  
    forecastCard.appendChild(forecastTemp);
    forecastCard.appendChild(forecastWind);
    forecastCard.appendChild(forecastHumidity);
  



  }
}





window.addEventListener('load', renderFromLocalStorage);





//Add City Buttons: wont display on page load or after search button without a refresh action. It's displaying double buttons for what has been inputted. Each refresh is causing null to be saved in local storage

//Need buttons to display the correct city data to the right.

//styling everything

//clear weather data from being rendered when searching for a new city. 