
var searchItem = "";
$(document).ready(function(){

  $('#search-text').keypress(function(e) { //keypress (or keydown) is better than keyup since we can suppress form submit on 'enter' key being pressed
    searchItem = $('#search-text').val().replace(/\s+/g, '%20'); //user input. Also, replace space ('+' means any amount) with %20 (single space) to meet Wiki API call parameters
    var apiURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=?&gsrsearch=' + searchItem + '&continue=';
    if (e.which === 13) { //if user returns enter key. Also e.keyCode is not implemented the same way by all browsers but JQuery normalizes the vale of e.which for all browsers
      wikiCall(apiURL);
      e.preventDefault(); //prevents implicit submit of form when enter is pressed. API call is interupted on page refresh otherwise.
    }
  });

 /************************************************************/
  $('.fa-search').on('click', function() {
    searchItem = $('#search-text').val().replace(/\s+/g, '%20'); //user input. Also, replace space ('+' means any amount) with %20 (single space) to meet Wiki API call parameters
    var apiURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=?&gsrsearch=' + searchItem + '&continue=';
    wikiCall(apiURL);
  });

  /************************************************************/
  $('.fa-times-circle').on('click', function() {
    $('#search-text').val(""); //clears value in text box
    $(".search-results").html(""); //clears all the appended divs
  });
});



//**********************************************************************//
function wikiCall(link) {
  $(".search-results").html(""); //clears display for each new call
  $.getJSON(link, function(searchResults)
  {
    console.log(searchResults);
    for (var i = 0; i < searchResults.query.pages.length; i++)
    {
      $(".search-results").append("<a href=" + searchResults.query.pages[i].fullurl + " target = '_blank'><div class='searchResultsContainer'><span style='font-weight:bold; font-size:150%; margin-bottom:100px;'>" + searchResults.query.pages[i].title + "</span><br></br>" + searchResults.query.pages[i].extract + "</div></a>");
      $(".search-results").append("<br>");
    }
  });
}
