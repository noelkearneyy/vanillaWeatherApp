const searchLocationForm = document.querySelector('#searchLocationForm');
const searchLocationInput = document.querySelector('.locationSearchInput');
const searchLocationIcon = document.querySelector('#locationSearchIcon');

const cityName = document.querySelector('#cityName');
const temp = document.querySelector('#temp');

const APIKey = "171073ee66f087671dbe9dfd93e6be69";

let result; 

   searchLocationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchLocationInput.value}&limit=1&appid=${APIKey}`).then((response) => {
        const data = response.data[0];
        result = {name: data.name, country: data.country, latitude: data.lat, longitude: data.lon}
     }).catch((error) => console.error(error));

     await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${result.latitude}&lon=${result.longitude}&appid=${APIKey}`).then((response) => {
        const data = response.data;
       cityName.innerHTML = result.name;
     }).catch((error) => console.error(error));

     searchLocationInput.value = ''
   })

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

