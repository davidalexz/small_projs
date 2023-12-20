const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const APIKEY = config.apiKey;
const APIURL = (city) =>
    `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=metric&apikey=${APIKEY}`;

async function getWeatherByLocation(city) {
    const res = await fetch(APIURL(city));
    const data = await res.json();
    addWeatherDataToPage(data);
}

function addWeatherDataToPage(data) {
    const temp = data.data.values.temperature;
    const iconT = data.data.values.weatherCode;

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
	<h2>${temp}°C</h2>
	<small>in ${search.value}</small>
	<img>${iconT}</img>
	`;
    main.innerHTML = '';

    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
