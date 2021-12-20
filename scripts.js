const api = "d3fcd6006bf3d6ebc3d13693a8ab71a0"; //replace with your api key from the weather app

//Access dom element using JavaScript and storing them into seperate variables

const iconImg = document.getElementById("weather-icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

//creating an event listener when the page loads which will execute the funtion
window.addEventListener("load", () => {
  let long;
  let lat;
  /*asking user for geolocation

  */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //storing lat and long value
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //providing the information to the url and the values are returned in jason format

      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      console.log(base);

      //using javascript fetch api and converting the response into a jason object

      fetch(base)
        .then((response) => {
          return response.json();
        })

        //destructuring object

        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          //getting icon based on the weather conditions

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT

          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          //changing dom values to show the date
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          //toFixed method to display only 2 decimal points
          tempC.textContent = `${temp.toFixed(2)}°C`;
          tempF.textContent = `${fahrenheit.toFixed(2)}°F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});
