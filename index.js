const searchLocationForm = document.querySelector('#searchLocationForm');
const searchLocationInput = document.querySelector('.locationSearchInput');
const searchLocationIcon = document.querySelector('#locationSearchIcon');

const cityNameField = document.querySelector('#cityName');
const tempField = document.querySelector('#temp');

const weatherIcon = document.querySelector('#weatherIcon');
const weatherMainField = document.querySelector('#weatherMain');
const weatherDescriptionField = document.querySelector('#weatherDescription');

const feelsTempField = document.querySelector('#feelsTemp');
const humidityField = document.querySelector('#humidity');
const windSpeedField = document.querySelector('#windSpeed');
const airPressureField = document.querySelector('#airPressure');

const APIKey = "171073ee66f087671dbe9dfd93e6be69";

// fetch weather data based on latitude and longitude of location and return data in object format
const fetchLocationWeatherData = async (latitude, longitude) => {
    let result;
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`).then((response) => {
        result = response.data;
    }).catch((error) => console.error(error));
    return result;
}

const fetchLocationData = async (location) => {
    let result;
    await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKey}`).then((response) => {
        const data = response.data[0];
        result = { name: data.name, country: data.country, latitude: data.lat, longitude: data.lon }
    }).catch((error) => console.error(error));
    return result;
}

const fetchWeatherIcon = (icon) => {
    const baseURL = 'https://openweathermap.org/img/wn/'
    const iconURL = `${baseURL}${icon}@2x.png`;
    return iconURL;
}

const setFields = (locationName, tempKelvin, feelsTempKelvin, weatherIconSrc, weatherMain, weatherDescription, humidity, windSpeed, airPressure) => {
    // metrics can be changed to celsius using '&units=metrics' in fetch request
    const tempCel = (Number(tempKelvin) - 273.15).toFixed(0);
    const feelsTempCel = (Number(feelsTempKelvin) - 273.15).toFixed(0);

    tempField.innerHTML = tempCel;
    feelsTempField.innerHTML = feelsTempCel;
    cityNameField.innerHTML = locationName;
    weatherIcon.src = weatherIconSrc;
    weatherMainField.innerHTML = weatherMain;
    weatherDescriptionField.innerHTML = weatherDescription;
    humidityField.innerHTML = `${humidity}%`;
    windSpeedField.innerHTML = `${windSpeed}mph`;
    airPressureField.innerHTML = `${airPressure}hPa`;
}


const submitLocationForm = async (event) => {
    event.preventDefault();

    if (searchLocationInput.value.trim().length <= 0) return console.log("Please enter a location");

    const locationData = await fetchLocationData(searchLocationInput.value);
    const weatherData = await fetchLocationWeatherData(locationData.latitude, locationData.longitude);
    const iconURL = fetchWeatherIcon(weatherData.weather[0].icon);
    setFields(locationData.name, weatherData.main.temp, weatherData.main.feels_like, iconURL, weatherData.weather[0].main, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, weatherData.main.pressure);

    searchLocationInput.value = '';
}

searchLocationForm.addEventListener('submit', submitLocationForm)

searchLocationIcon.addEventListener('click', () => {
    if (navigator.geolocation) {
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(userLocation, () => console.log('error'));
    } else {
        // Geolocation is not supported
        console.log('Geolocation is not supported');
    }
});

const userLocation = async (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const weatherData = await fetchLocationWeatherData(latitude, longitude); 
    const iconURL = fetchWeatherIcon(weatherData.weather[0].icon);
    setFields(weatherData.name, weatherData.main.temp, weatherData.main.feels_like, iconURL, weatherData.weather[0].main, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, weatherData.main.pressure);
}

