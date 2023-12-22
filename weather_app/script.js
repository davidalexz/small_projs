const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const WEATHERKEY = weatherAPI.apiKey;
const UNSPLASHKEY = unsplashAPI.apiKey;

const UNSPLASHAPI = (city) =>
    `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${UNSPLASHKEY}`;
const COORDAPI = (city) =>
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHERKEY}`;

const WEATHERAPI = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHERKEY}`;

async function getCoordinates(city) {
    const resCoord = await fetch(COORDAPI(city));
    const resImg = await fetch(UNSPLASHAPI(city));
    const dataCoord = await resCoord.json();
    const dataImg = await resImg.json();
    const cityImage = dataImg.results[0].urls.regular;
    const lat = dataCoord[0].lat;
    const lon = dataCoord[0].lon;
    getWeatherByLocation(lat, lon, cityImage);
}
async function getWeatherByLocation(lat, lon, cityImage) {
    const res = await fetch(WEATHERAPI(lat, lon));
    const data = await res.json();

    addWeatherDataToPage(data, cityImage);
}

function addWeatherDataToPage(data, cityImage) {
    const temp = Math.floor(data.main.temp);
    const imgCode = data.weather[0].icon;

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
	<img class="city" src="${cityImage}">
	<h2>${temp}°C</h2>
	<small>in ${search.value}</small>
	<img class="condition" src="https://openweathermap.org/img/wn/${imgCode}@2x.png" >
	
	`;
    main.innerHTML = '';

    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getCoordinates(city);
    }
});
