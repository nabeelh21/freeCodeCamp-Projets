$(document).ready(function(){

  var sessionLength = 25;
  var breakLength = 5;
  var clockMinutes = sessionLength;
  var clockSeconds = 0;
  var isStop = true;
  var interval;


  //Update Time on clock
  function updateTime() {
    var min = clockMinutes;
    var sec = clockSeconds;

    if(min < 10)
      min = "0" + min;
    if(sec < 10)
      sec = "0" + sec;
    $("#clock-time").html(min + ":" + sec);
  }

  // If any of the timer settings buttons are pressed
  $("button").on("click",function()
  {
    if(this.id === "break-minus")
    {
      if(breakLength > 1 && isStop)
      {
        breakLength -= 1;
      $("#break-time").html(breakLength);
      }
    }
    else if(this.id === "break-plus")
    {
      if(isStop)
      {
        breakLength += 1;
      $("#break-time").html(breakLength);
      }
    }
    else if(this.id === "session-minus")
    {
      if(sessionLength >1 && isStop )
      {
        sessionLength -= 1;
        clockMinutes = sessionLength;
        updateTime();
      $("#session-time").html(sessionLength);
      }
    }
    else if(this.id === "session-plus")
    {
      if(isStop)
      {
        sessionLength += 1;
        clockMinutes = sessionLength;
        updateTime();
      $("#session-time").html(sessionLength);
      }
    }
  });

  //Function that will be called inorder to fill the Circle to show the progress of the timer
  function fillCircle() {
    var total_sec;

    if($("#clock-text").text() === "Session")
    {
      total_sec = sessionLength * 60;
      var current_sec = (clockMinutes) * 60 + clockSeconds;
      var percentage = (current_sec/total_sec) * 100;

      $(".inner").css("background" , "linear-gradient(to bottom, rgba(34,34,34,1) "+percentage+"%, rgba(116,207,122,1) 0%, rgba(116,207,122,1) 0%)");
    }
    else{
      total_sec = breakLength * 60;

      var current_sec = (clockMinutes) * 60 + clockSeconds;
      var percentage = (current_sec/total_sec) * 100;

      $(".inner").css("background" , "linear-gradient(to top, rgba(34,34,34,1) "+percentage+"%, rgba(254,51,50,1) 0%, rgba(254,51,50,1) 0%)");
    }
  }
  fillCircle();

  //Function that will be called to update the start/stop button when pressed.
  function updateCtrlButton() {
    // if the stop button is pressed
    if(isStop) {
      $(".ctrl-start").removeClass("btn-danger");
      $(".ctrl-start").addClass("btn-success");
      $(".ctrl-start").text("Start");
    }
    // if the start button is pressed
    else {
      $(".ctrl-start").removeClass("btn-success");
      $(".ctrl-start").addClass("btn-danger");
      $(".ctrl-start").text("Stop");
    }
  }

  //Function that will be called to start the clock timer
  function startClock() {

    fillCircle();
    // if the seconds timer has reached zero, then minutes is not zero, then decrease the minutes by 1 and reset the seconds back to 59 seconds.
    if(clockMinutes !== 0 && clockSeconds === 0) {
      clockSeconds = 59;
      clockMinutes -= 1;
      updateTime();
    }
    // if both minutes and second seconds have reached zero, then switch to the break timer countdown
    else if (clockMinutes === 0 && clockSeconds === 0)
    {
      if($("#clock-text").text() === "Session") {
        $("#clock-text").text("Break");
        clockMinutes = breakLength;
        updateTime();
      }
      else if($("#clock-text").text() === "Break") {
        $("#clock-text").text("Session");
        clockMinutes = sessionLength;
        updateTime();
      }
    }
    else {
      clockSeconds -= 1;
      updateTime();
    }
  }

  // If the start/stop button is pressed
  $(".ctrl-start").on("click",function(){
    //When start button is pressed
    isStop = !isStop;
    updateCtrlButton();
    if(!isStop) {
      //The setInterval() method calls a function or evaluates an expression at specified intervals (in   milliseconds). 1000ms = 1 second
      interval = setInterval(startClock, 1000);
    }
    //When stop button is pressed
    else {
      isStop = true;
      updateCtrlButton();
      clearInterval(interval);
    }
  });

  // If the reset button is pressed
  $(".ctrl-reset").on("click",function(){
    isStop = true;
    updateCtrlButton();
    $("#clock-text").text("Session");
    clockMinutes = sessionLength;
    clockSeconds = 0;
    updateTime();
    $(".inner").css("background" , "linear-gradient(to bottom, rgba(34,34,34,1) 100%, rgba(254,51,50,1) 0%, rgba(254,51,50,1) 0%)");
    clearInterval(interval);
  });

});
