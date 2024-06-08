const search = document.querySelector("#searchButton")
const apiKey = "f52ffd42cd8d4858a23151458240106"
alertify.error("Error")
search.addEventListener("click", () => {
    let city = document.querySelector("#cityInput").value

    fetch(`http://api.weatherapi.com/v1/current.json?key=f52ffd42cd8d4858a23151458240106&q=${city}`)
})
document.querySelector('#cityInput').addEventListener('change', () => {

    const city = document.querySelector('#cityInput').value
    if (city == '') {
        return;
    }
    fetch(`http://api.weatherapi.com/v1/search.json?key=f52ffd42cd8d4858a23151458240106&q=${city}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
})

fetch(`http://api.weatherapi.com/v1/current.json?${apiKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.code == '404') {
            alertify.error("City not found")
        }
        
        const temperature = json.current.temp_c
        const condition = json.current.condition.text
        const city = json.location.name
        const humidity = json.current.humidity
        const wind = json.current.wind_kph

        temperature.innerHTML = `${temperature}<span>°C</span>`
        condition.innerHTML = `${condition}`
        city.innerHTML = `${city}`
        humidity.innerHTML = `${humidity}<span>%</span>`
        wind.innerHTML = `${wind} <span>km/h</span>`


    })
