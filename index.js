const apiKey = "ea034a0aa96d41c030f1f99a0a52411e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const dateapikey = "cdbb9bb9e06c4573812185129230406";
const dateapiurl = "https://api.weatherapi.com/v1/current.json?key=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        console.log(data);

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";

    } catch (error) {
        alert("Location not found"); 
        document.querySelector(".city").innerHTML = "Please enter a valid City";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "n/a";
        document.querySelector(".wind").innerHTML = "n/a";
        document.querySelector(".pressure").innerHTML = "n/a";
    }
    
}
checkWeather("Gateshead")

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

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