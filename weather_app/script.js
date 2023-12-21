const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const APIKEY = config.apiKey;

const COORDAPI = (city) =>
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`;

const WEATHERAPI = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;

async function getCoordinates(city) {
    const res = await fetch(COORDAPI(city));
    const data = await res.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    getWeatherByLocation(lat, lon);
}
async function getWeatherByLocation(lat, lon) {
    const res = await fetch(WEATHERAPI(lat, lon));
    const data = await res.json();
    addWeatherDataToPage(data);
}

function addWeatherDataToPage(data) {
    const temp = Math.floor(data.main.temp);
    const imgCode = data.weather[0].icon;

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
	<h2>${temp}°C</h2>
	<small>in ${search.value}</small>
	<img src="https://openweathermap.org/img/wn/${imgCode}@2x.png" >
	
	`;
    // main.innerHTML = '';

    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getCoordinates(city);
    }
});
