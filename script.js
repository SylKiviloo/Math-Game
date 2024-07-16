$(document).ready(function(){ //wrap in jquery ready function
  var currentQuestion; //global variable to keep track of the current question
  var timeLeft = 10; //...keep track of time player has left
  var currentScore = 0; //...keep track of current score
  var highestScore = 0; //...keep track of highest score
  var choice = 10;
  var interval; //...keep track of timer id (to turn it on or off)

  //start the game when the timer is on (has a value)
  var startGame = function () { //call this function in the event listener
    if (!interval) { //if no timer value, do these things:
      if (timeLeft === 0) { //if timer already got to 0
        updateTimeLeft(10); //update it so it will restart at 10 instead of continuing below 0
        updateCurrentScore(-currentScore); //and negate the current score so it will reset to 0 for a new game
      }
      interval = setInterval(function () { //then run the timer
        updateTimeLeft(-1); //using countdown mode
        if (timeLeft === 0) { //stop if timer reaches 0
          clearInterval(interval); //and clear the timer
          interval = undefined; //reset back to !interval
        }
        if(currentScore > highestScore) { //if high score is beat
          highestScore = currentScore; //replace it with current score
              $('#current-score').text(currentScore); //inject
              $('#highest-score').text(highestScore); //inject
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
    var num1 = randomNumberGenerator(10); //size is 10 for now. change to variable that holds the slider value
    var num2 = randomNumberGenerator(10);
  
    question.answer = num1 + num2; //calculation
    question.equation = String(num1) + " + " + String(num2) + " = "; //front end
  
    return question; //return the object
  }
  //console.log(questionGenerator()); //works

  //generate a new question
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator(); 
    $('#question').text(currentQuestion.equation);
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

  //set number limit with slider
  var numberLimit = function () { //create a function
    $('#value').val() // taking the slider's value
    console.log('Number limit is: ' + choice); //and logging it to the console - not working
    choice = value;
  }
 numberLimit();

  //event handler for user input
  $('#answer').on('keyup', function () { //on user input keyup
    //console.log($(this).val()); //log value of input on keyup event to test
    startGame(); //start the game
    checkAnswer(Number($(this).val()), currentQuestion.answer); //jquery convert answer from string to number
  });

  //event handler for button click
  $('#start-button').on('click', function () { //on button click
    document.getElementById('answer').focus(); //focus the input field
    startGame(); //start the game
    checkAnswer(Number($(this).val()), currentQuestion.answer); //jquery convert answer from string to number
  }); 

  //event handler for slider 
  $('#slider').on('input', function () {
    $('#value').text($(this).val());
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


  //add 1 second to timer
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#timer').text(timeLeft); //inject to DOM
  }
  //show the current score
  var updateCurrentScore = function (amount) {
    currentScore += amount;
    $('#current-score').text(currentScore); //inject to DOM
  };

  //show the highest score
  /*var updateHighestScore = function () {
    var oldScore = currentScore;
    var newScore = 0;
    console.log('currently:' + oldScore); //working
    
    if (newScore > oldScore) { //if new score is greater than old score
      highestScore = newScore; //highest score = new score
    } else{
      highestScore = oldScore; //highest score = old score
    }
    console.log('highest so far:' + highestScore); //
    $('#highest-score').text(highestScore); //inject
  };*/

  
renderNewQuestion();

}); //end of ready function