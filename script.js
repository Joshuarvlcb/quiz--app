"use strict";
const options = { options: Array.from(document.querySelectorAll(".answer")) };
const grid = document.querySelector(".question-grid");
const container = document.querySelector(".questions-container");
let selected = [];
const clickStyle = function (e) {
  if (this.style.borderColor == "") {
    this.style.borderColor = "#0079fe";
    selected.push(this);
  } else {
    this.style.borderColor = "";
    selected.pop();
  }
  console.log(selected);
};
options.options.forEach((curr, i) => {
  curr.addEventListener("click", clickStyle);
});
//getting the answers
const question1 = {
  question1: "Cuantos hijos tuvo Abraham?",
  options: [4, 6, 7, 8],
  correct: 8,
};
const question2 = {
  question1: "Quien lucho con un angel?",
  options: ["Moises", "Josue", "Samuel", "Ismael"],
  correct: "Ismael",
};
const question3 = {
  question1: "Quien lucho contra un leon?",
  options: ["Jacob", "David", "Sanson", "Obed"],
  correct: "Sanson",
};
const question4 = {
  question1: "Quien era la primera persona que Jesus Resucito?",
  options: ["Daniel", "Marta", "Eunice", "Lazaro"],
  correct: "Lazaro",
};
const question5 = {
  question1: "Quien queria matar a David",
  options: ["Felipe", "Mateo", "Saul", "Goliat"],
  correct: "Saul",
};
const quizData = [question1, question2, question3, question4, question5];

quizData.forEach((curr, i) => {
  curr.options.sort(() => Math.random() - 0.5);
});
const newQuest = function (questionIndex) {
  return quizData[questionIndex].question1;
};

let questionIndex = 0;
let quest = 0;
let questOf = 1;
const question = document.querySelector(".question");

const newPage = function (nextQuestIndex) {
  return quizData[nextQuestIndex].options;
};

let currentAnswer = 0;

let answers = [];
options.options.forEach((curr, i, arr) => {
  // if(curr.innerText == answer(currentAnswer)){
  //   console.log('corr')
  // }
  console.log(curr.innerText);
});
console.log(answer(currentAnswer));
//set up the timer
const timer = document.getElementById("time");
let counter = 30;
const progressBar = document.querySelector(".progress");

const timerSixtySec = function (seconds) {
  let sixtySec = setInterval(function () {
    counter--;
    timer.textContent = counter;
    if (counter < 10) {
      timer.style.color = "red";
    }
    if (counter <= 0) {
      clearInterval(sixtySec);
      answers[0].innerHTML += `<ion-icon  name="checkmark-circle-outline"></ion-icon>`;
      // answers[0].style.borderColor = '#a9d6ff'
      answers[0].style.backgroundColor = "#73c58b";
      submit.classList.add("none");
      nxt.classList.remove("none");
    }
    if (submitState == true) {
      clearInterval(sixtySec);
    }
  }, 1000 * seconds);
};
let progress = 0;
const progressBarTimer = function (seconds) {
  const progressBarWidth = setInterval(function () {
    progressBar.style.transition = `all .5s linear`;

    progress++;
    console.log(progress);
    if (progress >= 0) {
      progressBar.style.width = `${progress}%`;
    }
    if (progress >= 80) {
      progressBar.style.backgroundColor = "red";
    }
    if (progress >= 100) {
      clearInterval(progressBarWidth);
    }
    if (submitState == true) {
      clearInterval(progressBarWidth);
      progressBar.style.transition = `all .05s linear`;
    }
  }, (1000 * seconds) / 100);
};
//create a submit click event and check to see if only one option selected if so allow submit and if no options are selected
//you arent allowed to move on
let submitState = false;
//have a state variable to keep track if we click or unclick one
function answer(currentAnswer) {
  return quizData[currentAnswer].correct;
}
//check if user got the correct answer if so change the background to green
const whichQuest = document.getElementById("whichQuest");
const nxt = document.getElementById("nxt");
const submit = document.querySelector(".check");
//fix the next button only can choose next once
//make a answers array and store all the answers in blocks and with a function compare selcted
//with current answer
// const answers = function(currAnswer){
//   return
// }

//make a results button event handler
/*
whenever submit is clicked check to see of only one is selected
//hide the quiz and display a new box same size in the middle
its going to gives us a grade based on how many we got right
 
 
*/
const answersArr = quizData.map((curr) => {
  return curr.correct;
});
let correctAnswers = 0;
let currentAns = 0;
console.log(answersArr);
const answersCurrent = function (element) {
  return answersArr[element];
};
console.log(answersArr);
submit.addEventListener("click", () => {
  if (selected.length == 1) {
    submitState = true;

    submit.classList.add("none");
    nxt.classList.remove("none");

    removeEventListener("click", clickStyle);
    if (answer(currentAnswer) == selected[0].innerText) {
      selected[0].style.backgroundColor = "#73c58b";
      selected[0].style.borderColor = "#a9d6ff";
      selected[0].innerHTML += `<ion-icon  name="checkmark-circle-outline" ></ion-icon>`;
      correctAnswers++;
      selected = [];
    } else {
      selected[0].style.backgroundColor = "#F2D5DB";
      selected[0].style.borderColor = "#a9d6ff";
      selected[0].innerHTML += `<ion-icon name="close-circle-outline"></ion-icon>`;
      //  answersCurrent(currentAns).innerHTML += `<ion-icon  name="checkmark-circle-outline"></ion-icon>`
      //   // answers[0].style.borderColor = '#a9d6ff'
      //   answersCurrent(currentAns).style.backgroundColor = '#73c58b'

      selected = [];

      //highlight the correct one
    }
  }
});

//if we are on the 5th question we want to add a results btn

const resultsBtn = document.getElementById("results");
const restartBtn = document.getElementById("restart");

nxt.addEventListener("click", function () {
  submit.classList.remove("none");
  nxt.classList.add("none");
  options.options.forEach((curr, i) => {
    if (curr.textContent == answersArr[i]) {
      answers.push(curr);
    }
  });
  timer.style.color = "white";
  progressBar.style.backgroundColor = "#0079fe";

  console.log(answers);

  submitState = false;
  questionIndex++;
  currentAns++;
  currentAnswer++;
  progress = 0;
  progressBar.style.width = `${progress}%`;
  counter = 30;
  timer.textContent = counter;
  timerSixtySec(1);
  progressBarTimer(30);

  if (quest < 4) {
    questOf++;
  }

  options.options.forEach((curr) => {
    curr.style.backgroundColor = "#eff8ff";
  });

  quest++;
  whichQuest.innerText = questOf;

  if (questOf == 5) {
    submit.classList.add("none");
    resultsBtn.classList.add("none");
    resultsBtn.classList.remove("none");
  }

  question.textContent = newQuest(quest);
  options.options.forEach((curr, i) => {
    curr.textContent = "";

    curr.textContent = newPage(questionIndex)[i];
  });
});

const resultsContainer = document.getElementById("results-container");
const resultsSpanElement = document.getElementById("grade");
resultsBtn.addEventListener("click", function () {
  if (selected.length == 1) {
    if (selected[0].textContent == answersArr[4]) correctAnswers++;

    container.classList.add("none");
    resultsContainer.classList.remove("none");
    resultsSpanElement.textContent = correctAnswers;
  }
});

// i need to stop the the submit button of there is no option selected
//i need to loop through all the naswers and increment each answer when we next

function start() {
  questOf = 1;
  quest = 0;
  submitState = false;
  questionIndex = 0;
  currentAns = 0;
  currentAnswer = 0;
  progress = 0;
  progressBar.style.width = `${progress}%`;
  counter = 30;
  timer.textContent = counter;
  whichQuest.innerText = questOf;

  question.textContent = newQuest(quest);
  resultsBtn.classList.add("none");
  submit.classList.remove("none");
  timer.textContent = 30;
  timerSixtySec(1);
  progressBarTimer(30);
  let newValues = options.options.map((curr) => {
    options.options.forEach((curr, i) => {
      curr.textContent = newPage(questionIndex)[i];
      return (curr.textContent = newPage(questionIndex)[i]);
    });
  });
  return newValues;
}
start();
options.options.forEach((curr) => {
  if (curr.textContent == answer(currentAnswer)) {
    answers.push(curr);
  }
});
console.log(options.options[0].textContent);
//create the submit

//create next page

//check results
restartBtn.addEventListener("click", function () {
  container.classList.remove("none");
  resultsContainer.classList.add("none");
  start();
});

// restartBtn.addEventListener('click')
