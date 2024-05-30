const button = document.querySelector('.button')
const inputValue = document.querySelector('.inputValue')
const city = document.querySelector('.city')
const desc = document.querySelector('.desc')
const temperature = document.querySelector('.temp')


button.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=fd9ef7dbe0229fd31347b03516a3d415')
  .then(response => response.json())
  .then(data => {
    let cityValue = data['name'];
    let tempValue = data['main']['temp'];
    let descValue = data['weather'][0]['description'];

    city.innerHTML = cityValue;
    temperature.innerHTML = tempValue;
    desc.innerHTML = descValue;
  })
  
  

.catch(err => alert("Incorrect city name!"))
})
