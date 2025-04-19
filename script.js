function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = '8fc12150dd4cf70cc0b596fdfc8f156e'; // Your real key!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weather-result').innerHTML = 'City not found! Please try again.';
            } else {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;

                const weatherHTML = `
                    <h3>Weather in ${city}</h3>
                    <p>Condition: ${weatherDescription}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                `;

                document.getElementById('weather-result').innerHTML = weatherHTML;

                // Update the background theme based on the weather description
                const body = document.body;

                if (weatherDescription.includes("clear")) {
                    body.className = "clear-theme";
                } else if (weatherDescription.includes("cloud")) {
                    body.className = "cloudy-theme";
                } else if (weatherDescription.includes("rain")) {
                    body.className = "rainy-theme";
                } else if (weatherDescription.includes("snow")) {
                    body.className = "snowy-theme";
                } else {
                    body.className = "default-theme"; // Default theme in case weather is unknown
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weather-result').innerHTML = 'Error fetching weather data. Please try again.';
        });
}