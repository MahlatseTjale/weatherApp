const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const cityName = document.getElementById("city-name");
const search = document.getElementById("search");

// const cityByName;
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
    // cityByName = city;
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <small class="today">Today's Weather</small>
        
        <h2> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        
    `;
    

    const cityByName = document.createElement("div");
    // weather.classList.add("weather");

    cityByName.innerHTML = `<h4>${data.name} , ${data.sys.country}</h4>`;

    search.value = "";

    cityName.innerHTML = "",

    cityName.appendChild(cityByName)

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
