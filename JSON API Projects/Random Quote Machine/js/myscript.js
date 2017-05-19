
/*Wil create an array of different colors to be used as the changing background colors
when the "Get Quote" button is pressed*/

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
              '#e74c3c', '#9b59b6', '#FB6964', '#342224',
              "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}
/*Will hold the retreived quote from the api in a format that will make it easy for the user to tweet it. */
var tweetQuote = "";

/*My function that selects random programming quotes from an API I found online at http://quotes.stormconsultancy.co.uk/api */
function getQuote(){
  tweetQuote = "";
  // Use the API's endpoint URL to retreive the quote data using JSON
  $.getJSON("http://quotes.stormconsultancy.co.uk/random.json", function(json) {

    tweetQuote += "\"" + json.quote + "\" - " + json.author;

    /* creates a variable that will hold the data retreived from the api to be shown in the html*/
    var quote = "";
    quote +=json.quote + "<br>" +
    "<div class = 'author'> -" + json.author + "</div";
    $("#quote").html(quote);
  });
  /* Selects a rondom color to be assigned to the specificed elemements in the html page*/
  var color = Math.floor(Math.random() * colors.length);
  /* Uses the jQuery UI to call the animate method for creating a fade in effect for the background colors*/
  $("body").animate({
    backgroundColor: colors[color],
    color: colors[color]
  }, 1000);
  $("#getQuote").animate({
    color: colors[color]
  }, 1000);
  $(".fa-twitter").animate({
    color: colors[color]
  }, 1000);
}

$(document).ready(function() {
    getQuote();
    $("#getQuote").on("click", getQuote);

    /* Will open the url to the twitter page to send a tweet out, and it will
    have the slected quote alreay written for the user to tweet out*/
    $("#tweetQuote").on("click", function(){
      openURL("https://twitter.com/intent/tweet?text=" + tweetQuote);

    });
});

/*
// make AJAX call
$.ajax({
  type: 'GET',
     data: {},
     dataType: 'jsonp',
    url: 'http://quotes.stormconsultancy.co.uk/random.json',
    success: function(data) {
          $('.messageArea').append(data);
         }
   });*/
