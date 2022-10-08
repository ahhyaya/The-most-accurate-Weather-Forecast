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



var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        currWeatherForcastEl.textContent = 'No repositories found.';
      return;
    }
  
    repoSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < repos.length; i++) {
      var repoName = repos[i].owner.login + '/' + repos[i].name;
      
      // We create those URLs when we write the repos to the page in the displayRepos() function, as shown in the following code:
      var repoEl = document.createElement('a');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
      repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      repoEl.appendChild(statusEl);
  
      repoContainerEl.appendChild(repoEl);
    }
  };