let SantoDomingoAPI = "http://api.openweathermap.org/data/2.5/forecast?id=6201373&APPID=d2759249bf9ce3e1e3b6a45433e4299f";

let cityChanger = document.querySelector('.locationName');
let weatherChanger = document.querySelector('.locationWeather');
let humidityChanger = document.querySelector('.locationHumidity');

class cityInfo {
  constructor(response){
    this.cityName = response.data.city.name;
    this.cityTemp = response.data.list[0].main.temp;
    this.cityHumidity = response.data.list[0].main.humidity;
  }
}

// The stuff below works just fine.
axios.get(SantoDomingoAPI)
.then(function(response){
  console.log(response);
  console.log(response.data.city.name)
  console.log(response.data.list[0].main.temp)
  console.log(response.data.list[0].main.humidity);

  let SantoDomingo = new cityInfo(response);

  cityChanger.innerText = SantoDomingo.cityName;
  weatherChanger.innerText = SantoDomingo.cityTemp - 273.15;
  humidityChanger.innerText = SantoDomingo.cityHumidity; 



})
