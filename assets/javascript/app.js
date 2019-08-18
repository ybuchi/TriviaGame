//Variable for correct answers
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredAnswers = 0;

//Create and store the questions:
var questionsArray = [];

//Create a function that will build the question

function Question(question, answerOption1, answerOption2, answerOption3, answerOption4, answerOption5, answer, info){
    this.question = question;
    this.answerOption1 = answerOption1;
    this.answerOption2 = answerOption2;
    this.answerOption3 = answerOption3;
    this.answerOption4 = answerOption4;
    this.answerOption5 = answerOption5;
    this.answer = answer;
    this.info = info;
}
//Create variables for each question (we can also add another property for message in which we can say a little more information)

function initiateQuestions(){
var question1 = new Question("How many continents does Earth have?", "7","5", "10","3","There's actually no such thing as continents.","7","Earth has seven continents: Africa, Europe, Asia, North America, South American, Oceania, Antarctica.");

var question2 = new Question("The Indian subcontinent is the birthplace of how many of the world's major religions?","7","2","4","1","0","4", "The Indian subcontinent is the birthplace of four of the world's major religions: Hinduism, Buddhism, Sikhism and Jainism.");

var question3 = new Question("What is the highest peak in Europe?", "Monte Rosa", "Matterhorn","Mont Blanc","Mount Elbrus", "Corno Grande", "Mount Elbrus", "While the Mont Blanc is often mistaken as the highest peak in Europe, the title actually belongs to Mount Elbrus (4,741m/15,554ft), situated in Russia, right at the border of the European and Asian continents.");

var question4 = new Question("Which desert is considered as the driest place on Earth?", "Death Valley", "the Sahara Desert", "the Arabian Desert", "the Atamaca Desert", "the Gobi Desert", "the Atamaca Desert", "The Atamaca Desert is considered the driest place on Earth, with some parts having no recorded precipitations since recordings began. Other parts haven't received precipitation in over 40 years!");

var question5 = new Question("Which country does not officially have a capital?", "the Vatican", "Micronesia", "Saint Kitts & Nevis", "Nauru", "Tuvalu", "Nauru", "Nauru is actually the only country in the world with no official, or de jure, capital.");


questionsArray.push(question1, question2, question3, question4, question5);
console.log(questionsArray);
}

//Create the global variables and functions for the timer
//First, the variables
var clockRunning = false;
var intervalId;
//The timer will start at 5min, the time here is in seconds
var time = 10;


window.onload = function() {
    $("#actn-play").on("click", startTimer);

};

//Define startTimer

function startTimer(){
    if (!clockRunning){
        intervalId = setInterval(count, 1000);
        clockRunning = true;

    }
}
//Define stop timer function that will stop the timer and calculate the scores.
function stop() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    console.log("The intervalID value is: " + intervalId);
    clockRunning = false;
    console.log("The Stop function has been fired.");


    for(i = 0; i < questionsArray.length; i++){
        var userChoice = $("input[name='question"+i+1+"choice']:checked").val();
        console.log("userChoice: " + userChoice);
        console.log("userChoice type: " + typeof userChoice);
        console.log(questionsArray[i].answer);

        if (userChoice === questionsArray[i].answer){
            correctAnswers++;
        } else if (typeof userChoice === "undefined"){
            unansweredAnswers++;
        }else{
            incorrectAnswers++;
        };
        console.log("correctAnswers:" + correctAnswers);
    };

    //Trigger resultsPage to show the results
    resultsPage("#general-container");

  };



function count() {
    time--;
    var converted = timeConverter(time);
    console.log(converted);

    $("#timer").html("TIME LEFT: " + converted + "<br>");

}
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }

//Now we have an arry containing the entire "question" block.

//Create a constructor function that will hold all of the game questions
//Create a function that "changes the page" from the game title page to the questionnaire.
function changePage(targetDivId){
    console.log("changePage has fired");
    //call initiateQuestions
    initiateQuestions();
    //Empty the div first...
    $(targetDivId).empty();

    //This is where you can change the height of the general container to fit all of the questions:
    $(targetDivId).css("height", "1000px");
    
    //Create the div that will contain the timer:
    $(targetDivId).append("<div id='timer'>");
    $("#timer").text("TIME LEFT: ");


    //Create a form that will contain all the questions:
    $(targetDivId).append("<form id ='question-form'>");
    
    //... and create a for loop to create divs for each question
    for (i = 0; i < questionsArray.length; i++){
        $("#question-form").append("Question"+[i+1]+ ":<br>" +questionsArray[i].question +
         "<br><input type='radio' name = question"+i+1+"choice value= "+questionsArray[i].answerOption1+"> "+questionsArray[i].answerOption1 + "<br><input type='radio' name =question"+i+1+"choice value= "+questionsArray[i].answerOption2+">" + questionsArray[i].answerOption2 + "<br><input type='radio' name =question"+i+1+"choice value="+questionsArray[i].answerOption3+">" + questionsArray[i].answerOption3 + "<br><input type='radio' name =question"+i+1+"choice value="+questionsArray[i].answerOption4+">" + questionsArray[i].answerOption4 + "<br><input type='radio' name =question"+i+1+"choice value="+questionsArray[i].answerOption5+">" + questionsArray[i].answerOption5 + "<br><br>");
    }
    //Create a submit button that the user will click on if they are done before the timer finsihes
    var submitButton = $("<button class='btn' id='btn-submit'>");
    submitButton.text("SUBMIT");
    $(targetDivId).append(submitButton);

    //Start the timer 
    startTimer();

    //If the player clicks the submit button, stop the timer and then go to the results page
    $("#btn-submit").click(function(){
        stop();
        //Empty the target div
        $(targetDivId).empty();

        //Display: "Time's Up!"
        $(targetDivId).append("<h1>RESULTS:</h1>");

        //Display the number of correct answers
        $(targetDivId).append("<div id='correct-answers'>CORRECT ANSWERS: " + correctAnswers + "</div><br>");
        $(targetDivId).append("<div id='incorrect-answers'>INCORRECT ANSWERS: " + incorrectAnswers + "</div><br>");
        $(targetDivId).append("<div id='unanswered-answers'> UNANSWERED: " + unansweredAnswers + "</div>");

        


        });

};

function resultsPage(targetDivId){
    console.log("the resultsPage function has fired");


    //Empty the target div
    $(targetDivId).empty();

    //Display: "Time's Up!"
    $(targetDivId).append("<h1>TIME'S UP!</h1>");

    //Display the number of correct answers
    $(targetDivId).append("<div id='correct-answers'>CORRECT ANSWERS: " + correctAnswers + "</div><br>");
    $(targetDivId).append("<div id='incorrect-answers'>INCORRECT ANSWERS: " + incorrectAnswers + "</div><br>");
    $(targetDivId).append("<div id='unanswered-answers'> UNANSWERED: " + unansweredAnswers + "</div>");
             
}
function submitPage(targetDivId){
    console.log("the resultsPage function has fired");


    //Empty the target div
    $(targetDivId).empty();

    //Display: "Time's Up!"
    $(targetDivId).append("<h1>RESULTS</h1>");

    //Display the number of correct answers
    $(targetDivId).append("<div id='correct-answers'>CORRECT ANSWERS: " + correctAnswers + "</div><br>");
    $(targetDivId).append("<div id='incorrect-answers'>INCORRECT ANSWERS: " + incorrectAnswers + "</div><br>");
    $(targetDivId).append("<div id='unanswered-answers'> UNANSWERED: " + unansweredAnswers + "</div>");
             
}

//Add a function similar to resultsPage that will display the results if the user submits the form before the time is over


///



$( document ).ready(function() {
    console.log( "ready!" );
});

//When the user clicks PLAY, the questionnaire appears (execute function changePage) and begin the game
$("#actn-play").click(function(){

    changePage("#general-container");
    setTimeout(stop, 10000);
});




