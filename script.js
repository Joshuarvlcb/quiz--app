"use strict";
const options = { options: Array.from(document.querySelectorAll(".answer")) };
const grid = document.querySelector(".question-grid");
const container = document.querySelector(".questions-container");
const styleBorder = document.querySelector(".style-border");
let selected = [];
let submitState = false;


  grid.addEventListener('click', function(e){
    selected.forEach(curr => {
      curr.classList.remove('style-border')
    })
      if(e.target.classList.contains('answer')){
      if (submitState == false) {

      e.target.classList.add('style-border')
      console.log(e.target)
      selected.push(e.target);
    }
  }
  })

class Question {
  constructor(question,options,correct){
    this.question1 = question
    this.options = options
    this.correct = correct
  }
}
const [question1,question2,question3] = [new Question('Quien era el primer hijo de Abraham',['isac','israel','ismael','david'],'ismael'),new Question("Quien conquisto babylonia?",[
  "Ciro",
  "Los romanos",
  "Moises",
  "Saul",
],'Ciro'
),new Question('Quien se hiso decipulo cuando jesus murio?', ["Pablo", "Lucas", "Pedro", "Matias"],'Matias')]



// const question5 = {
//   question1: "what miracle of jesus is reported in all four gospels",
//   options: [
//     "The feeding of 5000 people",
//     "Walking on water",
//     "Turing water into wine",
//     "Turining rocks into bread",
//   ],
//   correct: "The feeding of 5000 people",
// };
// const question4 = {
//   question1:
//     "What is the only book of the Bible that does not contain the word God?",
//   options: ["Ruth", "Esther", "John", "Joshua"],
//   correct: "Esther",
// };
const question4 = {
  question1: "Cuantos Hermanos tuvo Jesus?",
  options: [2, 5, 6, 4],
  correct: 4,
};
const question5 = {
  question1: "Cuantos anos vivio Matusalén",
  options: [969, 957, 934, 856],
  correct: 969,
};
// const question9 = {
//   question1: "How many books are there in the Old Testament?",
//   options: [41, 37, 39, 33],
//   correct: 39,
// };
// const question10 = {
//   question1: "What is the shortest book of the Bible?",
//   options: ["Titus", "2 John", "Philemon", "Jude"],
//   correct: "Jude",
// };
const quizData = [
  question1,
  question2,
  question3,
  question4,
  question5,

];

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
      submitState = true
      clearInterval(sixtySec);
      correctAnswer22.innerHTML += `<ion-icon name="checkmark-circle-outline"></ion-icon>`;
      // answers[0].style.borderColor = '#a9d6ff'
      correctAnswer22.style.backgroundColor = "#73c58b";
      if (questOf !== 10) {
        submit.classList.add("none");
        nxt.classList.remove("none");
      }
    }

    if (submitState == true) {
      clearInterval(sixtySec);
    }
  }
};
let progress = 0;
let progressBarWidth;
const progressBarTimer = function (seconds) {
  progressBarWidth = setInterval(function () {
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
      clicked.style.borderColor = "pink";
      clicked.innerHTML += `<ion-icon name="close-circle-outline"></ion-icon>`;
      selected = [];
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
  quest++;

  if (quest < 10) {
    questOf++;
  }
  whichQuest.textContent = questOf;

  options.options.forEach((curr) => {
    curr.style.backgroundColor = "#eff8ff";
  });

  if (questionIndex == 4) {
    resultsBtn.classList.remove("none");
    submit.classList.add("none");
    nxt.classList.add("none");
  }

  options.options.forEach((curr, i) => {
    newOption = document.createElement("DIV");
    newOption.classList.add("answer");
    newOption.textContent = newPage(questionIndex)[i];
    questionGrid.appendChild(newOption);
    optionArr.push(newOption);

  });
  optionArr.forEach((curr) => {
    if (curr.textContent == answer(currentAnswer)) {
      correctAnswer22 = curr;
    }
  });

  clicked.innerHTML = "";
  submitState = false;
  clearInterval(progressBarWidth);
  progressBarTimer(15);
  clearInterval(sixtySec);
  timerSixtySec(timeValue);
});

const resultsContainer = document.getElementById("results-container");
const resultsSpanElement = document.getElementById("grade");
const textResults = document.querySelector(".text");
resultsBtn.addEventListener("click", function () {
  optionArr.forEach((curr) => {
    if (curr.classList.contains("style-border")) {
      clicked = curr;
    }
  });
  if (clicked.textContent == answersArr[4]) {
    correctAnswers++;
  }
  if (selected.length >= 1) {
    container.classList.add("none");
    resultsContainer.classList.remove("none");
    resultsSpanElement.textContent = correctAnswers;
    submitState = true;

    if (correctAnswers <= 5) {
      textResults.innerHTML = `You need to study the bible more`;
    } else {
      textResults.innerHTML = `Wow your an expert &#129299`;
    }
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
  progressBar.style.backgroundColor = `#0079fe`;
  timer.textContent = 15;
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
  });
  optionArr.forEach((curr) => {
    if (curr.textContent == answer(currentAnswer)) {
      correctAnswer22 = curr;
    }
  })
  progressBarTimer(15);
  timerSixtySec(15);
}

function clearState() {
  while (questionGrid.firstChild) {
    questionGrid.removeChild(questionGrid.firstChild);
  }
}

restartBtn.addEventListener("click", function () {
  container.classList.remove("none");
  resultsContainer.classList.add("none");
  progress = 0;
  progressBar.style.width = `${progress}%`;
  textResults.innerHTML = "";
  clearInterval(timerSixtySec);
  clearInterval(progressBarWidth)
  start();
});
const continueElement = document.getElementById("continue");
const startingContainer = document.querySelector(".rules-container");

continueElement.addEventListener("click", function () {
  continueElement.classList.add("none");
  startingContainer.classList.add("none");
  container.classList.remove("none");

  start();
});
