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
    let UserMainContainer = document.querySelector('.userInfoContainer');
    let userNameInfoRows ;
    let userNameButtonClosers;
    let userInfoInnerContainer;

    if (travelersCheck.value === "") {
      toolTipAdder.style.display = "block";
    } else
    if (travelersCheck.value !== "") {
      toolTipAdder.style.display = "none";
      toolTipAdder.style.animationFillMode = "forwards";
    }


    for (let i = 0; i < travelersCheck.value; i++) {
      userInfoInnerContainer = document.createElement("DIV");
      UserMainContainer.appendChild(userInfoInnerContainer);
      userInfoInnerContainer.innerHTML = generateTravelerForms();
      userNameButtonClosers = document.querySelectorAll('.closingButton');
      userNameInfoRows = document.querySelectorAll('.userNameInfoRow');
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
  let submitTravelButton = document.querySelector(".submitPrimaryInfo");

  submitTravelButton.addEventListener('click', function() {
    let travelers = [];
    let fName = document.querySelectorAll('.firstName')
    let lName = document.querySelectorAll('.lastName')
    document.querySelector('.selectionRow').innerHTML = "";
    document.querySelector('.datePlanner').innerHTML = "";
    document.querySelector('.userInfoContainer').innerHTML = "";

    for (let i = 0; i < fName.length; i++) {
      travelers.push({
        firstName: fName[i].value,
        lastName: lName[i].value
      })
      document.querySelector('.selectionRow').innerHTML += "Traveler First Name: " + travelers[i].firstName + " | Last Name: " + travelers[i].lastName + "<br>"
    }
    document.querySelector('.userInfoContainer').innerHTML = "Departure Date: " + departureDate.value + " | " + "Return Date: " + returnDate.value
    document.querySelector('.datePlanner').innerHTML = "Destination: " + destination.value;
    submitTravelButton.style.display = "none";
    document.querySelector('.bookTrip').classList.add('bookTripSubmit')
    document.querySelector('.submitCloserButton').style.display = "block"
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'slideUp'
    toastr.options.showMethod = 'slideDown'
    toastr.success('Congratulations your trip to ' + destination.value + ' has been booked!', "You're All Set!")
    let submitClosingButton = document.querySelector('.submitCloserButton');
    submitClosingButton.addEventListener('click', function() {
      document.querySelector('.bookTrip').style.display = "none"
    })
  })

let discoverDR = document.querySelector('.discoverDRLink');

discoverDR.addEventListener('click', function(){
  document.querySelector('.discoverDRContainer').style.display="block"

})

let openModal = document.querySelectorAll('.aboutCol');
let aboutTitle = document.querySelectorAll('.aboutHeadTitle');
let closeModal = document.querySelector('.close');

closeModal.addEventListener('click', function(){
  document.querySelector('.modal').style.display="none"
})

for (let i = 0; i < openModal.length; i++){
  openModal[i].addEventListener('click', function(){
    document.querySelector('.modal').style.display="block"
    document.querySelector('.modal-title').innerText = aboutTitle[i].innerText
  })
}


})
