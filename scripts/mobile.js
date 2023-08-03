var cityInputMobile = document.getElementById("mobileSearchCity");
var backgroundsListDay = [
  "day1.jpg",
  "day2.jpg",
  "day3.jpg",
  "day4.jpg",
  "day5.jpg",
];
var backgroundsListNight = [
  "night1.jpg",
  "night2.jpg",
  "night3.jpg",
  "night4.jpg",
  "night5.jpg",
];
var backgroundsListCloudy = [
  "cloudy1.jpg",
  "cloudy2.jpg",
  "cloudy3.jpg",
  "cloudy4.jpg",
  "cloudy5.jpg",
];
var backgroundsListRain = [
  "rainy1.jpg",
  "rainy2.jpg",
  "rainy3.jpg",
  "rainy4.jpg",
  "rainy5.jpg",
];

function getRandomImage(imgArray) {
  return imgArray[Math.floor(Math.random() * imgArray.length)];
}

cityInputMobile.addEventListener("keyup", function(event)
{
  if(event.key === "Enter")
  {
		loader();
		function loader()
		{

			document.getElementById("locationName").innerHTML = "";
			document.getElementById("temperatureValue").innerHTML = "";
			document.getElementById("weatherType").innerHTML = "";

			const img1 = document.createElement("img");
			const img2 = document.createElement("img");
			const img3 = document.createElement("img");

			img1.id = "loader1";
			img2.id = "loader2";
			img3.id = "loader3";

			img1.src = "icons/loader.gif";
			img2.src = "icons/loader.gif";
			img3.src = "icons/loader.gif";

			const parentElement1 = document.getElementById("locationName");
			const parentElement2 = document.getElementById("temperatureValue");
			const parentElement3 = document.getElementById("weatherType");

			parentElement1.appendChild(img1);
			parentElement2.appendChild(img2);
			parentElement3.appendChild(img3);

		}

    var cityInputValue = cityInputMobile.value;

    var apiKey = process.env.API_KEY; // Default
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if(cityInputValue != "")
    {
      async function getWeather()
      {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if(data.message != "city not found" && data.cod != "404")
        {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
          var weatherId = data.weather[0].id;
          var realFeel = data.main.feels_like;
          var windSpeed = data.wind.speed;
          var windDirection = data.wind.deg;
          var visibility = data.visibility / 1000;
          var pressure = data.main.pressure;
          var maxTemperature = data.main.temp_max;
          var minTemperature = data.main.temp_min;
          var humidity = data.main.humidity;
          var sunrise = data.sys.sunrise;
          var sunset = data.sys.sunset;

        
          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType;
          document.getElementById("realFeelAdditionalValue").innerHTML = realFeel + "<sup>o</sup>C";
          document.getElementById("windSpeedAdditionalValue").innerHTML = windSpeed + " km/h";
          document.getElementById("windDirectionAdditionalValue").innerHTML = windDirection;
          document.getElementById("visibilityAdditionalValue").innerHTML = visibility + " km";
          document.getElementById("pressureAdditionalValue").innerHTML = pressure;
          document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemperature + "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemperature + "<sup>o</sup>C";
          document.getElementById("humidityAdditionalValue").innerHTML = humidity;
          document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
          document.getElementById("sunsetAdditionalValue").innerHTML = sunset;

          if (weatherId >= 200 && weatherId < 600) {
            // Thunderstorm, Rain, Drizzle
            randomBackground = getRandomImage(backgroundsListRain);
          } else if (weatherId >= 800 && weatherId < 900) {
            // Clouds
            randomBackground = getRandomImage(backgroundsListCloudy);
          } else {
            // Atmosphere, Clear
            const date = new Date();
            const hour = date.getHours();
            randomBackground = (hour > 6 && hour < 20) ? getRandomImage(backgroundsListDay) : getRandomImage(backgroundsListNight);
          }

          // Set the background:
          document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('media/" + randomBackground + "')";

        }
        else
				{
					document.getElementById("locationName").innerHTML = "City Not Found";
					document.getElementById("temperatureValue").innerHTML = "";
					document.getElementById("weatherType").innerHTML = "";
				}
      }

      getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
  }
});
