$(document).ready(function(){
  var counter = 0;
  var player2_Opponent = false;
  var computer_Opponent = false;
  var player1Choice;
  var player2Choice;
  var computerChoice;
  var player1Score = 0;
  var player2Score = 0;
  var computerScore = 0;
  var player1Turn = false;
  var player2Turn = false;
  var computerTurn = false;
  var winCombos= [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [7, 5, 3]
    ];
  var player1Selections = [];
  var player2Selections = [];
  var computerSelections = [];
  var gameBoardBoxes = []; // will be used to make sure the same box cant be selected again if it ha already been used.
  var gameWon = false;
  //function that will update the names displayed in the scorboard area, depending on whether the user is playing
  //against a computer or another person.
  function updatePlayerNames(){
    if(player2_Opponent === true)
    {
      $('.score-1').children('.name').text('player 1');
      $('.score-1').children('.points').text(player1Score);

      $('.score-2').children('.name').text('player 2');
      $('.score-2').children('.points').text(player2Score);
    }
    else if(computer_Opponent === true)
    {
      $('.score-1').children('.name').text('player 1');
      $('.score-1').children('.points').text(player1Score);

      $('.score-2').children('.name').text('computer');
      $('.score-2').children('.points').text(computerScore);
    }
  }

  //function that will randomly decide who will go first
  function randomFirstPick(){
    if(player2_Opponent === true)
    {
      //randomly select who will pick first
      var randomNum = Math.floor(Math.random() * 2) + 1;
      if(randomNum === 1)
      {
        player1Turn = true;
        $(".player-turn").append("<span> Player 1</span>");
      }
      else{
        player2Turn = true;
        $(".player-turn").append("<span> Player 2</span>");
      }
    }
    else if(computer_Opponent === true)
    {
      //randomly select who will pick first
      var randomNum = Math.floor(Math.random() * 2) + 1;
      if(randomNum === 1)
      {
        player1Turn = true;
        $(".player-turn").append("<span> Player 1</span>");
      }
      else{
        computerTurn = true;
        $(".player-turn").append("<span> Computer</span>");
        computersPick();
      }
    }
  }

  //function that will reset the game back to its default state
  function resetGame(){
    counter = 0;
    player2_Opponent = false;
    computer_Opponent = false;
    player1Score = 0;
    player2Score = 0;
    computerScore = 0;
    player1Choice = "";
    player2Choice = "";
    computerChoice = "";
    player1Turn = false;
    player2Turn = false;
    computerTurn = false;
    player1Selections = [];
    player2Selections = [];
    computerSelections = [];
    gameBoardBoxes = [];
    gameWon = false;
    $(".player-turn").text("Turn:");
    $('.score-1').hide();
    $('.score-2').hide();
    $(".hard-reset").hide();
    $(".game-choice").show();
    $(".boxes").hide();
    $(".win-message").hide();
    $(".lose-message").hide();
    $(".draw-message").hide();
    $(".playAgain-message").hide();
    $(".message-container").hide();

    for(var i = 1; i <= 9; i++)
    {
        $(".box"+i).text("");
    }
  }


  $("button").on("click",function()
  {
    if(this.className === "one-player")
    {
      player2_Opponent = false;
      computer_Opponent = true;
      $(".game-choice").hide();
      var message = "Would you like to be X or O?";
      $(".choice-question").text(message);
      $(".game-starter").show();
    }
    else if(this.className === "two-player")
    {
      player2_Opponent = true;
      computer_Opponent = false;
      $(".game-choice").hide();

      var message = "Player 1: Would you like to be X or O?";
      $(".choice-question").text(message);
      $(".game-starter").show();
    }

    else if(this.className === "choose-x")
    {
      if(computer_Opponent === true)
      {
        player1Choice = "X";
        computerChoice = "O";

        updatePlayerNames();
        randomFirstPick();
      }
      else if(player2_Opponent === true){
        player1Choice = "X";
        player2Choice = "O";

        updatePlayerNames();
        randomFirstPick();
      }
      $(".game-starter").hide();
      $(".hard-reset").show();
      $(".score-1").show();
      $(".score-2").show();
      $(".boxes").show();
    }

    else if(this.className === "choose-o")
    {
      if(computer_Opponent === true)
      {
        player1Choice = "O";
        computerChoice = "X";

        updatePlayerNames();
        randomFirstPick();
      }
      else if(player2_Opponent === true){
        player1Choice = "O";
        player2Choice = "X";

        updatePlayerNames();
        randomFirstPick();
      }

      $(".game-starter").hide();
      $(".hard-reset").show();
      $(".score-1").show();
      $(".score-2").show();
      $(".boxes").show();
    }
    else if(this.className === "back-button")
    {
      player2_Opponent = false;
      computer_Opponent = false;
      $(".game-starter").hide();
      $(".game-choice").show();

    }
    else if(this.className === "hard-reset")
    {
      resetGame();
    }
  });



  //function that marks the current players selection onto the gameboard and keeps track of
  // what box they selected in their selection arrays.
  function playerSelection(boxNumber){
    counter+= 1;
    if(counter <= 9)
    {
      if(player1Turn === true)
      {
        gameBoardBoxes.push(boxNumber);
        $(".box"+boxNumber).text(player1Choice);
        player1Selections.push(boxNumber);
        switchPlayer();
      }
      else if(player2Turn === true){
        gameBoardBoxes.push(boxNumber);
        $(".box"+boxNumber).text(player2Choice);
        player2Selections.push(boxNumber);
        switchPlayer();
      }
    }
  }



  //function that will switch players once one has made a selection and change the appropriate notifcations
  // to display who's turn it is.
  function switchPlayer(){
    if(player2_Opponent === true)
    {
      if(player1Turn === true)
      {
        player1Turn = false;
        player2Turn = true;
        $(".player-turn").text("Turn:");
        $(".player-turn").append("<span> Player 2</span>");
      }
      else{
        player2Turn = false;
        player1Turn = true;
        $(".player-turn").text("Turn:");
        $(".player-turn").append("<span> Player 1</span>");

      }
    }
    else if(computer_Opponent === true)
    {
      if(player1Turn === true)
      {
        player1Turn = false;
        computerTurn = true;
        $(".player-turn").text("Turn:");
        $(".player-turn").append("<span> Computer</span>");

      }
      else{
        computerTurn = false;
        player1Turn = true;
        $(".player-turn").text("Turn:");
        $(".player-turn").append("<span> Player 1</span>");
      }
    }
  }

  //function that will find out if the game has been won or not.
  function gameStatus(){
    if(player2_Opponent === true)
    {
      for(var i =0; i < winCombos.length; i ++)
      {
        if(counter <= 9 && player1Selections.includes(winCombos[i][0]) === true && player1Selections.includes(winCombos[i][1]) === true && player1Selections.includes(winCombos[i][2]) === true  )
        {
          player1Score += 1;
          $('.score-1').children('.points').text(player1Score);
          $(".win-message").text("Player 1 Wins!");
          $(".message-container").show();
          $(".win-message").show();
          $(".playAgain-message").show();
          $(".draw-message").hide();

          gameWon = true;
        }
        else if(counter <= 9 && player2Selections.includes(winCombos[i][0]) === true && player2Selections.includes(winCombos[i][1]) === true && player2Selections.includes(winCombos[i][2]) === true  )
        {
          player2Score += 1;
          $('.score-2').children('.points').text(player2Score);
          $(".win-message").text("Player 2 Wins!");
          $(".message-container").show();
          $(".win-message").show();
          $(".playAgain-message").show();
          $(".draw-message").hide();
          gameWon = true;
        }
        else if(gameWon === false && counter === 9)
        {
          $(".message-container").show();
          $(".win-message").hide();
          $(".draw-message").show();
          $(".playAgain-message").show();
        }
      }
    }
    else if(computer_Opponent === true)
    {
      for(var i =0; i < winCombos.length; i ++)
      {
        if( counter <= 9 && player1Selections.includes(winCombos[i][0]) === true && player1Selections.includes(winCombos[i][1]) === true && player1Selections.includes(winCombos[i][2]) === true  )
        {
          player1Score += 1;
          $('.score-1').children('.points').text(player1Score);
          $(".win-message").text("Player 1 Wins!");
          $(".message-container").show();
          $(".win-message").show();
          $(".lose-message").hide();
          $(".draw-message").hide();
          $(".playAgain-message").show();
          gameWon = true;
        }
        else if( counter <= 9 && computerSelections.includes(winCombos[i][0]) === true && computerSelections.includes(winCombos[i][1]) === true && computerSelections.includes(winCombos[i][2]) === true)
        {
          computerScore += 1;
          $('.score-2').children('.points').text(computerScore);
          $(".message-container").show();
          $(".win-message").hide();
          $(".draw-message").hide();
          $(".lose-message").show();
          $(".playAgain-message").show();
          gameWon = true;
        }
        else if(gameWon === false && counter ===9)
        {
          $(".message-container").show();
          $(".win-message").hide();
          $(".lose-message").hide();
          $(".draw-message").show();
          $(".playAgain-message").show();
        }
      }
    }
  }

  // function that will clear the board for a new game to be played between the same two payers.
  function nextGame()
  {
    counter = 0;
    player1Selections = [];
    player2Selections = [];
    computerSelections = [];
    gameBoardBoxes = [];
    player1Turn = false;
    player2Turn = false;
    computerTurn = false;
    gameWon = false;

    for(var i = 1; i <= 9; i++)
    {
      $(".box"+i).text("");
    }

    $(".player-turn").text("Turn:");
    $(".win-message").hide();
    $(".lose-message").hide();
    $(".draw-message").hide();
    $(".message-container").hide();
    $(".playAgain-message").hide();

    randomFirstPick();
  }


  $(".playAgain-message").on("click",function()
  {
    nextGame();
  });


  // Two player Game
  $("i").on("click",function()
  {
    // Two player gamePlay
    if(player2_Opponent === true && computer_Opponent === false)
    {
      for(var i = 1; i <= 9; i++)
      {
        var selection = "box"+i;
        if(this.className === selection && gameBoardBoxes.includes(i) === false)
        {
          playerSelection(i);
          gameStatus();
        }
      }
    }
    // Computer AI gameplay
    else if (computer_Opponent === true && player1Turn === true && player2_Opponent === false && gameBoardBoxes.includes(i) === false)
    {
      for(var i = 1; i <= 9; i++)
      {
        var selection = "box"+i;
        if(counter < 9 && this.className === selection && gameBoardBoxes.includes(i) === false)
        {
          player1Selection(i);
          if(gameWon === false)
          {
            setTimeout(function() { computersPick(); }, 1200);
          }
        }
        else if(counter === 9){
          player1Selection(i);
        }
      }
    }
  });

  //function that marks the current players selection onto the gameboard and keeps track of
  // what box they selected in their selection arrays.
  function player1Selection(boxNumber){
    counter+= 1;
    if(counter <= 9 && player1Turn === true)
    {
      gameBoardBoxes.push(boxNumber);
      $(".box"+boxNumber).text(player1Choice);
      player1Selections.push(boxNumber);
      switchPlayer();
      gameStatus();
    }
  }


  //function that marks the current players selection onto the gameboard and keeps track of
  // what box they selected in their selection arrays.
  function computersPick(){
      counter+= 1;
      var boxNumber;
      var availableChoices = [1,2,3,4,5,6,7,8,9];
      availableChoices = availableChoices.filter(function(val) {
        return gameBoardBoxes.indexOf(val) === -1;
      });
      console.log(availableChoices);
      var num = Math.floor(Math.random() * availableChoices.length);
      boxNumber = availableChoices[num];

      if(counter <= 9 && computerTurn === true  && gameBoardBoxes.includes(boxNumber) === false)
      {
        gameBoardBoxes.push(boxNumber);
        $(".box"+boxNumber).text(computerChoice);
        computerSelections.push(boxNumber);
        switchPlayer();
        gameStatus();
      }
  }
});
