const button = document.querySelector('#search-btn')
const errorText = document.querySelector('.error')
const inputValue = document.querySelector('.inputValue')
const currentWeatherDiv = document.querySelector('#display-today')
const forecastDiv = document.querySelector('#display-forecast')
const searchHistoryList = document.querySelector('#search-history')


let searchHistory = []

button.addEventListener('click', fetchWeatherData);


const city = inputValue.value.trim();
// function searchCity(){

//   if (city) {
//     fetchWeatherData(city);
//     inputValue.value = '';
//   }
// }

function fetchWeatherData(city) {

  const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=fd9ef7dbe0229fd31347b03516a3d415`;

  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  
  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  //    {
  //   // console.log('Response', response);
  //     // return response.json();
  // })

    .then(response => {
      const lat= response[0].lat;
      const lon= response[0].lon; 

      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fd9ef7dbe0229fd31347b03516a3d415`)


      
      .then(response => response.json())
      .then(data => {
        currentWeatherDiv.data.city.name;      
        console.log(data.city.name);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error)
      });
      // console.log(lat);
    })
    .catch(error => {
      console.log('Error fetching geolocation data:', error)
    });
    // searchCity();
  }
fetchWeatherData(city);

  // .then(function (response) {
  //   if (response.status === 404) {
  //     errorText.textContent = 'Result not found'
  //     return;
  //   } else {
  //     return response.json()
  //   }
  // })
  // .then(function(response){
   
    
//   // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fd9ef7dbe0229fd31347b03516a3d415`)
//     .then(function (response) {
//       if (response.status === 404) {
//         errorText.textContent = 'Result not found'
//         return;
//       } else {
//         return response.json()
//       }
//     })
//     .then(data => {


//       city.innerHTML = data.city.name;
//       // temperature.innerHTML = data.list[0].temp_max;
//     })
// })}





// .catch(err => alert("Incorrect city name!"))
// })


//1. fetch data from API
//2. save data items to local storage
//3. read data items from local storage
//4. create card for today forecast and append to html
//5. create cards for 5 day forecast and append to html
//6. function to render the list
//7. Function for Search button
// 8. ready function