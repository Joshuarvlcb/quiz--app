"use strict";
const options = { options: Array.from(document.querySelectorAll(".answer")) };
const grid = document.querySelector(".question-grid");
const container = document.querySelector(".questions-container");
const styleBorder = document.querySelector(".style-border");
let selected = [];
let submitState = false;

const clickStyle = function (e) {
  if (submitState == false) {
    $(".style-border").removeClass("style-border");
    $(this).addClass("style-border");
    selected.push(this);
  } else {
    return;
  }
};

const question1 = {
  question1: "What was the third plague of Egypt?",
  options: ["mosquitos", "flys", "frogs", "mice"],
  correct: "mosquitos",
};
const question2 = {
  question1: "Who conquered the Babylon in 538 BC.?",
  options: [
    "Cyrus the Great",
    "Alexander the Great",
    "Nebuchadnezzar",
    "Moses",
  ],
  correct: "Cyrus the Great",
};
const question3 = {
  question1: "Who was the first son of Abraham?",
  options: ["Isaiah", "Isaac", "Ishmael", "Obed"],
  correct: "Ishmael",
};
const question4 = {
  question1: "Who joined the Apostles after Judas betrayal to Jesus?",
  options: ["Pablo", "Lucas", "Peter", "Matthias"],
  correct: "Matthias",
};
const question5 = {
  question1: "what miracle od jesus is reported in all four gospels",
  options: [
    "The feeding of 5000 people",
    "Walking on water",
    "Turing water into wine",
    "Turining rocks into bread",
  ],
  correct: "The feeding of 5000 people",
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

const timer = document.getElementById("time");
const progressBar = document.querySelector(".progress");
let sixtySec;
const timerSixtySec = function (time) {
  sixtySec = setInterval(countDown, 1000);
  function countDown() {
    timer.textContent = time;
    time--;
    if (time >= 0) timer.textContent = time;

    if (time < 5) {
      timer.style.color = "red";
    }
    if (time <= 0) {
      clearInterval(sixtySec);
      correctAnswer22.innerHTML += `<ion-icon name="checkmark-circle-outline"></ion-icon>`;
      // answers[0].style.borderColor = '#a9d6ff'
      correctAnswer22.style.backgroundColor = "#73c58b";
      submit.classList.add("none");
      nxt.classList.remove("none");
    }
    if (questOf == 5) {
      nxt.classList.add("none");
    }
    if (submitState == true) {
      clearInterval(sixtySec);
    }
  }
};
let progress = 0;
const progressBarTimer = function (seconds) {
  const progressBarWidth = setInterval(function () {
    progress++;
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
    }
  }, (1000 * seconds) / 100);
};

function answer(currentAnswer) {
  return quizData[currentAnswer].correct;
}
const whichQuest = document.getElementById("whichQuest");
const nxt = document.getElementById("nxt");
const submit = document.querySelector(".check");

const answersArr = quizData.map((curr) => {
  return curr.correct;
});
let correctAnswers = 0;
let currentAns = 0;
const answersCurrent = function (element) {
  return answersArr[element];
};

let correctAnswer22;

let clicked;
let previous = [];
submit.addEventListener("click", () => {
  optionArr.forEach((curr) => {
    if (curr.classList.contains("style-border")) {
      clicked = curr;
      previous.push(curr);
    }
  });

  console.log(optionArr);
  if (selected.length >= 1) {
    submitState = true;
    submit.classList.add("none");
    nxt.classList.remove("none");
    if (answer(currentAnswer) == clicked.innerText) {
      clicked.style.backgroundColor = "#73c58b";
      clicked.style.borderColor = "#a9d6ff";
      clicked.innerHTML += `<ion-icon  name="checkmark-circle-outline" ></ion-icon>`;
      correctAnswers++;
      selected = [];
    } else {
      clicked.style.backgroundColor = "#F2D5DB";
      clicked.style.borderColor = "#a9d6ff";
      clicked.innerHTML += `<ion-icon name="close-circle-outline"></ion-icon>`;
      selected = [];
      //  answersCurrent(currentAns).innerHTML += `<ion-icon  name="checkmark-circle-outline"></ion-icon>`
      //   // answers[0].style.borderColor = '#a9d6ff'
      //   answersCurrent(currentAns).style.backgroundColor = '#73c58b'
    }
  }
});

const resultsBtn = document.getElementById("results");
const restartBtn = document.getElementById("restart");
let timeValue = 15;
nxt.addEventListener("click", function () {
  clearState();
  submit.classList.remove("none");
  nxt.classList.add("none");
  timer.style.color = "white";
  progressBar.style.backgroundColor = "#0079fe";
  question.textContent = newQuest(questionIndex + 1);
  progress = 0;
  timer.textContent = 15;
  progressBar.style.width = progress;
  questionIndex++;
  currentAns++;
  currentAnswer++;

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
    nxt.classList.add("none");
    resultsBtn.classList.remove("none");
  }

  options.options.forEach((curr, i) => {
    newOption = document.createElement("DIV");
    newOption.classList.add("answer");
    newOption.textContent = newPage(questionIndex)[i];
    questionGrid.appendChild(newOption);
    optionArr.push(newOption);
    newOption.addEventListener("click", clickStyle);
  });
  optionArr.forEach((curr) => {
    if (curr.textContent == answer(currentAnswer)) {
      correctAnswer22 = curr;
    }
  });
  submitState = false;
  progressBarTimer(15);
  clearInterval(sixtySec);
  timerSixtySec(timeValue);
});

const resultsContainer = document.getElementById("results-container");
const resultsSpanElement = document.getElementById("grade");
resultsBtn.addEventListener("click", function () {
  optionArr.forEach((curr) => {
    if (curr.classList.contains("style-border")) {
      clicked = curr;
    }
  });
  if (selected.length >= 1) {
    submitState = true;
    if (clicked.textContent == answersArr[4]) correctAnswers++;

    container.classList.add("none");
    resultsContainer.classList.remove("none");
    resultsSpanElement.textContent = correctAnswers;
  }
});
let newOption;
let optionArr = [];

const questionGrid = document.querySelector(".question-grid");
function start() {
  clearState();
  questOf = 1;
  quest = 0;
  submitState = false;
  questionIndex = 0;
  currentAns = 0;
  currentAnswer = 0;
  selected = [];
  timer.style.color = "white";
  correctAnswers = 0;
  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor = `#0079fe`;
  timer.textContent = 15;

  selected.innerHTML = "";
  whichQuest.innerText = questOf;
  question.textContent = newQuest(quest);
  resultsBtn.classList.add("none");
  submit.classList.remove("none");

  options.options.forEach((curr, i) => {
    newOption = document.createElement("DIV");
    newOption.classList.add("answer");
    newOption.textContent = newPage(questionIndex)[i];
    questionGrid.appendChild(newOption);
    optionArr.push(newOption);
    newOption.addEventListener("click", clickStyle);
  });
  optionArr.forEach((curr) => {
    if (curr.textContent == answer(currentAnswer)) {
      correctAnswer22 = curr;
    }
  });
  console.log(correctAnswer22);
  progressBarTimer(15);
  timerSixtySec(15);
}
start();

function clearState() {
  while (questionGrid.firstChild) {
    questionGrid.removeChild(questionGrid.firstChild);
  }
}

restartBtn.addEventListener("click", function () {
  container.classList.remove("none");
  resultsContainer.classList.add("none");

  start();
});
