const apiKey = "01a43febcac04c9aaa7151740241506"
let city = "Kyiv"

document.querySelector("#searchButton").addEventListener("click", () => {
    let city = document.querySelector("#cityInput").value
    console.log(city)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`).then(response => response.json()).then(json => {
        render(json)
    })
})
document.querySelector('#cityInput').addEventListener('change', () => {

    const city = document.querySelector('#cityInput').value
    if (city == '') {
        alertify.error("city Input is empty")
        return;
    }
    fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let city = json.map(el => el.name)
            document.querySelector("#city").innerHTML = ""
            city.forEach(element => {
                document.querySelector("#city").innerHTML += `<option value="${element}">${element}</option>`
            });
        })
})

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(json => {
        render(json)
    })


function render(json) {
    if (json.code == '404') {
        alertify.error("City not found")
    }
    console.log(json)
    document.querySelector(".temp").innerHTML = "temp🌡️: " + json.current.temp_c + "°C"
    document.querySelector(".condition").innerHTML = json.current.condition.text
    document.querySelector(".feelslike").innerHTML = "feelslike: " + json.current.feelslike_c + "°C"
    document.querySelector(".current img").setAttribute("src", json.current.condition.icon)
    document.querySelector(".wind").innerHTML = "wind💨: " + json.current.wind_kph + "k/h"
    document.querySelector(".wind_dir").innerHTML = "wind dir.🧭:" + json.current.wind_dir
    document.querySelector(".cloud").innerHTML = "cloud☁️: " + json.current.cloud + "%"
    document.querySelector(".pressure").innerHTML = "Presure⏲️: " + json.current.pressure_mb + "mb"


    document.querySelector("#cityName").innerHTML = json.location.country + ", " + json.location.name
    document.querySelector(".box").innerHTML = ""
    json.forecast.forecastday.forEach(element => {
        document.querySelector(".box").innerHTML += `
            <div class="day 1">
                <h2>${element.date}</h2>
                <img src="${element.day.condition.icon}" alt="">
                <h3> ${element.day.maxtemp_c}°C - ${element.day.mintemp_c}°C</h3>
                <h4>${element.day.condition.text}</h4>
                
            </div>
            
            `

        let color = "";
        if (json.current.temp_c <= 0) {
            color = "rgba(71, 169, 211, 0.6)";
        } else if (json.current.temp_c > 0 && json.current.temp_c <= 10) {
            color = "rgba(78, 226, 211, 0.6)";
        } else if (json.current.temp_c > 10 && json.current.temp_c <= 20) {
            color = "rgba(104, 235, 53, 0.6)";
        } else if (json.current.temp_c > 20 && json.current.temp_c <= 25) {
            color = "rgba(247, 231, 7, 0.6)";
        } else if (json.current.temp_c > 25 && json.current.temp_c <= 30) {
            color = "rgba(247, 163, 7, 0.6)";
        } else if (json.current.temp_c > 30 && json.current.temp_c <= 40) {
            color = "rgba(247, 87, 7, 0.6)";
        }
        document.querySelector(".current").style.background = color;


    })

}