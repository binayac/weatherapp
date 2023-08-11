const dateapikey = "cdbb9bb9e06c4573812185129230406";
const dateapiurl = "https://api.weatherapi.com/v1/current.json?key=";

const weatherDisplay = document.getElementById("weatherDisplay");
const weatherIcon = document.querySelector(".weather-icon");

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");

    searchButton.addEventListener("click", function () {
        const city = cityInput.value;

        // Fetch weather data and update the interface
        fetchWeatherData(city);
    });
});

function fetchWeatherData(city) {
    // Make a fetch request to the PHP script
    fetch(`index.php?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("date").innerHTML = exactHour+`:`+exactMinute+` - ` +  exactDay + `, ` + new Date(exactDate).getDate() + ` ` + exactMonth + ` ` + new Date(exactDate).getFullYear();
            document.querySelector(".city").innerHTML = data.city;
            document.querySelector(".temp").innerHTML = data.temperature + "°c";
            document.querySelector(".humidity").innerHTML = data.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind + " km/h";
            document.querySelector(".pressure").innerHTML = data.pressure + " hPa";
            console.log(data.weather_condition);

            if(data.weather_condition == "broken clouds") {
                weatherIcon.src = "images/broken-clouds.png"
            }
            else if(data.weather_condition == "overcast clouds") {
                weatherIcon.src = "images/overcast-clouds.png"
            }
            else if(data.weather_condition == "few clouds") {
                weatherIcon.src = "images/few-clouds.png"
            }
            else if(data.weather_condition == "scattered clouds") {
                weatherIcon.src = "images/scattered-clouds.png"
            }
            else if(data.weather_condition == "thunderstorm") {
                weatherIcon.src = "images/thunderstorm.png"
            }
            else if(data.weather_condition == "snow") {
                weatherIcon.src = "images/snow.png"
            }
            else if(data.weather_condition == "haze") {
                weatherIcon.src = "images/haze.png"
            }
            else if(data.weather_condition == "clear sky") {
                weatherIcon.src = "images/clear-sky.png"
            }
            else if(data.weather_condition.includes("rain")) {
                weatherIcon.src = "images/rain.png"
            }
            else if(data.weather_condition == "clear") {
                weatherIcon.src = "images/clear.png"
            }
            else if(data.weather_condition == "drizzle") {
                weatherIcon.src = "images/drizzle.png"
            }
            else if(data.weather_condition == "mist") {
                weatherIcon.src = "images/mist.png"
            }
            // Construct HTML content
            // const weatherHtml = `
            //     // <h2>Weather in ${data.city}</h2>
            //     // <p>Temperature: ${data.temperature}°C</p>
            //     // <p>Humidity: ${data.humidity}%</p>
            //     // <p>Wind: ${data.wind} m/s</p>
            //     // <p>Pressure: ${data.pressure} hPa</p>
            //     // <p>Condition: ${data.weather_condition}</p>
            // `;

            // Update the weatherDisplay element
            // weatherDisplay.innerHTML = weatherHtml;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("Location not found"); 
            document.querySelector(".city").innerHTML = "Please enter a valid City";
            document.querySelector(".temp").innerHTML = "";
            document.querySelector(".humidity").innerHTML = "n/a";
            document.querySelector(".wind").innerHTML = "n/a";
            document.querySelector(".pressure").innerHTML = "n/a";
        });
}
fetchWeatherData('Gateshead')

const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")

async function checkDate(city) {
    const response = await fetch(dateapiurl + dateapikey + `&q=${city}`);
        
    var data = await response.json();

    const exactTime = data.location.localtime.split(" ")[1];
    const exactDate = data.location.localtime.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());
    const exactMonth = getMonthFullName(new Date(exactDate).getMonth());

    const exactHour = exactTime.split(":")[0];
    const exactMinute = exactTime.split(":")[1];

    document.getElementById('date').innerHTML = 
    exactHour+`:`+exactMinute+` - ` +  exactDay + `, ` + new Date(exactDate).getDate() + ` ` + exactMonth + ` ` + new Date(exactDate).getFullYear();
}

searchbtn.addEventListener("click",()=>{
    checkDate(searchbox.value);
})
checkDate("gateshead");

// Function to get the name of day
function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturdat";
  
      default:
        return "Don't Know";
    }
  }

// function to get the name of the month
function getMonthFullName(num) {
    switch(num){
        case 0: 
            return "January"; 
        case 1: 
            return "February"; 
        case 2: 
            return "March";
        case 3: 
            return "April"; 
        case 4: 
            return "May"; 
        case 5: 
            return "June"; 
        case 6: 
            return "July"; 
        case 7: 
            return "August"; 
        case 8: 
            return "September"; 
        case 9: 
            return "October"; 
        case 10: 
            return "November"; 
        case 11: 
            return "December"; 
    }
}