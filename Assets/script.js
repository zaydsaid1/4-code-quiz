var body = document.body;

// target start button
const startButton = document.getElementById("start-btn");

// target banner section
const bannerSection = document.getElementById("banner");

// target main element
const mainElement = document.getElementById("main");
// Selects element by class
var timeEl = document.querySelector("#time");

var timer = document.querySelector(".timer");
var score = 0;

var FullnameContainer = document.getElementById("full-name")
var scoreContainer = document.getElementById("score-number")
var highscore = document.getElementById("highscore")
var timeValue = 60

var timeInterval = null;

// current question index
let questionIndex = 0;

// all options
const options = ["false", "true"];

// all questions array
const questions = [
  {
    text: "javascript must be in the< body > tag to work:",
    options,
    correctAnswer: "true",
  },
  {
    text: "We can find errors in code only when we test the program",
    options,
    correctAnswer: "false",
  },
  {
    text: "An error in code is known as a bug",
    options,
    correctAnswer: "true",
  },
  {
    text: ">= stands for not equal to",
    options,
    correctAnswer: "false",
  },
  {
    text: "An if statement must have an else clause attached",
    options,
    correctAnswer: "false",
  },
  {
    text: "two or more conditions can be added using && and ||",
    options, 
    correctAnswer: "true",
  },
  {
    text: "two or more conditions can be added using && and ||",
    options, 
    correctAnswer: "true",
  },
  {
    text: "prompt, parseInt and document.write are keywords we use to function something in javascript",
    options, 
    correctAnswer: "true",
  },
  {
    text: "% is a valid mathematical operator",
    options, 
    correctAnswer: "true",
  },
  {
    text: "document.write(sum=a+b ) is a valid javascript statement.",
    options, 
    correctAnswer: "false",
  }

];

// event handler function to handle click events in question section
const handleOptionClick = (event) => {
  console.log("clicked somewhere in question section");

  // get current target

  // get target
  const target = event.target;

  // check if click originates from li only
  // check if target element is li element
  if (target.tagName === "LI") {
    // get the option the user clicked on
    const value = target.getAttribute("data-value");

    // get the question the user answered
    const question = questions[questionIndex].text;

    // build an answer object that contains question and answer
    console.log(value)
    if(value === "true"){
      score++;
    } else if (value === "false"){
      timeValue -= 10;
      clearInterval(startTime);
    }

    const result = {
      question,
      value
    };
    console.log();
    
    // store answer in local storage
    localStorage.setItem("score", JSON.stringify(score));

    // remove question
    removeQuestion();

    if (questionIndex < questions.length - 1) {
      // go to next question if not the last question
      // increment the question index by 1
      questionIndex += 1;

      // render question
      renderQuestion();
    } else {
      // if last question then render results and remove timer
      removeTimer();
      renderResults();
      renderForm();
    }
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  // get full name from input
  
  const fullName = document.getElementById("full-name").value;
 console.log(fullName);
  // validate
  if (fullName !== '' ){
    // if valid then store feedbackResults in LS
    const score = JSON.parse(localStorage.getItem("score"));
    // get the div id 
    // build object with fullName and results
    const result = {
      fullName,
      score
    };

    // push the results back to LS
    storeInLS("allResults", result);

   
    // remove form
    document.getElementById("feedback-form").remove();

    var fullNameDiv = document.createElement("div"); 
  // and give it some content 
  fullNameDiv.textContent = "Intials: " + fullName; 
  body.appendChild(fullNameDiv);
  fullNameDiv.setAttribute("class", "fullnamediv")

  var scoreNumber = document.createElement("div"); 
  // and give it some content 
  scoreNumber.textContent = "score: " + score + " out of 10"; 
  body.appendChild(scoreNumber);
  scoreNumber.setAttribute("class", "scoreNumber")

  } else {
    alert("Please enter your intials!");
  }
};


// function to render the results
const renderResults = () => {
  console.log("render results");
};

// function to render the form
const renderForm = () => {
  console.log("render form");
 
  // removeTimer();
  const section = document.createElement("section");
  section.setAttribute("class", "feedback-form-section");
  section.setAttribute("id", "feedback-form");

  const h2 = document.createElement("h2");
  h2.setAttribute("class", "title");
  h2.textContent = "Enter your Intials to view results";

  const form = document.createElement("form");

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "form-control");

  const input = document.createElement("input");
  input.setAttribute("id", "full-name");
  input.setAttribute("class", "form-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter initials here");

  inputDiv.append(input);

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "form-control");

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "btn");
  button.textContent = "Submit";

  buttonDiv.append(button);

  form.append(inputDiv, buttonDiv);

  section.append(h2, form);

  mainElement.append(section);

  // add event listener for form submission
  form.addEventListener("submit", handleFormSubmit);
};

// function to render question to page
const renderQuestion = () => {
  console.log("render question");

  
  // get current question
  const currentQuestion = questions[questionIndex];


  // create section
  const section = document.createElement("section");
  section.setAttribute("class", "content-section question-container");
  section.setAttribute("id", "question-container");

  // create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "content-section-title");
  // TODO: this should be the dynamic question title
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.text}`;

  // create ul and append 3 li
  const ul = document.createElement("ul");
  ul.setAttribute("class", "feedback-list");

  // TODO: loop over options to create and append li to ul
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-item");
  li1.setAttribute("data-value", currentQuestion.options[0]);
  li1.textContent = currentQuestion.options[0];

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-item");
  li2.setAttribute("data-value", currentQuestion.options[1]);
  li2.textContent = currentQuestion.options[1];

  ul.append(li1, li2);

  // append h2 and ul to section
  section.append(h2, ul);

  // append question section to main element
  mainElement.append(section);

  // add event listener on question section
  section.addEventListener("click", handleOptionClick);

  clearInterval(startTime);
};



// function to remove banner from page
const removeBanner = () => {
  console.log("remove banner");
  bannerSection.remove();
};

// function to remove question section from page
const removeQuestion = () => {
  console.log("remove question");
  document.getElementById("question-container").remove()
};

// function to remove timer

const removeTimer = () => {
  timer.innerHTML = ""
}

const initialiseLocalStorage = () => {
  // get feedbackResults from LS
  const feedbackResultsFromLS = JSON.parse(
    localStorage.getItem("Results")
  );

  const allResultsFromLS = JSON.parse(localStorage.getItem("allResults"));

  if (!feedbackResultsFromLS) {
    // if not exist set LS to have feedbackResults as an empty array
    localStorage.setItem("feedbackResults", JSON.stringify([]));
  }

  if (!allResultsFromLS) {
    // if not exist set LS to have feedbackResults as an empty array
    localStorage.setItem("allResults", JSON.stringify([]));
  }
};

const storeInLS = (key, value) => {
  // get feedbackResults from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));

  // push answer in to array
     arrayFromLS.push(value);

  // set feedbackResults in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};

// declare the event handler function for start button click
const handleStartButtonClick = () => {
  console.log("start button clicked");



  // initialise local storage
  initialiseLocalStorage();

  // remove banner section
  removeBanner();

  // render question
  renderQuestion();
  
  // start timer
  
  startTime();
  

};


const startTime = () => {
timeInterval = setInterval(function () {
    timeValue--;
    
    if (timeValue <= 0) {
          removeBanner();
          removeQuestion();
          renderForm();
          removeTimer(); 
          clearInterval(timeInterval);  
    }
    timeEl.textContent = timeValue
    
  },1000);
}
 

// add event listener to start button
startButton.addEventListener("click", handleStartButtonClick);