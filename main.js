const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );
  const weatherData = await weatherPromise.json();

  const currentTemperature = weatherData.properties.periods[0].temperature;

  document.querySelector("#temperature-output").textContent =
    currentTemperature;
}

start();

async function petsArea() {
  const petsPromise = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const petsData = await petsPromise.json();
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true);

    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear);

    if (!pet.photo) pet.photo = "images/fallback.jpg";

    clone.querySelector(".pet-card-photo img").src = pet.photo;
    clone.querySelector(
      ".pet-card-photo img"
    ).alt = `A ${pet.species} named ${pet.name}.`;
    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear() - 1; // get date to instructors year - 2023
  const age = currentYear - birthYear;

  if (age == 1) return "1 year old";
  if (age == 0) return "Less that one year old";
  return ` ${age} years old`;
}

// Pet filter button code
const allButtons = document.querySelectorAll(".pet-filter button");

allButtons.forEach(el => {
  el.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from all buttons
  allButtons.forEach(el => el.classList.remove("active"));
  // add active class to specific button that just got clicked
  e.target.classList.add("active");
  //actually filter the pets down below
}
