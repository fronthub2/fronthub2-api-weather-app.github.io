const API_KEY = 'bee6c3045eda981acd1b46bc1463a7e2'

const form = document.querySelector('.form')
const input = document.querySelector('.input-form')

form.onsubmit = submitHandler

async function submitHandler(e) {
    e.preventDefault()

    if (!input.value.trim()) {
        return
    }


    const cityInfo = await getGeo(input.value.trim())

    if (cityInfo.lenght === 0) return

    input.value = ''


    const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon'])

    const weatherObj = {
        temp: weatherInfo.main.temp,
        city: weatherInfo.name,
        humidity: weatherInfo.main.humidity,
        wind: weatherInfo.wind.speed,
        img: weatherInfo.weather[0].main,
    }

    renderWeatherData(weatherObj)

}

async function getGeo(name) {
    const api_geo = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`
    const responce = await fetch(api_geo)
    const data = await responce.json()
    return data
}

async function getWeather(lat, lon) {
    const api_weather = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const responce = await fetch(api_weather)
    const data = await responce.json()
    return data
}

function renderWeatherData(data) {
    document.querySelector('.weather-details').classList.remove('hide')
    document.querySelector('.weather-info').classList.remove('hide')

    const degrees = document.querySelector('.details-degrees')
    const city = document.querySelector('.details-city')
    const wind = document.querySelector('#wind')
    const humidity = document.querySelector('#humidity')

    degrees.innerText = Math.round(data.temp) + ' °C'
    city.innerText = data.city
    wind.innerText = data.wind + ' km/h'
    humidity.innerText = data.humidity + ' %'
}