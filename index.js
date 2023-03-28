const searchLocationInput = document.querySelector('.locationSearchInput');
const searchLocationIcon = document.querySelector('#locationSearchIcon');

const APIKey = "171073ee66f087671dbe9dfd93e6be69";

let searchDetails = {
    latitude: '',
    longitude: '',
    city: '',
}

const searchWeatherLocation = () => {
    // const url = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${APIKey}`
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=54.5198883&lon=-6.0480218&appid=171073ee66f087671dbe9dfd93e6be69`).then((response) => {
       console.log(response.data);
     })
     .catch((error) => console.error(error));
   }

searchLocationInput.addEventListener('input', (event) => {
    const searchValue = event.target.value;
    searchWeatherLocation()

});

searchLocationIcon.addEventListener('click', () => {
    if (navigator.geolocation) {
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(userLocation, ()=>console.log('error'));
      } else {
        // Geolocation is not supported
        console.log('Geolocation is not supported');
      }
});

const userLocation = (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    searchDetails = {
        ...searchDetails, 
        latitude: latitude,
        longitude: longitude,
    }

    console.log(searchDetails);
}

