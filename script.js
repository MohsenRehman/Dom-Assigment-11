const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

const apiKey = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

// Weather Function
async function getWeather(city) {
  result.innerHTML = "";
  result.className = "loading";
  result.textContent = "Loading...";

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );

    let data = await response.json();

    if (data.cod === "404") {
      showError("City not found");
      return;
    }

    displayWeather(data);

    // Save city
    localStorage.setItem("lastCity", city);
  } catch (error) {
    showError("Something went wrong");
  }
}

// Display Weather
function displayWeather(data) {
  result.innerHTML = "";
  result.classList.remove("loading");

  let city = document.createElement("h3");
  city.textContent = "City: " + data.name;

  let temp = document.createElement("p");
  temp.textContent = "Temperature: " + data.main.temp + "°C";

  let desc = document.createElement("p");
  desc.textContent = "Weather: " + data.weather[0].description;

  let humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.main.humidity + "%";

  result.append(city, temp, desc, humidity);
}

// Error Function
function showError(message) {
  result.innerHTML = "";
  result.className = "error";
  result.textContent = message;
}

// Button Click
button.addEventListener("click", () => {
  let city = input.value.trim();

  if (city !== "") {
    getWeather(city);
  }
});

// Enter Key Support
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let city = input.value.trim();

    if (city !== "") {
      getWeather(city);
    }
  }
});

// Load Last City
window.addEventListener("load", () => {
  let lastCity = localStorage.getItem("lastCity");

  if (lastCity) {
    input.value = lastCity;
    getWeather(lastCity);
  }
});
