const apikey = "c8454c5f51ba3213f0a3362703a15c58";

const weatherDateEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
        ];

        weatherDateEl.querySelector(
            ".icon"
        ).innerHTML =  `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDateEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}℃`;
        weatherDateEl.querySelector(".description").textContent = description;

        weatherDateEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");

        console.log(data);
    } catch(error) {
        weatherDateEl.querySelector(".icon").innerHTML = "";
        weatherDateEl.querySelector(".temperature").textContent = "";
        weatherDateEl.querySelector(".description").textContent = "An error happened, please try again later";
        weatherDateEl.querySelector(".details").innerHTML = "";
    }
}