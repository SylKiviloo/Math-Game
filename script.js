$(document).ready(function(){ //wrap in jquery ready function
  var currentQuestion; //global variable to keep track of the current question

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
  currentQuestion = questionGenerator(); 
  $('#question').text(currentQuestion.equation); //jquery the id question's text will be the current equation

}); //end of ready function