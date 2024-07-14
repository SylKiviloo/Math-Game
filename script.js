$(document).ready(function(){ //wrap in jquery ready function
  var currentQuestion; //global variable to keep track of the current question
  var timeLeft = 10; //...keep track of time player has left
  var currentScore = 0; //...keep track of current score
  var highestScore = 0; //...keep track of highest score
  var interval; //...keep track of timer id (to turn it on or off)

  //start the game when the timer is on (has a value)
  var startGame = function () { //call this function in the event listener
    if (!interval) { //if no timer value, do these things:
      if (timeLeft === 0) { //if timer already got to 0
        updateTimeLeft(10); //update it so it will restart at 10 instead of continuing below 0
        updateCurrentScore(-currentScore); //and negate the current score so it will reset to 0 for a new game - not working
      }
      interval = setInterval(function () { //then run the timer
        updateTimeLeft(-1); //using countdown mode
        if (timeLeft === 0) { //stop if timer reaches 0
          clearInterval(interval); //and clear the timer
          interval = undefined; //back to !interval
        }
      }, 1000); //do it every second 
    }
  }

  //create question generator
  var randomNumberGenerator = function (size) { //generate random numbers
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {}; //create the question object
    var num1 = randomNumberGenerator(10); //size is 10 for now
    var num2 = randomNumberGenerator(10);
  
    question.answer = num1 + num2; //calculation
    question.equation = String(num1) + " + " + String(num2) + " = "; //front end
  
    return question; //return the object
  }
  //console.log(questionGenerator()); //works

  /*var renderNewQuestion = function () {
    currentQuestion = questionGenerator(); 
    $('#question').text(currentQuestion.equation); //jquery so the #question's text will be the current equation
  }*/

  /*//event listener for user answer...wrong position, delete
  $('#answer').on('keyup', function () { 
    //console.log($(this).val()); //log value of input on keyup event to test
    startGame(); //start the game on user input keyup
    checkAnswer(Number($(this).val()), currentQuestion.answer); //jquery convert answer from string to number
  });*/

  //generate a new question
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator(); 
    $('#question').text(currentQuestion.equation); //jquery so the #question's text 
  }

  //compare user answer to correct sum
  var checkAnswer = function (answer, sum) { //create function taking input and result
    //console.log(answer === sum); //check that it works
    if (answer === sum) {
      renderNewQuestion(); //function call for new question
      $('#answer').val(''); //clear the answer if correct but not if wrong
      updateTimeLeft(+1); //function call to add 1 more second on the timer if correct
      updateCurrentScore(+1) //function call to add 1 to the current score
    }
  }

  //event listener for user input
  $('#answer').on('keyup', function () { //on user input keyup
    //console.log($(this).val()); //log value of input on keyup event to test
    startGame(); //start the game
    checkAnswer(Number($(this).val()), currentQuestion.answer); //jquery convert answer from string to number
  });

  //event listener for button click
  $('#start-button').on('click', function () { //on button click
    document.getElementById('answer').focus(); //focus the input field
    startGame(); //start the game
    checkAnswer(Number($(this).val()), currentQuestion.answer); //jquery convert answer from string to number
  }); 

  //timer initial set up and test
  /*setInterval(function () {
    console.log('1 sec passed');
  }, 1000);*/

  //countdown timer - move into startGame()
  /*var interval = setInterval(function () { 
    
    timeLeft--; //count down before abstracting into a function
    $('#timer').text(timeLeft); //jquery change text of the timer */

    /*updateTimeLeft(-1); //function call to update timer to resume countdown mode
    if (timeLeft === 0) {  
      clearInterval(interval); //clear it at 0
    }
    //console.log(timeLeft);
  }, 1000); //every second  */

  //add 1 second 
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#timer').text(timeLeft);
  }

  var updateCurrentScore = function (amount) {
    currentScore += amount;
    $('#current-score').text(currentScore); //inject to DOM
  };

  /*var updateHighestScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };*/

renderNewQuestion();

}); //end of ready function