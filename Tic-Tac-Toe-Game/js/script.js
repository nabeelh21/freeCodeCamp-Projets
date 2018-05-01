$(document).ready(function(){

  // PolyFill for IE browser,since it doesnt support the includes function.
  if (!Array.prototype.includes){
    Array.prototype.includes = function() {
      'use strict';
      return Array.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }
  if (!String.prototype.includes) {
    String.prototype.includes = function()
    {
      'use strict';
      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }

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
        setTimeout(function() { computersPick(); }, 1200);
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
    else if(computer_Opponent === true){
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
  function nextGame(){
    counter = 0;
    player1Selections = [];
    player2Selections = [];
    computerSelections = [];
    gameBoardBoxes = [];
    player1Turn = false;
    player2Turn = false;
    computerTurn = false;
    gameWon = false;

    for(var i = 1; i <= 9; i++){
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


  // Gameboard clicking
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
    else if (computer_Opponent === true && player1Turn === true && player2_Opponent === false)
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
      gameStatus();
      switchPlayer();
    }
  }


/*--------------------------------------------------------------------------------------------------------
COMPUTER AI MOVES LOGIC using https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
---------------------------------------------------------------------------------------------------------*/

  //function that determines the computers next move and keeps track of what box they selected in its selection array.
  function computersPick(){
      counter+= 1;
      var boxNumber;
      var availableChoices = [1,2,3,4,5,6,7,8,9];
      availableChoices = availableChoices.filter(function(val) {
        return gameBoardBoxes.indexOf(val) === -1;
      });

      //If computer has first move, then it marks center
      if(counter === 1)
      {
        boxNumber = 5;
        console.log("Computer first: Marks Center");
      }
      //If X plays corner opening move (best move for them), computer should take center
      else if(counter === 2 && (player1Selections.includes(1) === true || player1Selections.includes(3) === true || player1Selections.includes(7) === true || player1Selections.includes(9) === true)){
        boxNumber = 5;
        console.log("If player 1 plays corner opening move (best move for them), computer should take center");
      }
      //If player 1 plays edge opening move, the computer should take center, and then follow the below list of priorities, mainly paying attention to block forks.
      else if(counter === 2 && (player1Selections.includes(2) === true || player1Selections.includes(4) === true || player1Selections.includes(6) === true || player1Selections.includes(8) === true)){
        boxNumber = 5;
        console.log("If X plays corner opening move (best move for them), O should take center");
      }
      //If player 1 plays center opening move, then computer should take corner, and then follow the below list of priorities, mainly paying attention to block forks.
      else if(counter === 2 && player1Selections.includes(5) === true){
        boxNumber = playCornerSquare();
        console.log("If X plays corner opening move (best move for them), O should take center");
      }
      //step 1: If the computer has two in a row, they can place a third to get three in a row.
      else if(availableChoices.includes(checkTwoInRow(computerSelections)) === true){
        boxNumber = checkTwoInRow(computerSelections);
        console.log("win the game");
      }
      //step 2:  If the opponent has two in a row, the computer must play the third themselves to block the opponent.
      else if(availableChoices.includes(checkTwoInRow(player1Selections)) === true){
        boxNumber = checkTwoInRow(player1Selections);
        console.log("Block player 1.");
      }
      //step 3: Create an opportunity where the computer has two threats to win (two non-blocked lines of 2).
      else if((computerSelections.includes(3) === true && computerSelections.includes(7) === true && availableChoices.includes(1) === true && availableChoices.includes(2) === true && availableChoices.includes(4) === true) ||
              (computerSelections.includes(3) === true && computerSelections.includes(7) === true && availableChoices.includes(9) === true && availableChoices.includes(6) === true && availableChoices.includes(8) === true) ||
              (computerSelections.includes(1) === true && computerSelections.includes(9) === true && availableChoices.includes(2) === true && availableChoices.includes(3) === true && availableChoices.includes(6) === true) ||
              (computerSelections.includes(1) === true && computerSelections.includes(9) === true && availableChoices.includes(4) === true && availableChoices.includes(7) === true && availableChoices.includes(8) === true))
      {
        boxNumber = createFork();
        console.log("Creates an opportunity where the computer has two threats to win");
      }
      //step 4: Blocking an opponent's fork: If there is a configuration where the opponent can fork, the player should block that fork.
      //When both player 1 and computer are perfect players and player 1 chooses to start by marking a corner, computer takes the center, and player 1 takes the corner opposite the original.
      //In that case, computer is free to choose any edge as its second move to block potential fork
      else if(counter === 4 && computerSelections.includes(5)=== true && ((player1Selections.includes(1) === true && player1Selections.includes(9) === true) || (player1Selections.includes(3) === true && player1Selections.includes(7) === true)))
      {
        boxNumber = playMiddleSideSquare();
        console.log("Block fork");
      }
      // step 5: A player marks the center.
      else if(availableChoices.includes(5) === true){
        boxNumber = 5;
        console.log("Computer first: Marks Center");
      }
      //step 6: If the opponent is in the corner, the computer plays the opposite corner.
      else if((player1Selections.includes(1) === true && availableChoices.includes(9) === true)  ||
              (player1Selections.includes(9) === true && availableChoices.includes(1) === true ) ||
              (player1Selections.includes(3) === true && availableChoices.includes(7) === true ) ||
              (player1Selections.includes(7) === true && availableChoices.includes(3) === true ))
      {
        boxNumber = playOppositeCorner();
        console.log("play the opposite corner "+ boxNumber + " if empty");
      }
      //step 7: The computer plays in a corner square.
      else if(availableChoices.includes(1) === true || availableChoices.includes(3) === true || availableChoices.includes(7)=== true || availableChoices.includes(9)=== true)
      {
        boxNumber = playCornerSquare();
        console.log("play the corner "+ boxNumber + " square ");
      }
      //step 8: The computer plays in a middle square on any of the 4 sides.
      else if(availableChoices.includes(2) === true  || availableChoices.includes(4)=== true || availableChoices.includes(6)=== true || availableChoices.includes(8)=== true)
      {
        boxNumber = playMiddleSideSquare();
        console.log("play the middle "+ boxNumber + " square ");
      }

      if(counter <= 9 && computerTurn === true  && gameBoardBoxes.includes(boxNumber) === false){
        gameBoardBoxes.push(boxNumber);
        $(".box"+boxNumber).text(computerChoice);
        computerSelections.push(boxNumber);
        switchPlayer();
        gameStatus();
      }
  }

  function checkTwoInRow(player){
    for(var i =0; i < winCombos.length; i ++){
      var selections = [winCombos[i][0],winCombos[i][1],winCombos[i][2]];

      if( player.includes(selections[0]) === true && player.includes(selections[1]) === true && gameBoardBoxes.includes(selections[2]) === false){
        return selections[2];
      }
      else if( player.includes(selections[1]) === true && player.includes(selections[2]) === true && gameBoardBoxes.includes(selections[0]) === false){
        return selections[0];
      }
      else if( player.includes(selections[0]) === true && player.includes(selections[2]) === true && gameBoardBoxes.includes(selections[1]) === false){
        return selections[1];
      }
    }
  }

  //function that will create an opportunity where the computer has two threats to win (two non-blocked lines of 2).
  function createFork(){
    if((computerSelections.includes(3) === true && computerSelections.includes(7) === true && gameBoardBoxes.includes(1) === false && gameBoardBoxes.includes(2) === false && gameBoardBoxes.includes(4) === false))
    {
      return 1;
    }
    else if((computerSelections.includes(3) === true && computerSelections.includes(7) === true && gameBoardBoxes.includes(6) === false && gameBoardBoxes.includes(8) === false && gameBoardBoxes.includes(9) === false))
    {
      return 9;
    }
    else if((computerSelections.includes(1) === true && computerSelections.includes(9) === true && gameBoardBoxes.includes(2) === false && gameBoardBoxes.includes(3) === false && gameBoardBoxes.includes(6) === false)){
      return 3;
    }
    else if((computerSelections.includes(1) === true && computerSelections.includes(9) === true && gameBoardBoxes.includes(4) === false && gameBoardBoxes.includes(7) === false && gameBoardBoxes.includes(8) === false))
    {
      return 7;
    }
  }

  function playOppositeCorner(){

    if( player1Selections.includes(1) === true && player1Selections.includes(9) === false  && gameBoardBoxes.includes(9) === false ){
      return 9;
    }
    else if( player1Selections.includes(9) === true && player1Selections.includes(1) === false && gameBoardBoxes.includes(1) === false ){
      return 1;
    }
    else if( player1Selections.includes(3) === true && player1Selections.includes(7) === false && gameBoardBoxes.includes(7) === false ){
      return 7;
    }
    else if( player1Selections.includes(7) === true && player1Selections.includes(3) === false && gameBoardBoxes.includes(3) === false ){
      return 3;
    }
  }

  function playCornerSquare(){

    if(gameBoardBoxes.includes(1) === false ){
      return 1;
    }
    else if( gameBoardBoxes.includes(3) === false ){
      return 3;
    }
    else if( gameBoardBoxes.includes(7) === false ){
      return 7;
    }
    else if( gameBoardBoxes.includes(9) === false ){
      return 9;
    }
  }

  function playMiddleSideSquare(){

    if(gameBoardBoxes.includes(2) === false ){
      return 2;
    }
    else if( gameBoardBoxes.includes(4) === false ){
      return 4;
    }
    else if( gameBoardBoxes.includes(6) === false ){
      return 6;
    }
    else if( gameBoardBoxes.includes(8) === false ){
      return 8;
    }
  }
});
