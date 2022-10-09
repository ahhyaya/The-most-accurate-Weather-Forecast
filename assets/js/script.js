var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherForcastEl = $("#curr-weather-forcast");
var repoSearchTerm = $("repo-search-term");

// fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6b4dd594eb93d97558f4b8bf3d0ad157')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Weather: Raw data \n----------');
//     console.log(data);
//   });


//Error Handler
var handlerErrors = (response) => {
    if (!response.ok) {
        throw Error(res.statusText);
    }
    return response;
}


// search btn
var formSearchHandler = function (event) {
    event.preventDefault();
    var cityInput = city.val();
    // console.log(cityInput)
    if (cityInput) {
        getCurrWeather(cityInput);
        currWeatherForcastEl.textContent = '';
        city.value = '';
    } else {
        alert('Please enter a valid city name');
    }
};


// //majorcity btn
// var cityClickHandler = function (event) {
//     var cityList = event.target.getAttribute('data-city');
//     if (cityList) {
//         getWeatherRepos(cityList);
//         currWeatherForcastEl.textContent = '';
//     }
// };

// //searcing city function
// var getCityRepos = function (city) {
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//     fetch(queryURL)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     displayRepos(data.name, city); //cityname
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to connect to Weather Data Documentation');
//         });
// }


//searching city function second try
var getCurrWeather = function (event) {
    var cityValue = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey;
    // console.log(queryURL);

    fetch(queryURL)
        .then(handlerErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            saveCity(cityValue);
            var currWeatherIcon = response.weather.icon;
            var currTimeUTC = Date().toString();
            var currTime = moment(currTimeUTC).format("MM-DD-YYYY  ");
            var currTemp = response.main.temp;
            var currWind = response.wind.speed;
            var currHumidity = response.main.humidity;
            var day1 = moment().add(1,'day').format("MMM Do YY")
            var day2 = moment().add(2,'day').format("MMM Do YY")
            var day3 = moment().add(3,'day').format("MMM Do YY")
            var day4 = moment().add(4,'day').format("MMM Do YY")
            var day5 = moment().add(5,'day').format("MMM Do YY")
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function () {
                $("#repo-search-term").text(city.val() + " " + currTime + currWeatherIcon);
                $("#currTemp").text("Temp: " + currTemp + "°F");
                $("#currWind").text("Wind: " + currWind + "MPH");
                $("#currHumidity").text("Humidity: " + currHumidity + "%");
                

            });
        })
}

var saveCity = function (searchingCity) {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] == searchingCity) {
            break;
        } else {
            localStorage.setItem("cities" + localStorage.length, searchingCity);
        }
    }
}

// var loadCity = function() {
//     for (var i =0; i < city.length; i++) {
//     if(localStorage.length !== 0) {
//         var storedCity = city.val();
//         var StoredCityNum = localStorage.getItem(storedCity);
//         city.val()=StoredCityNum;
//     }
// }
// }





// // // get weather forcast function
// var getWeatherRepos = function (cityList) {
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityList + "&appid=" + APIKey;

//     fetch(queryURL).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 displayRepos(data.main.temp, cityList); //ck data source
//             });
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//     });
// };

// // //display function
// var displayCurrForcast = function (repos, searchTerm) {
//     if (repos.length === 0) {
//         currWeatherForcastEl.textContent = 'No repositories found.';
//         return;
//     }

//     repoSearchTerm.textContent = searchTerm;
//     var repoCity = repos.name;
//     var repoTemp = repos.main.temp;
//     var repoWind = repos.wind.speed;
//     var repoHumidity = repos.main.humidity;
// // var titleEl = document.createElement('span');
// var cityDisplay = $("#city-date-icon");
// cityDisplay.textContent = repoCity;
// //  + repoTemp + repoWind + repoHumidity;
//     repoSearchTerm.appendChild(cityDisplay);

// }

// var displayRepos = function (repos, searchTerm) {
//     if (repos.length === 0) {
//         currWeatherForcastEl.textContent = 'No repositories found.';
//         return;
//     }

//     repoSearchTerm.textContent = searchTerm;

//     for (var i = 0; i < repos.length; i++) {
//         var repoCity = repos[i].name;
//         var repoTemp = repos[i].main.temp;
//         var repoWind = repos[i].wind.speed;
//         var repoHumidity = repos[i].main.humidity;

//         var titleEl = document.createElement('span');
//         titleEl.textContent = repoCity + repoTemp + repoWind + repoHumidity;
//          currWeatherForcastEl.appendChild(repoEl);
//     }
// };

searchBtn.on('click', formSearchHandler);
// $(".majorBtn").on('click', cityClickHandler);

// localStorage.clear();