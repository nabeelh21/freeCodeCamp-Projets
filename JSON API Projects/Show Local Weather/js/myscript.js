
var latitude = "";
var longitude = "";

/*My function that retreives weather data from an API I found online at http://ipinfo.io/developers */
function getWeatherInfo(){

  //API I found online at http://ipinfo.io/developers to retreive the location of the user
  $.get("https://ipinfo.io", function(location){
    console.log(location);

    // send the city and state of the user to the html section that will display this information
    $("#location").html(location.city + ", " + location.region);

    // retreives the longitude and latitude of the user in a string format that is seperated by a comma.
    //It will be used by a weather API to retreive and display the users weather information.
    var coordinates = location.loc;
    var country = location.country;

    getWeather(coordinates, country);
  }, "jsonp");
};

/* API key = cc80ed66be64509a711c0b175a81a748
A function that retreives weather data from an API I found online at https://openweathermap.org/api
It takes two parameters, with the first one being a string that holds the latitude and longitude of the user.
The second paramter is the country of the user.
*/
function getWeather(geoCoordinates, country){
  latitude = geoCoordinates.split(",")[0] .toString();
  longitude = geoCoordinates.split(",")[1] .toString();

  var unitsFormat = "metric"; //Will hold the value "metric" or "imperial" depending on which countires use Celsius or Farenheight.
  var unitsLabel = "C";
  var isImperial = false;
  //Fahrenheit remains the official scale for the following countries: the Bahamas, Belize, the Cayman Islands, Palau and the United States
  var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

  for(var i = 0; i <imperialCountries.length; i ++ )
  {
    if(country === imperialCountries[i] )
    {
      unitsFormat = "imperial";
      unitsLabel = "F";
    }
  }
  console.log(unitsFormat, country);

  // Use the API's endpoint URL to retreive the weather by geographic coordinates
  // Ex url is: http://api.openweathermap.org/data/2.5/weather?lat=39.1317&lon=-77.2880&units=imperial&appid=cc80ed66be64509a711c0b175a81a748
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units="+unitsFormat+"&APPID=cc80ed66be64509a711c0b175a81a748";
  console.log(apiUrl);
  $.getJSON(apiUrl, function(weatherInfo){
    console.log(weatherInfo);

    // send the current weather condition icon (cloudy,sunny,etc..)retreived from the API to the html section that will display this information
    $("#icon").html("<img src='http://openweathermap.org/img/w/" + weatherInfo.weather["0"].icon + ".png'>");

    // send the current temperature of the user to the html section that will display this information
    $("#temp").html(weatherInfo.main.temp.toFixed(1) + " " + unitsLabel);

    // send the current weather condition (cloudy,sunny,etc..) to the html section that will display this information
    var condition = weatherInfo.weather["0"].description;
    // Make sure the first letter of each word is capitalized.
    var formattedCondition = condition.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    $("#condition").html(formattedCondition);

  }, "jsonp");
};

$(document).ready(function()
{
    getWeatherInfo();
});
