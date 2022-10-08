var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherForcastEl = $("#curr-weather-forcast");

var formSearchHandler = function (event) {
    event.preventDefault();
  
    var cityInput = city.value.trim();
  
    if (cityInput) {
      getCityRepos(cityInput);
  
      currWeatherForcastEl.textContent = '';
      city.value = '';
    } else {
      alert('Please enter a valid city name');
    }
  };


var getCityRepos = function (city) {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
}


var cityClickHandler = function (event) {
    var cityList = event.target.getAttribute('data-city');
  
    if (cityList) {
      getFeaturedRepos(cityList);
  
      currWeatherForcastEl.textContent = '';
    }
  };