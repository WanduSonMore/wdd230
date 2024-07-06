
  // select HTML elements in the document
const currentTemp = document.querySelector('#temperature');
const currentHumidity = document.querySelector('#humidity')
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#currentConditions');

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=40.5566292&lon=-105.150053&appid=fbecddd063591d29cf733a7e9802066e&units=imperial'

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    currentHumidity.innerHTML = `${data.main.humidity}%`
    captionDesc.innerText = data.weather[0].main
    weatherIcon.setAttribute('src', " https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
}

async function apiFetch() {
    try {
      const response = await fetch(WEATHER_URL);
      if (response.ok) {
        const data = await response.json();
        // console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
 
  apiFetch();