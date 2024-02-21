async function start() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );
  const weatherData = await weatherPromise.json();

  const currentTemperature = weatherData.properties.periods[0].temperature;

  document.querySelector("#temperature-output").textContent =
    currentTemperature;

  console.log(currentTemperature);
  console.log(weatherData.properties.periods[0].temperature);
}

start();
