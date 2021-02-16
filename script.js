"use strict";
const options = Array.from(document.querySelectorAll(".answer"));
const grid = document.querySelector(".question-grid");
let selected = "";
options.forEach((curr, i) => {
  curr.addEventListener("click", function (e) {
    if (curr.style.borderColor == "") {
      curr.style.borderColor = "#0079fe";
      selected = curr;
    } else {
      curr.style.borderColor = "";
      selected = "";
    }
    console.log(selected);
  });
});
const question1 = {
  question1: "Cuantos hijos tuvo Abraham?",
  options: [4, 6, 7, 8],
  correct: 8,
};

const quizData = [question1];

quizData.forEach((curr, i) => {
  curr.options.sort(() => Math.random() - 0.5);
});

let nextQuest;
const question = document.querySelector(".question");
document.addEventListener("DOMContentLoaded", () => {
  question.textContent = question1.question1;
  timerSixtySec();
  options.forEach((curr, i) => {
    curr.textContent = quizData[0].options[i];
  });
});
const newPage = function () {
  timerSixtySec();
};
//set up the timer
const timer = document.getElementById("time");
let counter = 60;
const timerSixtySec = function () {
  let sixtySec = setInterval(function () {
    counter--;
    timer.textContent = counter;
    if (counter < 10) {
      timer.style.color = "red";
    }
    if (counter <= 0) {
      clearInterval(sixtySec);
      //   nextpage();
    }
  }, 100);
};
//create a submit click event and check to see if only one option selected if so allow submit and if no options are selected
//you arent allowed to move on

//have a state variable to keep track if we click or unclick one

//check if user got the correct answer if so change the background to green

const submit = document.querySelector(".check");
submit.addEventListener("click", () => {
  if (selected.length === 1) {
    if (question1.correct == selected[selected.indexOf(8)]) {
      console.log("correct");
    } else {
      console.log("incorect");
    }
  }
});
