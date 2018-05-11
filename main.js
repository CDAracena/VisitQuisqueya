let cityChanger = document.querySelector('.locationName');
let weatherChanger = document.querySelector('.locationWeather');
let humidityChanger = document.querySelector('.locationHumidity');
let iconChanger = document.querySelector('.locationIcon');

let SantoDomingoClicker = document.querySelector('.SantoDomingoBtn');
let SantiagoClicker = document.querySelector('.SantiagoBtn');
let PuntaCanaClicker = document.querySelector('.PuntaCanaBtn');

class cityInfo {
  constructor(response) {
    this.cityName = response.data.city.name;
    this.cityTemp = response.data.list[0].main.temp;
    this.cityHumidity = response.data.list[0].main.humidity;
    this.cityIcon = response.data.list[0].weather[0].icon;
  }
}

// The stuff below works just fine.

SantoDomingoClicker.addEventListener('click', function() {
  axios.get('http://api.openweathermap.org/data/2.5/forecast?id=6201373&APPID=d2759249bf9ce3e1e3b6a45433e4299f')
    .then(function(response) {

      let SantoDomingo = new cityInfo(response);

      cityChanger.innerText = SantoDomingo.cityName;
      weatherChanger.innerText = "Current temperature: " + Math.round((SantoDomingo.cityTemp - 273));
      humidityChanger.innerText = "Humidity: " + SantoDomingo.cityHumidity + "%";
      iconChanger.src = "https://openweathermap.org/img/w/" + SantoDomingo.cityIcon + ".png";

    })
})

SantiagoClicker.addEventListener('click', function() {
  axios.get("http://api.openweathermap.org/data/2.5/forecast?id=3492914&APPID=d2759249bf9ce3e1e3b6a45433e4299f")
    .then(function(response) {

      let Santiago = new cityInfo(response);

      cityChanger.innerText = Santiago.cityName;
      weatherChanger.innerText = "Current temperature: " + Math.round((Santiago.cityTemp - 273));
      humidityChanger.innerText = "Humidity: " + Santiago.cityHumidity + "%";
      iconChanger.src = "https://openweathermap.org/img/w/" + Santiago.cityIcon + ".png";
    })
})

PuntaCanaClicker.addEventListener('click', function() {
  axios.get("http://api.openweathermap.org/data/2.5/forecast?id=3494242&APPID=d2759249bf9ce3e1e3b6a45433e4299f")
    .then(function(response) {

      let PuntaCana = new cityInfo(response);

      cityChanger.innerText = PuntaCana.cityName;
      weatherChanger.innerText = "Current temperature: " + Math.round((PuntaCana.cityTemp - 273));
      humidityChanger.innerText = "Humidity: " + PuntaCana.cityHumidity + "%";
      iconChanger.src = "https://openweathermap.org/img/w/" + PuntaCana.cityIcon + ".png";
    })
})