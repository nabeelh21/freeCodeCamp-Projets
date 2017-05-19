
/*Due to a change in conditions on API usage, Twitch.tv now requires an API key, but freeCodeCamp built a workaround.
Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base URL (i.e. https://api.twitch.tv/kraken ) and
you'll still be able to get account information, without needing to sign up for an API key.*/

//Will hold the name of a specific channel the user searches for.
var searchItem =[];
//Will hold the names of various channels on twitch.tv that are stored in this array
var channels = ["freecodecamp", "blizzard","minecraft","medrybw","ESL_SC2","Hearthstone","RuneScape","Destiny"];

$(document).ready(function()
{
  getChannelInfo(channels);

  $('#search-text').keypress(function(e) { //keypress (or keydown) is better than keyup since we can suppress form submit on 'enter' key being pressed

    $("#display").html(""); //clears all the appended divs
    searchWord= $('#search-text').val(); //user input. Also, replace space ('+' means any amount) with %20 (single space) to meet Wiki API call parameters
    if (e.which === 13) { //if user returns enter key. Also e.keyCode is not implemented the same way by all browsers but JQuery normalizes the vale of e.which for all browsers
      if(searchWord === ""){
        $("#display").html(""); //clears all the appended divs
        getChannelInfo(channels);
      }
      else{
        searchItem.pop();
        searchItem.push(searchWord);
        getChannelInfo(searchItem);
      }
      e.preventDefault(); //prevents implicit submit of form when enter is pressed. API call is interupted on page refresh otherwise.
    }
  });

  $(".selector").click(function()
  {
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })
});


//**********************************************************************//
/*Function that takes in the necessary paramters to incorporate to the API endpoint,
in order to get the correct infomration to be retreived. */
function apiURL(type, name)
{
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
};


//**********************************************************************//
function getChannelInfo(array) {
  //For each twitch channel in my array, use the ApiURL function to display the channels image icon,name,
  // streaming description, and its online status.
  array.forEach(function(channel) {
    // Will first use the api url function to find wheter a channel is currently streaming or not and what game they are streaming if so.
    $.getJSON(apiURL("streams", channel), function(data) {
      var game, status;

      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Channel Does Not Exist";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      // Will use the api url function to find wheter a channel is streaming or not and store its in the status variable.
      $.getJSON(apiURL("channels", channel), function(data) {
        console.log(data);

        var logo, name, description;

        if(data.logo != null){
          logo = data.logo;
        }
        else{
          logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"; //default image for channels with no logo
        }

        if(data.display_name != null && game==="Channel Does Not Exist"){
          name = channel;
        }
        else if(data.display_name != null){
            name = data.display_name;
        }
        else{
          name = channel; // if there is no name retrieved, then make the channel name its name
          console.log(name);
        }

        if(status === "online"){
          description = ': ' + data.status;
        }
        else{
          description = ""; // if the channel is not streaming, then the description is empty.
        }

          html = '<div class="row ' + status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
          logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
          data.url + '" target="_blank">' +
          name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
          game + '<span class="hidden-xs">' + description + '</span></div></div>';

          if(status === "online"){
            $("#display").prepend(html);
          }
          else{
             $("#display").append(html);
          }
      });
    });
  });
};
