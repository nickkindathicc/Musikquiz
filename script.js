// gets Elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qMp3 = document.getElementById("qMp3");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// variables


let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

let questions = [
  {
    question : "Welcher Musiker hat dieses Stück Komponiert?",
    mp3Src : "/musik/klassik/3. Gavattes Beethoven.mp3",
    choiceA : "bilder/Beethoven.jpg",
    choiceB : "bilder/Mozart.jpg",
    choiceC : "bilder/Vivaldi.jpg",
    correct : "A"
  },{
    question : "Welcher Musiker hat dieses Stück komponiert?",
    mp3Src : "/musik/klassik/3. Gavattes Beethoven.mp3",
    choiceA : "bilder/Mozart.jpg",
    choiceB : "bilder/Vivaldi.jpg",
    choiceC : "bilder/Beethoven.jpg",
    correct : "A"
  }
];


function renderQuestion(){

  let q = questions[runningQuestion];

  question.innerHTML = "<p>"+ q.question +"</p>";

  qMp3.innerHTML = "<source"+ q.mp3Src + "></source>"

  choiceA.innerHTML = "<img src=" + q.choiceA +">";

  choiceB.innerHTML = "<img src=" + q.choiceB +">";

  choiceC.innerHTML = "<img src=" + q.choiceC +">";

}

function renderProgress(){

  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){

      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";

  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "green"
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "red"
}

function renderCounter(){
  if(count <= questionTime){
      counter.innerHTML = count;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++
  }else{
      count = 0;
      // changes color -> red
      answerIsWrong();
      if(runningQuestion < lastQuestion){
          runningQuestion++;
          renderQuestion();
      }else{
          // ends quiz + shows score
          clearInterval(TIMER);
          scoreRender();
      }
  }
}

const lastQuestion = questions.length - 1;

function checkAnswer(answer){
  if( answer == questions[runningQuestion].correct){
      // answer correct
      score++;
      // change progress -> green
      answerIsCorrect();
  }else{
      // answer wrong
      // change progress -> red
      answerIsWrong();
  }
  count = 0;
  if(runningQuestion < lastQuestion){
      runningQuestion++;
      renderQuestion();
  }else{
      // end quiz and show score
      clearInterval(TIMER);
      scoreRender();
  }
}

  start.addEventListener("click", startQuiz);

function startQuiz(){
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter,1000); // 20000ms = 20s
};

function scoreRender(){
  scoreDiv.style.display = "block";
  // calculates amount of question percent answered by user
  const scorePerCent = Math.round(100 * score/questions.length);
  
  // choose image based on scorePerCent
  let img =
            (scorePerCent >= 90) ? "bilder/emotionen/90.png" :
            (scorePerCent >= 75) ? "bilder/emotionen/75.jpg" :
            (scorePerCent >= 50) ? "bilder/emotionen/50.jpg" :
            (scorePerCent >= 25) ? "bilder/emotionen/25.png" :
            "bilder/emotionen/0.jpg";
  
  scoreDiv.innerHTML = "<img src="+ img +">";
  scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

