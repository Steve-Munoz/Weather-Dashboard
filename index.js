// API key for weather

// type a city and hit search and have console print out what you type
//$("document").ready(dunctionconsole.log("invoked");
//console.log("testing", $("#searchBtn"));
//console.info("before document.ready");

//first issue is making sure my search button is working
$(document).ready(function () {
  // have the city of Austin as default
  var austin = "Austin";
  var cityName = " City Name";
  getCityWeather(austin);

  //console.info("after the document.ready");
  //console.info("searchButton: ", searchButton);
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#cityInput").val();

    console.log("City input: ", cityInput);

    //console.log($("#cityInput").val());
    //console.log("invoked");

    // invoking function getCityWeather which talks to api server
    getCityWeather(cityInput);
    saveCityToLocalStorage(cityInput);
    // saveLocalStorage
    //localStorage.setItem("city Name", JSON.stringify(cityInput));
  });
  console.log("line 27 City Input" + cityInput);
  // window.localStorage.setItem(cityInput, JSON.stringify(cityInput));
});
function saveCityToLocalStorage(city) {
  var localStorageString = localStorage.getItem("cityNames");
  console.info("localStorageString: ", localStorageString);
  var searchedCities = JSON.parse(localStorage.getItem("cityNames"));
  console.info("searchedCities: ", searchedCities);
  var trueOrFalse = searchedCities.includes(city);
  console.info("trueOrFalse: ", trueOrFalse);
  if (searchedCities.includes(city)) {
    $("#lastSearchedCity").append(city);

    console.log("take out the first one and append new city", true);
  } else {
    if (searchedCities.length >= 5) {
      console.log("append city", false);
      searchedCities[0].remove();
      // Remove the first one
      // add the new city
      $("#lastSearchedCity").append(city);
    } else {
      // add the new city
    }
  }

  //var testArray = [...searchedCities, city];
  //localStorage.setItem("cityNames", JSON.stringify(testArray));
}
//second issue is creating a function that get information from api server
function getCityWeather(currentCity) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast/?q=" +
    currentCity +
    "&APPID=7ca9b900341f08c52858090999121e4b";

  console.log("queryURL: ", queryURL);
  /**
   * {
   * City Name: "currentCity"
   * }
   *
   *
   *cityNames: ['Austin', 'Detroit']
   *
   *
   *
   * {
   * Austin: {cityName: 'Austin', population: 123213, latitude: },
   * Detroit: true,
   * }
   */
  // var searchedCities = Object.keys(LOCAL_StoRAGE_OBJECT)
  // searchedCities
  //
  // Read local storage first
  // Save the array in a local variable
  // if list === 5 remove last one
  // add new city
  // set local storage
  //localStorage.setItem('cityNames', [currentCity])
  //localStorage.setItem(currentCity, true);
  $("#lastSearchedCity").append(currentCity);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    //console.log("then: ", response);

    //third issue is declaring variables to add to my html webpage once a city is searched
    //var cityName = $("<div>").text(response.city.name);
    var date = moment().format("MMMM Do YYYY");
    //var secondDate = moment().format("MMMM" + parseInt("Do" + 1));
    var cityName = response.city.name;
    console.log("city name: ", cityName);

    let lat = response.city.coord.lat;
    let lon = response.city.coord.lon;
    // let uvQueryURL =
    //   "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
    //   lat +
    //   "&lon=" +
    //   lon +
    //   "&APPID=7ca9b900341f08c52858090999121e4b" +
    //   "&cnt=1";

    let uvQueryURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&eclude=hourly,daily" +
      "&appid=7ca9b900341f08c52858090999121e4b";

    //forecast icons

    var currentForecastIcon = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[0].weather[0].icon +
        "@2x.png"
    );

    var forecastIcon1 = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[12].weather[0].icon +
        "@2x.png"
    );

    var forecastIcon2 = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[16].weather[0].icon +
        "@2x.png"
    );
    var forecastIcon3 = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[23].weather[0].icon +
        "@2x.png"
    );
    var forecastIcon4 = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[31].weather[0].icon +
        "@2x.png"
    );
    var forecastIcon5 = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.list[39].weather[0].icon +
        "@2x.png"
    );
    //end forecast icons

    var currentTemp = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[0].main.temp - 273) * 1.8 + 32]) +
        "°F"
    );

    var cityTempF1 = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[12].main.temp_max - 273) * 1.8 + 32]) +
        "°F"
    );

    //console.log("temp value: ", currentCity.val());

    var cityTempF2 = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[16].main.temp_max - 273) * 1.8 + 32]) +
        "°F"
    );

    var cityTempF3 = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[23].main.temp_max - 273) * 1.8 + 32]) +
        "°F"
    );

    var cityTempF4 = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[31].main.temp_max - 273) * 1.8 + 32]) +
        "°F"
    );

    var cityTempF5 = $("<p>").text(
      "Temperature: " +
        Math.floor([(response.list[39].main.temp_max - 273) * 1.8 + 32]) +
        "°F"
    );

    var currentCityHumidity = $("<p>").text(
      "Humidity: " + response.list[0].main.humidity + "%"
    );
    var cityHumidity1 = $("<p>").text(
      "Humidity: " + response.list[12].main.humidity + "%"
    );

    var cityHumidity2 = $("<p>").text(
      "Humidity: " + response.list[16].main.humidity + "%"
    );
    var cityHumidity3 = $("<p>").text(
      "Humidity: " + response.list[23].main.humidity + "%"
    );
    var cityHumidity4 = $("<p>").text(
      "Humidity: " + response.list[31].main.humidity + "%"
    );
    var cityHumidity5 = $("<p>").text(
      "Humidity: " + response.list[39].main.humidity + "%"
    );

    var currentCityWindSpeed = $("<p>").text(
      "Wind Speed: " + response.list[12].wind.speed + " MPH"
    );

    //var getDate1 = $("<p>").text(response.list[0].dt_txt);

    var getDate1 = new Date(response.list[8].dt_txt);
    var month1 = getDate1.getMonth();
    //console.log("month" + month);
    var year1 = getDate1.getFullYear();
    //console.log("year" + year);
    var day1 = getDate1.getDate();
    //console.log("day" + day);
    var generateDate1 = $("<p>").text(
      JSON.stringify(month1 + 1) +
        "/" +
        JSON.stringify(day1) +
        "/" +
        JSON.stringify(year1)
    );

    var getDate2 = new Date(response.list[16].dt_txt);
    var month2 = getDate2.getMonth();
    //console.log("month" + month);
    var year2 = getDate2.getFullYear();
    //console.log("year" + year);
    var day2 = getDate2.getDate();
    //console.log("day" + day);
    var generateDate2 = $("<p>").text(
      JSON.stringify(month2 + 1) +
        "/" +
        JSON.stringify(day2) +
        "/" +
        JSON.stringify(year2)
    );

    var getDate3 = new Date(response.list[23].dt_txt);
    var month3 = getDate3.getMonth();
    //console.log("month" + month);
    var year3 = getDate3.getFullYear();
    //console.log("year" + year);
    var day3 = getDate3.getDate();
    //console.log("day" + day);
    var generateDate3 = $("<p>").text(
      JSON.stringify(month3 + 1) +
        "/" +
        JSON.stringify(day3) +
        "/" +
        JSON.stringify(year3)
    );

    var getDate4 = new Date(response.list[31].dt_txt);
    var month4 = getDate4.getMonth();
    //console.log("month" + month);
    var year4 = getDate4.getFullYear();
    //console.log("year" + year);
    var day4 = getDate4.getDate();
    //console.log("day" + day);
    var generateDate4 = $("<p>").text(
      JSON.stringify(month4 + 1) +
        "/" +
        JSON.stringify(day4) +
        "/" +
        JSON.stringify(year4)
    );

    var getDate5 = new Date(response.list[39].dt_txt);
    var month5 = getDate5.getMonth();
    //console.log("month" + month);
    var year5 = getDate5.getFullYear();
    //console.log("year" + year);
    var day5 = getDate5.getDate();
    //console.log("day" + day);
    var generateDate5 = $("<p>").text(
      JSON.stringify(month5 + 1) +
        "/" +
        JSON.stringify(day5) +
        "/" +
        JSON.stringify(year5)
    );

    $.ajax({
      url: uvQueryURL,
      method: "GET",
    }).then(function (response) {
      // getCityWeather(austin);
      // getCityWeather(cityInput);

      var uvIndex = response.current.uvi;
      if (uvIndex < 3) {
        var uvIndexFavorable = $("<span>")
          .attr("class", "badge badge-success")
          .text(uvIndex);

        $("#UV-index").empty();
        $("#UV-index").append("UV Index: ", uvIndexFavorable);
      } else if (uvIndex >= 3 && uvIndex <= 5) {
        var uvIndexModerate = $("<span>")
          .attr("class", "badge badge-warning")
          .text(uvIndex);

        $("#UV-index").empty();
        $("#UV-index").append("UV Index: ", uvIndexModerate);
      } else {
        var uvIndexSevere = $("<span>")
          .attr("class", "badge badge-danger")
          .text(uvIndex);

        $("#UV-index").empty();
        $("#UV-index").append("UV Index: ", uvIndexSevere);
      }

      // var uvIndex = $("<span>")
      //   .attr("class", "badge badge-danger")
      //   .text(response.current.uvi);
      //uvIndex = response.current.uvi;

      // $("#UV-index").empty();
      // $("#UV-index").append("UV Index: ", uvIndex);
      // console.log("uv Index", uvIndex);
    });

    $("#city-name").empty();

    $("#city-name").append(cityName + " " + "(" + date + ")");
    // var testDate = newDate(DATE_FROM_API);
    // var month = testDate.getMonth();
    // var year - testDate.getYear();
    //var day = testDate.getDate();
    // var date = dat + month + year

    $("#city-temperature").empty();
    $("#city-temperature").append(currentTemp);

    $("#temp-icon").empty();
    $("#temp-icon").append(currentForecastIcon);

    $("#humidity").empty();
    $("#humidity").append(currentCityHumidity);

    $("#wind-speed").empty();
    $("#wind-speed").append(currentCityWindSpeed);
    console.log(response);
    $("#firstDayForecastCard").empty();
    $("#firstDayForecastCard").append(
      generateDate1,
      cityTempF1,
      forecastIcon1,
      cityHumidity1
    );
    //console.log("generateDate1" + generateDate1);

    $("#secondDayForecastCard").empty();
    $("#secondDayForecastCard").append(
      generateDate2,
      cityTempF2,
      forecastIcon2,
      cityHumidity2
    );
    $("#thirdDayForecastCard").empty();
    $("#thirdDayForecastCard").append(
      generateDate3,
      cityTempF3,
      forecastIcon3,
      cityHumidity3
    );
    $("#fourthDayForecastCard").empty();
    $("#fourthDayForecastCard").append(
      generateDate4,
      cityTempF4,
      forecastIcon4,
      cityHumidity4
    );
    $("#fifthDayForecastCard").empty();
    $("#fifthDayForecastCard").append(
      generateDate5,
      cityTempF5,
      forecastIcon5,
      cityHumidity5
    );
    //$("#secondDayForecastCard").append(econdDayForecast);

    //console.log("City Name: ", cityName);
  });
}
