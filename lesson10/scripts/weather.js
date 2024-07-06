const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=36.1245484&lon=-115.5046478&appid=fbecddd063591d29cf733a7e9802066e&units=imperial'

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDesc.innerText = data.weather[0].main
    weatherIcon.setAttribute('src', " https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    // const iconsrc = `https://openweathermap.org/img/w/${______}.___`;
    // let desc = data.weather[0].______;
    // weatherIcon.setAttribute('___', _____);
    // weatherIcon.setAttribute('___', _____);
    // captionDesc.textContent = `${desc}`;
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
