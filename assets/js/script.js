var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherForcastEl = $("#curr-weather-forcast");
var repoSearchTerm = $("repo-search-term");


//Error Handler
var handlerErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
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

var cityClickHandler = function(event) {
    event.preventDefault();
    city.val(event.target.textContent);
    storedCity=city.val();
    getCurrWeather(event);
}

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
            var currWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var currTimeUTC = response.dt.date;
            var currTime = moment(currTimeUTC).format("MM-DD-YYYY  ");
            var currTemp = response.main.temp;
            var currWind = response.wind.speed;
            var currHumidity = response.main.humidity;
            loadCity();
            // fiveDayForcast(event);

            var currentWeather = `
                <h2>${response.name} ${currTime}<img src="${currWeatherIcon}"></h2>
                 <ul class="list-forcast">
                    <li>Temp: ${currTemp}°F</li>
                    <li>Wind: ${currWind}mph</li>
                    <li>Humidity: ${currHumidity}%</li>
                 </ul>`;

            $("curr-weather").html(currentWeather);
})};




function fiveDayForcast(event) {
    var cityValue = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey;
    fetch(queryURL)
    .then(handlerErrors)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        var fiveDayForcast =`
        <div id="five-day-forcast">`;
        for (var i = 0; i < response.list.length; i++) {
            var futureDays = response.list[i];
            var futureTimeUTC = response.list[i].dt;
            var futureTime = moment(futureTimeUTC).format("MM-DD-YYYY  ");
            var futureIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

            fiveDayForcast += `
            <div class="five-day-forcast card">
                <ul class="list">
                    <li>${futureTime}</li>
                    <li class="weather-icon"><img src=${futureIcon}></li>
                    <li>Temp: ${futureDays.main.temp}°F</li>
                    <br>
                    <li>Wind: ${futureDays.wind.speed}mph</li>
                    <br>
                    <li>Humidity: ${futureDays.main.humidity}%</li>
                </ul>
            </div>`; 
    }
    fiveDayForcast += `</div>`;
    $("five-day-forcast").html(fiveDayForcast);
    });
};






            //  $.ajax({
            //     url: queryURL,
            //     method: "GET"
            // }).then(function () {
            //     $("#repo-search-term").text(city.val() + " " + currTime + currWeatherIcon);
            //     $("#currTemp").text("Temp: " + currTemp + "°F");
            //     $("#currWind").text("Wind: " + currWind + "MPH");
            //     $("#currHumidity").text("Humidity: " + currHumidity + "%");
            // });

            // for (var d = 0; d < 5; d++) {
            //     var futureDays = moment().add(d, "day").format("MMM Do YY");
            //     console.log(futureDays)
            //     var futureWeatherIcon = response.weather.icon;
            //     // var futureTimeUTC = futureDays.toString()
            //     // var futureDays = moment(futureTimeUTC).format("MM-DD-YYYY  ");
            //     var futureTemp = response.main.temp;
            //     var futureWind = response.wind.speed;
            //     var futureHumidity = response.main.humidity;
            //     $.ajax({
            //         url: queryURL,
            //         method: "GET"
            //     }).then(function () {
            //         $("#future-city-date-icon").text(city.val() + " " + futureDays + futureWeatherIcon);
            //         $("#futureTemp").text("Temp: " + futureTemp + "°F");
            //         $("#futureWind").text("Wind: " + futureWind + "MPH");
            //         $("#futureHumidity").text("Humidity: " + futureHumidity + "%");
            //     });

            // }


var saveCity = function (searchingCity) {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] == searchingCity) {
            break;
        } else {
            localStorage.setItem("cities" + localStorage.length, searchingCity);
        }
    }
}

var loadCity = function() {
    
    if(localStorage.length !== 0) {
        var storedCity = city.val();
        var StoredCityNum = localStorage.getItem(storedCity);
        storedCity=StoredCityNum;
    }else {
        $(city).attr("value",StoredCityNum);
    }
    for (var i =0; i < localStorage.length; i++) {
        var cityLocal = localStorage.getItem("cities" + i);
        if (cityLocal === "" ) {
            city = storedCity;
        }
        var cityEl;
        if (storedCity === city) {
            cityEl = `<button type="button" class="active">${storedCity}</button></li>`;
        } else {
            cityEl = `button type="button">${storedCity}</button></li>`
        }
        $("city-result").prepend(cityEl);
}
// if (localStorage.length > 0) {

// }
}





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
$("#city-results").on('click', cityClickHandler);

loadCity();
getCurrWeather();
// localStorage.clear();