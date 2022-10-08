var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherForcastEl = $("#curr-weather-forcast");

// fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6b4dd594eb93d97558f4b8bf3d0ad157')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Weather: Raw data \n----------');
//     console.log(data);
//   });


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

var cityClickHandler = function (event) {
    var cityList = event.target.getAttribute('data-city');

    if (cityList) {
        getWeatherRepos(cityList);

        currWeatherForcastEl.textContent = '';
    }
};


var getCityRepos = function (city) {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, name); //cityname
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Data Documentation');
        });
}

var getWeatherRepos = function (cityList) {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q="  + cityList + "&appid=" + APIKey;
  
    fetch(queryURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data.weather, cityList); //ck data source
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };
