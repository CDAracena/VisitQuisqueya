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
let closeModal = document.querySelectorAll('.close');

for (let i = 0; i < closeModal.length; i++){
closeModal[i].addEventListener('click', function(){
  document.querySelector('.modal').style.display="none"
})
}

let aboutItems = [{
  paragraph: "The music of the Dominican Republic is vibrant, colorful and heavily creolized. The sounds are often a combination of the island's indigenous, african and european roots.",
  modalIMG1: 'guira.jpg',
  modalIMG1Title: 'La Guira',
  modalImg1Para: 'La Guira is a metalic instrument with 2 main components. The main component is a metalic cylinder with slight indentations inside and outside its base. The secondary component is a metalic forked tool that looks similar to an afro brush. ',
  modalIMG2Title: 'Drums',
  modalIMG2Para: 'Dominican musical genres consist of a variety of drums from bongos to "tamboras" (drums in Spanish. In bachata, the bongos are the most prominent forms of percussion. The bongos originate from the African continent. Certain debates are ongoing as to which particular region should be presented as its originator but the fact remains: The bongos are an African instrument that was brought to the Dominican Republic by African slaves.',
  modalIMG2: 'bongos.jpg',
  modalIMG3Title: 'Guitar',
  modalIMG3Para: 'The Spanish guitar was introduced to the Dominican Republic by Spanish conquistadors. Typically a wooden base with a noticeable hole in the middle. Strings will be attached over the hole of the base and extend to an additional component.',
  modalIMG3: 'guitar.jpg'
},
{
  paragraph: "The history of the Dominican Republic is one characterized by its various Indigenous, African and European influences. Various unique time periods have led to the look and feel of contemporary Dominican Republic.",
  modalIMG1: 'taino_natives.jpg',
  modalIMG1Title: 'Tainos',
  modalImg1Para: 'Taíno Indians, a subgroup of the Arawakan Indians (a group of American Indians in northeastern South America), inhabited the Greater Antilles (comprising Cuba, Jamaica, Hispaniola [Haiti and the Dominican Republic], and Puerto Rico) in the Caribbean Sea at the time when Christopher Columbus arrived to the New World.The Taíno culture impressed both the Spanish (who observed it) and modern sociologists. The Arawakan achievements included construction of ceremonial ball parks    whose boundaries were marked by upright stone dolmens, development of a universal language, and creation of a complicated religious cosmology.',
  modalIMG2Title: 'Africans',
  modalIMG2Para: 'In 1502 (or 1503), the Spanish Crown finally acquiesced to the colonists demands for enslaved Africans. A decade of intense exploitation and deadly waves of plagues had reduced the indigenous populations to levels that even the Spaniards considered dangerous. As the Hispaniolan Tainos (and Cigüayos) declined during the first couple of years of colonization, the Christopher Columbus Administration had gone against the wishes of Isabel I of Castile and had begun the first European slave trade on the western side of Atlantic. Raids that cleared out from Santo Domingo under the disguise of pacification and to evangelize nearby islanders had brought in other Amerindians to the colony. They were a large number of enslaved Lucayos from the Bahamas and Kalingas from the eastern islands. Now toiling alongside native Hispaniolans, these war captives became the first enslaved foreign workers on the island of Aytí, one of the indigenous names for the island that Columbus called Hispaniola',
  modalIMG2: 'cuban_plantation.jpg',
  modalIMG3Title: 'Spaniards',
  modalIMG3Para: 'In April 1492, Cristobal Colon’s (the Spanish name for the explorer known as Christopher Columbus in English) conditions for the exploration of trade routes to India were accepted by the Spanish monarchs, King Fernando and Queen Isabel (Ferdinand II of Aragon and Isabella I of Castile). Columbus was given the titles of Viceroy, Admiral and Governor of the lands to be discovered, as well as 10% of the wealth obtained. Shortly after, in August 1492, Columbus left the port of Palos, Spain in search of a new trade route to India. After four months of aimless sailing across the Atlantic, Columbus finally had hope of making his voyage a success. Their first sighting of land was on 12th October, one of the islands of what is now the Bahamas. Columbus named it San Salvador, and then went on to explore Cuba. In December 1492, Columbus and his three ships, the Nina, the Pinta, and the Santa Maria landed on an island called Haiti/Quisqueya (the original Taino names for Hispaniola). This event, and the ensuing encounter with the island’s indigenous population, was to set off a chain of events that would affect world history for the next 500 years. ',
  modalIMG3: 'columbus.jpg'
},
{
  paragraph: "Santo Domingo, Punta Cana and Santiago all have beautiful sites for wandering travelers!",
  modalIMG1: 'el_monumento.jpg',
  modalIMG1Title: 'Santiago - El Monumento',
  modalImg1Para: 'The Monumento a los héroes de la Restauración (Monument to the Heroes of the Restoration of the Republic) is located on a hill on the eastern side of the centre of Santiago de los Caballeros, at the most colorful and emblematic place of the city and one of the most visited ones in the Dominican Republic.',
  modalIMG2: 'alcazar_colon.jpg',
  modalIMG2Para: "The Alcázar de Colón, or Columbus Alcazar, located in Santo Domingo's Ciudad Colonial, Dominican Republic, is the oldest Viceregal residence in the Americas, and forms part of the Ciudad Colonial UNESCOs World Heritage Site.",
  modalIMG2Title: 'Santo Domingo - Alcazar de Colon',
  modalIMG3: 'Playa-Blanca.jpg',
  modalIMG3Title: 'Punta Cana - Playa Blanca',
  modalIMG3Para: 'Chic, cool and casual!  The Caribbean water is crystal clear, lagoon-like as you can walk for quite a distance without getting in over your head.  The water almost appears white in some areas.  The sand is oh so white, with palm trees and gardens lining the restaurant and beach.  There is an exquisite palm grove where private parties are catered to by Playa Blanca Restaurant. The tropical and international menu is excellent and the drinks divine!'

}]

for (let i = 0; i < openModal.length; i++){
  openModal[i].addEventListener('click', function(){
    document.querySelector('.modal').style.display="block"
    document.querySelector('.modal-title').innerText = aboutTitle[i].innerText
    document.querySelector('.modalPara').innerText = aboutItems[i].paragraph
    document.querySelector('.modal-IMG1').src = aboutItems[i].modalIMG1
    document.querySelector('.img1Title').innerText = aboutItems[i].modalIMG1Title
    document.querySelector('.IMG1Para').innerText = aboutItems[i].modalImg1Para
    document.querySelector('.img2Title').innerText = aboutItems[i].modalIMG2Title
    document.querySelector('.IMG2Para').innerText = aboutItems[i].modalIMG2Para
    document.querySelector('.modal-IMG2').src = aboutItems[i].modalIMG2
    document.querySelector('.img3Title').innerText = aboutItems[i].modalIMG3Title
    document.querySelector('.IMG3Para').innerText = aboutItems[i].modalIMG3Para
    document.querySelector('.modal-IMG3').src = aboutItems[i].modalIMG3

  })
}


})
