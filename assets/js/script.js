var searchBtn = $("#search-btn");
var APIKey = "6b4dd594eb93d97558f4b8bf3d0ad157";
var city = $("#city-input");
var currWeatherForcastEl = $("#curr-weather-forcast");
// var repoSearchTerm = $("repo-search-term");
var cityInput = city.val();
var cityLocal = "";
// var cardEl = $("#temp-card");
// console.log(cardEl)

//Error Handler
var handlerErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


// search btn
var formSearchHandler = (event) => {
    event.preventDefault();
    // console.log(cityInput)
    if (cityInput) {
        getCurrWeather(cityInput);
        currWeatherForcastEl.textContent = '';
        city.value = '';
    } else {
        alert('Please enter a valid city name');
    }
};

var cityClickHandler = (event) => {
    event.preventDefault();
    city.val(event.target.textContent);
    storedCity = city.val();
    getCurrWeather(event);
}

//searching city function second try
var getCurrWeather = (event) => {
    var cityValue = city.val();
    cityLocal = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey;
    console.log(queryURL);

    fetch(queryURL)
        .then(handlerErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // console.log(response)
            // cardEl.text(response.main.temp);
            saveCity(cityValue);
            var currWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var currTimeUTC = response.dt.date;
            var currTime = moment(currTimeUTC).format("MM-DD-YYYY  ");
            var currTemp = response.main.temp;
            var currWind = response.wind.speed;
            var currHumidity = response.main.humidity;
            loadCity();
            fiveDayForcast(event);

            var currentWeather = `
                <h2>${response.name} ${currTime}<img src="${currWeatherIcon}"></h2>
                 <ul class="list-forcast">
                    <li>Temp: ${currTemp}°F</li>
                    <li>Wind: ${currWind}mph</li>
                    <li>Humidity: ${currHumidity}%</li>
                 </ul>`;
            $("curr-weather").html(currentWeather);
        })
};

var fiveDayForcast = (event) => {
    var cityValue = city.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey;
    fetch(queryURL)
        .then(handlerErrors)
        .then((response) => {
            // console.table(response)
            return response.json();
        })
        .then((response) => {
            var fiveDayForcast = `
                <h2>5-Day-Forcast</h2>
                <div id="five-day-forcast">`;
            for (var i = 0; i < response.length; i++) {
                var futureDays = response.list[i];
                var futureTimeUTC = futureDays.dt;
                var futureTime = moment(futureTimeUTC).format("MM-DD-YYYY  ");
                var futureIcon = "https://openweathermap.org/img/w/" + futureDays.weather[0].icon + ".png";

                fiveDayForcast += `
                    <div class="five-day-forcast card m-2 p0">
                        <ul class="list" p-3>
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
    console.log("hello")
    $("#city-history").empty();
    //loadcity 2nd try
    if (localStorage.length === 0) {
        city.attr("value", cityInput);
    } else {
        var cityInputKey = "cities" + (localStorage.length - 1);
        cityInput = localStorage.getItem(cityInputKey);
        city.attr("value", cityInputKey);

        for (var i = 0; i < localStorage.length; i++) {
            var cities = localStorage.getItem("cities", + i);
            var citiesEl;
            
            if (cityLocal === ""){
                cityLocal = cities;
            }
            if (cities == cityLocal) {
                citiesEl = `<button type="button" class="active id="search-btn">${cityInputKey}</button></li>`;
            } else {
                citiesEl = `<button type="button" id="search-btn">${cityInputKey}</button></li>`
            }
            $("#city-history").prepend(citiesEl);
        }
    }







    // //loadcity 1st try
    // if (localStorage.length !== 0) {
    //     var storedCity = "cities" +(localStorage.length - 1);
    //     var storedCityName = localStorage.getItem(storedCity);
    //     // console.log(storedCityName)
    //     city.attr("value",storedCityName);
    // }else if (storedCityName) {
    //     city.attr("value",storedCityName);
    // } else {
    //     city.attr("value","Los Angeles")
    // }

    //     for (var i = 0; i < localStorage.length; i++) {
    //         var cityLocal = localStorage.getItem("cities" + i);
    //         if (cityInput === "") {
    //             cityInput = cityLocal;
    //             console.log(cityInput)
    //         }
    //         var cityEl;
    //         if (cityLocal == cityInput) {
    //             cityEl = `<button type="button" class="active">${storedCity}</button></li>`;
    //             // console.log(cityEl)
    //         } else {
    //             cityEl = `button type="button">${storedCity}</button></li>`
    //             // console.log(cityEl)
    //         }
    //         $("city-history").prepend(cityEl);
    //     }
    } 


searchBtn.on('click', formSearchHandler);

$("#city-history").on('click', cityClickHandler);


// loadCity();
// getCurrWeather();
// localStorage.clear();