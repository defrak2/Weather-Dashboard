const button = document.querySelector('.button')

const city = document.querySelector('.city')
const desc = document.querySelector('.desc')
const temperature = document.querySelector('.temp')
const responseText = ''


button.addEventListener('click', function(){
  const inputValue = document.querySelector('.inputValue').value
  const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=fd9ef7dbe0229fd31347b03516a3d415`
  fetch(geoURL)

  .then(function (response) {
    if (response.status === 404) {
      responseText.textContent = 'Result not found'
      return;
    } else {
      return response.json()
    }
  })
  .then(function(response){
    let lat= response[0].lat;
    let lon= response[0].lon;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fd9ef7dbe0229fd31347b03516a3d415`)
    .then(function (response) {
      if (response.status === 404) {
        responseText.textContent = 'Result not found'
        return;
      } else {
        return response.json()
      }
    })
    .then(data => {


      city.innerHTML = data.city.name;
      temperature.innerHTML = data.list[0].temp_max;
    })
  })
 


  
  

.catch(err => alert("Incorrect city name!"))
})
