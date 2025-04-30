const apiKey = "86c74b2fea58fc86d2aae78ed7abad7a";

function getWeather() {
    const city = document.getElementById('city').value;
    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => {
                console.error('Error:', error);
                alert("Error fetching weather data.");
            });
    } else {
        alert('Please enter a city name.');
    }
}

function displayWeather(data) {
    document.getElementById('temp').textContent = `${data.main.temp}°C`;
    document.getElementById('desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('feels_like').textContent = `${data.main.feels_like}°C`;
    document.getElementById('weather-container').classList.remove('hidden');
}

function displayWeatherInModal(data) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>Your Weather🌥️</h2>
        <p><strong>🌡️Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>🌞Sky Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>💧Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>🌬️Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>🤗Feels Like:</strong> ${data.main.feels_like}°C</p>
        <div class="modal-buttons">
            <button onclick="closeModal()">Close</button>
        </div>
    `;
}

function getWeatherByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherInModal(data))
        .catch(error => {
            console.error('Geo error:', error);
            alert('Failed to get weather by location.');
        });
}

function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        alert("Geolocation not supported by this browser.");
    }
}

function closeModal() {
    document.getElementById('location-modal').style.display = 'none';
    document.querySelector('.animated-background').style.display = 'block';
    document.querySelector('.weather-app').style.display = 'block';
}

function showModal() {
    document.getElementById('location-modal').style.display = 'flex';
    document.querySelector('.animated-background').style.display = 'none';
    document.querySelector('.weather-app').style.display = 'none';
}


document.getElementById('search-weather').addEventListener('click', () => {
    document.getElementById('search-section').style.display = 'block';
    document.getElementById('weather-container').classList.add('hidden');
    closeModal();
});

document.getElementById('your-weather').addEventListener('click', showModal);

document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') getWeather();
});
