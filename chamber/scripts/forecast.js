const WEATHER_URL2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=36.1245484&lon=-115.5046478&appid=fbecddd063591d29cf733a7e9802066e&units=imperial'


function showCurrentTimeForcast(forecast){
    const weatherElt = document.querySelector("body main .weather .weather-card")

    const timenow = forecast[0].dt_txt.slice(11, 19)

    let temps = forecast.filter(x => x.dt_txt.indexOf(timenow) != -1)

    // Output 
    for (let i=1; i<=3; i++){
        let newsection = document.createElement("forecast")
        let mydate = temps[i].dt_txt.slice(0, 10)
        newsection.innerHTML = `
        <div>
        <img src="https://openweathermap.org/img/wn/${temps[i].weather[0].icon}@2x.png"}" alt="Weather Image">
        <h2>${mydate}</h2>
        <p>${temps[i].main.temp}&deg;F @ ${timenow}</p>
        </div>`
        weatherElt.append(newsection)

    }
}


async function apiFetch() {
    try {
      const response = await fetch(WEATHER_URL2)
      if (response.ok) {
        const data = await response.json()
        // console.log(data); // testing only
        showCurrentTimeForcast(data.list) // uncomment when ready
      } else {
          throw Error(await response.text())
      }
    } catch (error) {
        console.log(error)
    }
  }
 
  apiFetch();