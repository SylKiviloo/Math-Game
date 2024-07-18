$(document).ready(function () { 
  var currentQuestion; 
  var timeLeft = 10;
  var currentScore = 0;
  var highestScore = 0;
  var choice = 10;
  var interval;

  
  var startGame = function () { 
    if (!interval) { 
      if (timeLeft === 0) { 
        updateTimeLeft(10);
        updateCurrentScore(-currentScore);
      }
      interval = setInterval(function () { 
        updateTimeLeft(-1);
        if (timeLeft === 0) { 
          clearInterval(interval); 
          interval = undefined;
        }
        if(currentScore > highestScore) {
          highestScore = currentScore; 
              $('#current-score').text(currentScore);
              $('#highest-score').text(highestScore);
        }
      }, 1000);
    }
  }

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {}; 
    var num1 = randomNumberGenerator(choice);
    var num2 = randomNumberGenerator(choice);
  
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2) + " = ";
  
    return question; 
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator(); 
    $('#question').text(currentQuestion.equation);
  }

  var checkAnswer = function (answer, sum) { 
    if (answer === sum) {
      renderNewQuestion();
      $('#answer').val('');
      updateTimeLeft(+1);
      updateCurrentScore(+1);
    }
  }

  var updateNumberLimit = function (choice) { 
    value = choice;
    $('#value').text(choice);
  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#timer').text(timeLeft);
  }
  
  var updateCurrentScore = function (amount) {
    currentScore += amount;
    $('#current-score').text(currentScore);
  }

  $('#answer').on('keyup', function () { 
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer); 
  });

  $('#start-button').on('click', function () { 
    document.getElementById('answer').focus(); 
    startGame(); 
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  }); 

  $('#slider').on('change', function () {
    choice = Number($(this).val());
    updateNumberLimit(choice);
    renderNewQuestion();
  });

  

renderNewQuestion();

});