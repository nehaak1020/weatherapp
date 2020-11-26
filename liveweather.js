const key = '8a5b8f62300c2b2d8f95e5bf25fd4a36';
const requestcity = async(city) => {
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    const response = await fetch(api)
    const data = await response.json();
    return data;
}

const ktoC = (k) => {
    const celsius = Math.round(k - 273.15)
    return celsius;
}

const date = document.querySelector('.date');
const weatherday = document.querySelector('.weather-day');
const temperature = document.querySelector('.temperature');
const citys = document.querySelector('.citys');
const country = document.querySelector('.country');
const timedescp = document.querySelector('.time-descp');
const feelslike = document.querySelector('.feels-like');
const icon  =  document.querySelector('.icon');

const updateweatherapp = (city) => {
    console.log(city)

    const present = new Date();

    let d = new Date(present);
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let dayName = days[d.getDay()];

    date.innerHTML = `${present.getDate()}-${(present.getMonth())+1}-${present.getFullYear()}`
    weatherday.textContent = dayName
    temperature.innerHTML = `${ktoC(city.main.temp)}<sup>o</sup>C`
    citys.textContent = city.name
    country.textContent = city.sys.country
    timedescp.textContent = city.weather[0].description
    feelslike.innerHTML = `${ktoC(city.main.feels_like)}<sup>o</sup>C`
    icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${city.weather[0].icon}.png'>`
}

const searchsubmit = document.querySelector('.searchsubmit');
const searchcity = document.querySelector('#searchcity')

searchsubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const citysearch = searchcity.value;
    searchsubmit.reset();

    requestcity(citysearch)
    .then(data => {
        updateweatherapp(data)
    })
    .catch(err => {
        console.log(err)
    })
})