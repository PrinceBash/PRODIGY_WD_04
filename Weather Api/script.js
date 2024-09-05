const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');  // Changed from `error` to `error404` to match the later usage
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIkey = '4558a6a9ea06a055c4cabed99e678bfa';

    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) return;

            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.add('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Cloud':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images/haze.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`; // Assuming wind speed is in km/h

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.remove('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.remove('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.remove('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
            }, 2200);

            const cloneInfoWeatherElements = document.querySelectorAll('.info-weather.active-clone');
            const cloneInfoHumidityElements = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoWindElements = document.querySelectorAll('.info-wind.active-clone');

            if (cloneInfoWeatherElements.length > 0) {
                const firstCloneWeather = cloneInfoWeatherElements[0];
                const firstCloneHumidity = cloneInfoHumidityElements[0];
                const firstCloneWind = cloneInfoWindElements[0];

                firstCloneWeather.classList.remove('active-clone');
                firstCloneHumidity.classList.remove('active-clone');
                firstCloneWind.classList.remove('active-clone');

                setTimeout(() => {
                    firstCloneWeather.remove();
                    firstCloneHumidity.remove();
                    firstCloneWind.remove();
                }, 2200);
            }

        })
        .catch(error => console.error('Error fetching the weather data:', error));
});

