//Variables from HTML elements 
var startQuizDiv = document.getElementById("startpage");
var startQuizButton = document.getElementById("startbtn");

var quizContent = document.getElementById("quiz");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var resultsEl = document.getElementById("result");

var gameoverDiv = document.getElementById("gameOver");
var finalScoreEl = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("name");
var submitScoreBtn = document.getElementById("submitScore");

var highscoreContainer = document.getElementById("highscore-Container");
var highscoreDiv = document.getElementById("highscore-Page");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreDisplayName = document.getElementById("highscore-name");

var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var endGameBtns = document.getElementById("endGameBtns");

//Array of questions the user will answer with the answer in []
var quizQuestions =  [{
        question: "Commonly used data types DO NOT include: ",
        answerA: "strings",
        answerB: ["Booleans"],
        answerC: "alerts",
        answerD: "numbers",
    },
    {
        question:"The condition in an if/else statement is enclosed within ____ ",
        answerA: "quotes",
        answerB: "curly brackets",
        answerC: ["Paretheneses"],
        answerD: "Square brackets",
    },
    {
        question:"Arrays in javascript can be used to store _____",
        answerA: "other arrays",
        answerB: "strings",
        answerC: "booleans",
        answerD: ["all of the above"],
        },
        {
        question:"A very useful tool used during development and debugging for printing content to the debugger is",
        answerA: "javascript",
        answerB: "terminal",
        answerC: ["for logging"],
        answerD: "console log",
        },
        {
        question:"Sting values must be enclosed withing _____ when being assigned to variables",
        answerA: "commas",
        answerB: "curly brackets",
        answerC: "swuare brackets",
        answerD: ["parentheses"],
        }
];
//variables for timer and questions
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 70;
var timerInterval;
var score = 0;
var correct;
var incorrect;

// This will go through the quiz questions and answers so that they display on the page
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.answerA;
    buttonB.innerHTML = currentQuestion.answerB;
    buttonC.innerHTML = currentQuestion.answerC;
    buttonD.innerHTML = currentQuestion.answerD;
};
//This function starts the timer which then starts the quiz
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time Remaining: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizContent.style.display = "block";
}
//This will show your score after completing the quiz or if the timer runs out of time
function showScore(){
    quizContent.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!!";
}
//This will save the array of high scores that are saved in local storage. It will push the name and score into the array we are saving in the local storage
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Name can't be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});
//This will clear and generate a new high score from the local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i < highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
//This shows the high scores page which is hidig other pages
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}
//Clears local storage of high scores
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}
//Set all the varaibles back to original
//Shows the home page to let the user replay the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 70;
    score = 0;
    currentQuestionIndex = 0;
}
//This will check the answers the user chooses
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{        
        showScore();
    }

}
// Button to start the quiz
startQuizButton.addEventListener("click",startQuiz);
