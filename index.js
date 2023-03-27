const searchLocationInput = document.querySelector('.locationSearchInput');
const searchLocationIcon = document.querySelector('#locationSearchIcon');

const searchDetails = {}

searchLocationInput.addEventListener('input', (event) => {
    const searchValue = event.target.value;
    
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

    console.log(latitude, longitude);
}

const searchWeatherLocation = () => {

}