document.addEventListener("DOMContentLoaded", function() {
    const temperatureElement = document.getElementById("temperature")
    const windSpeedElement = document.getElementById("wind-speed")
    const windChillElement = document.getElementById("wind-chill")

    const temperature = parseFloat(temperatureElement.textContent)
    const windSpeed = parseFloat(windSpeedElement.textContent)

    function calculateWindChill(temp, windSpeed) {
        if (temp <= 50 && windSpeed > 3.0) {
            const windChill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16))
            return windChill.toFixed(2)
        } else {
            return "N/A"
        }
    }

    const windChillValue = calculateWindChill(temperature, windSpeed)
    windChillElement.textContent = windChillValue
})