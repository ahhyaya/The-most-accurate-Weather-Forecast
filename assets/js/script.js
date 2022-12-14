var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherEl = $("#curr-weather");
var cityInput = city.val();
var cityLocal = "";


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
        currWeatherEl.textContent = '';
        city.value = '';
    } else {
        alert('Please enter a valid city name');
    }
};

var cityClickHandler = (event) => {
    event.preventDefault();
    city.val(event.target.textContent);
    cityLocal = city.val();
    getCurrWeather(event);
}

//searching city function second try
var getCurrWeather = (event) => {
    var cityValue = city.val();
    cityLocal = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey;
    // console.log(queryURL);

    fetch(queryURL)
        .then(handlerErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // console.log(response);
            saveCity(cityValue);
            var currWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var currTimeUTC = response.dt.date;
            var currTime = moment(currTimeUTC).format("MM-DD-YYYY  ");
            var currTemp = parseFloat(1.8 * (response.main.temp - 273) + 32).toFixed(0);
            var currWind = response.wind.speed;
            var currHumidity = response.main.humidity;
            loadCity();
            fiveDayForecast(event);

            var currentWeather = `
                <h2>${response.name} ${currTime}<img src="${currWeatherIcon}"></h2>
                 <ul class="list-forecast">
                    <li>Temp: ${currTemp}°F</li>
                    <li>Wind: ${currWind}mph</li>
                    <li>Humidity: ${currHumidity}%</li>
                 </ul>`;
            $("#curr-weather").html(currentWeather);
        })
};

var fiveDayForecast = (event) => {
    var cityValue = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityValue + "&appid=" + APIKey;
    fetch(queryURL)
        .then(handlerErrors)
        .then((response) => {
            // console.table(response)
            return response.json();
        })
        .then((response) => {
            var fiveDayForecast = `
                <h3>5-Day-Forecast</h3>
                <div id="five-day-forecast" class="d-inline-flex flex-wrap">`;
            for (var i = 0; i < 5; i++) {
                var futureDays = response.list[i];
                // var day = moment().add(i + 1,'day').format("MMM Do YY")
                // var futureTimeUTC = futureDays.dt.date;
                var futureTime = moment().add(i + 1, 'day').format("MMM Do YY");
                // console.table(futureTime)
                var futureIcon = "https://openweathermap.org/img/w/" + futureDays.weather[0].icon + ".png";

                fiveDayForecast += `
                    <div class="five-day-forecast card">
                        <ul class="list-ul"id="five-day-weather">
                            <li>${futureTime}</li>
                            <li class="weather-icon"><img src=${futureIcon}></li>
                            <li>Temp: ${parseFloat(1.8 * (futureDays.main.temp - 273) + 32).toFixed(0)}°F</li>
                            <br>
                            <li>Wind: ${futureDays.wind.speed}mph</li>
                            <br>
                            <li>Humidity: ${futureDays.main.humidity}%</li>
                        </ul>
                    </div>`;
                // console.table(fiveDayForecast)
            }
            fiveDayForecast += `</div>`;
            $(".five-day").html(fiveDayForecast);
        });
};

var saveCity = (searchingCity) => {
    var cityStored = false;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] == searchingCity) {
            cityStored = true;
            break;
        }
    }
    if (cityStored === false) {
        localStorage.setItem("cities" + localStorage.length, searchingCity);
    }
}

var loadCity = () => {
    // console.log("hello")
    $("#city-history").empty();
    //loadcity 2nd try
    if (localStorage.length === 0) {
        if (lastCity) {
            city.attr("value", lastCity);
        } else {
            city.attr("value", "");
        }
    } else {
        var lastCityKey = "cities" + (localStorage.length - 1);
        var lastCity = localStorage.getItem(lastCityKey);
        city.attr("value", lastCity);

        for (var i = 0; i < localStorage.length; i++) {
            var cities = localStorage.getItem("cities" + i);
            var citiesEl;

            if (cityLocal === "") {
                cityLocal = lastCity;
            }
            if (cities === cityLocal) {
                citiesEl = `<button type="button" class="active btn" id="list-btn">${cities}</button>`;
            } else {
                citiesEl = `<button type="button" class="btn" id="list-btn">${cities}</button></li>`
            }
            $("#city-history").prepend(citiesEl);
        }
    }
}

searchBtn.on('click', formSearchHandler);
$("#city-history").on('click', cityClickHandler);

// localStorage.clear();        