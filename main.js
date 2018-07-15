$(document).ready(function() {

  let tripBooker = document.querySelector('.bookATrip');

  tripBooker.addEventListener('click', function() {
    document.querySelector('.bookTrip').style.display = "block"
    document.querySelector('.bookTrip').style.animation = "fadeInBook 2s forwards"
  })

  $(function() {
    $('#myCarousel').carousel();
  });

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
    axios.get('https://api.openweathermap.org/data/2.5/forecast?id=6201373&APPID=d2759249bf9ce3e1e3b6a45433e4299f')
      .then(function(response) {

        let SantoDomingo = new cityInfo(response);

        cityChanger.innerText = SantoDomingo.cityName;
        weatherChanger.innerText = "Current temperature: " + Math.round((SantoDomingo.cityTemp - 273));
        humidityChanger.innerText = "Humidity: " + SantoDomingo.cityHumidity + "%";
        iconChanger.src = "https://openweathermap.org/img/w/" + SantoDomingo.cityIcon + ".png";

      })
  })

  SantiagoClicker.addEventListener('click', function() {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?id=3492914&APPID=d2759249bf9ce3e1e3b6a45433e4299f")
      .then(function(response) {

        let Santiago = new cityInfo(response);

        cityChanger.innerText = Santiago.cityName;
        weatherChanger.innerText = "Current temperature: " + Math.round((Santiago.cityTemp - 273));
        humidityChanger.innerText = "Humidity: " + Santiago.cityHumidity + "%";
        iconChanger.src = "https://openweathermap.org/img/w/" + Santiago.cityIcon + ".png";
      })
  })

  PuntaCanaClicker.addEventListener('click', function() {
    axios.get("https://api.openweathermap.org/data/2.5/forecast?id=3494242&APPID=d2759249bf9ce3e1e3b6a45433e4299f")
      .then(function(response) {

        let PuntaCana = new cityInfo(response);

        cityChanger.innerText = PuntaCana.cityName;
        weatherChanger.innerText = "Current temperature: " + Math.round((PuntaCana.cityTemp - 273));
        humidityChanger.innerText = "Humidity: " + PuntaCana.cityHumidity + "%";
        iconChanger.src = "https://openweathermap.org/img/w/" + PuntaCana.cityIcon + ".png";
      })
  })

  axios.get('https://api.openweathermap.org/data/2.5/forecast?id=6201373&APPID=d2759249bf9ce3e1e3b6a45433e4299f')
    .then(function(response) {

      let SantoDomingo = new cityInfo(response);

      cityChanger.innerText = SantoDomingo.cityName;
      weatherChanger.innerText = "Current temperature: " + Math.round((SantoDomingo.cityTemp - 273));
      humidityChanger.innerText = "Humidity: " + SantoDomingo.cityHumidity + "%";
      iconChanger.src = "https://openweathermap.org/img/w/" + SantoDomingo.cityIcon + ".png";

    })


  let travelersCheck = document.querySelector('.travelersInput');
  let toolTipAdder = document.querySelector('.toolTip');

  function generateTravelerForms() {
    let nameForms = "<div class='row userNameInfoRow col-lg-12 mx-auto justify-content-center'><div class='col-lg-4 text-left py-2'>First Name <input type:'text' class='form-control userNameInputBox firstName'></div><div class='col-lg-4 text-left py-2'>Last Name <input type='text' class='form-control userNameInputBox lastName'></div> <span class='float-right closingButton'>&times</span> </div>"
    return nameForms
  }

  travelersCheck.addEventListener('change', function() {

    if (travelersCheck.value === "") {
      toolTipAdder.style.display = "block";
    } else if (travelersCheck.value !== "") {
      toolTipAdder.style.display = "none";
      toolTipAdder.style.animationFillMode = "forwards";
    }
    for (let i = 0; i < travelersCheck.value; i++) {
      let UserMainContainer = document.querySelector('.userInfoContainer');
      let userInfoInnerContainer = document.createElement("DIV");
      userInfoInnerContainer.innerHTML = generateTravelerForms();
      UserMainContainer.appendChild(userInfoInnerContainer);
      let userNameButtonClosers = document.querySelectorAll('.closingButton');
      let userNameInfoRows = document.querySelectorAll('.userNameInfoRow');
      for (let j = 0; j < userNameInfoRows.length; j++) {
        userNameButtonClosers[j].addEventListener('click', function() {
          userNameInfoRows[j].style.display = "none";
        })
      }
    }
  })



  let destination = document.querySelector(".tripSelector")
  let departureDate = document.querySelector(".departureDate");
  let returnDate = document.querySelector(".returnDate");
  let initialInfo = document.querySelector(".submitPrimaryInfo");

  initialInfo.addEventListener('click', function() {
    let travelers = [];
    let userInfoRows = document.querySelectorAll('.userNameInfoRow')
    let fName = document.querySelectorAll('.firstName')
    let lName = document.querySelectorAll('.lastName')

    for (let i = 0; i < userInfoRows.length; i++) {
      travelers.push({
        firstName: fName[i],
        lastName: lName[i]
      })
      console.log(travelers[i].firstName.value + ' ' + travelers[i].lastName.value)
    }

    console.log("Your destination is " + destination.value + " departure date:" + departureDate.value + " and return date:" + returnDate.value)
  })


})