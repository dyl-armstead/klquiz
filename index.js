//question db

// index correct answer as index # instead 
// submit button should be fun

const STORE = [
    {
        question: 'Kendrick Lamar’s parents were from Chicago, but what city was he born and raised in?',
        answers: [
            "Irvine, CA" , 
            "Chicago, IL", 
            "Seattle, WA", 
            "Compton, CA"
        ],
        correctAnswer: "Compton, CA"
    },
    {
        question: 'Kendrick Lamar’s real name is “Kendrick Lamar Duckworth” but he goes by the shortened version musically. What was Lamar’s rapper name before his current?',
        answers: [
            "KLD" , 
            "K-Dot", 
            "Kungfu Kenny", 
            "Cornrow Kenny"
        ],
        correctAnswer: "K-Dot"
    },
    {
        question: 'Kendrick Lamar has 3 full length conceptual albums; which of these projects by Lamar is not one of those albums?',
        answers: [
            "DAMN." , 
            "To Pimp a Butterfly", 
            "Section.80", 
            "Good Kid, M.A.A.D City"
        ],
        correctAnswer: "Section.80"
    },
    {
        question: 'While all of Lamar’s albums have received praise from his fans, only one has received a Pulitzer Prize for Music? Which album received this award?',
        answers: [
            "To Pimp a Butterfly" , 
            "Good Kid, M.A.A.D City", 
            "DAMN.", 
            "None, Kendrick has not won a Pulitzer Prize"
        ],
        correctAnswer: "DAMN."
    },
    {
        question: 'The label Kendrick Lamar is a part of, Top Dawg Entertainment, is the home of many prominent musical artists. Which of these artists is not a part of Top Dawg Entertainment?',
        answers: [
            "J. Cole" , 
            "SZA", 
            "Reason", 
            "Schoolboy Q"
        ],
        correctAnswer: "J. Cole"
    }
];

//variables for keeping score and question number

let score = 0;
let questionNumber = 0;


//functions for updating page
//function to display question generateQuestion()
function displayQuestion() {
    if (questionNumber < STORE.length) {
        return createQuizQuestion(questionNumber) 
    } else {
        $('.quizQuestionBox').hide();
        finalTally();
        $('.questionNumber').text(5);
    }
    console.log('displayQuestion ran')
}

//function to update score when correct

function updateScore() {
    score++;
    $('.scoreNumber').text(score)
    console.log('updateScore ran')
}

//function to update current question number

function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1)
    console.log('updateQuestionNumber ran')
}

//function to restart quiz

function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.scoreNumber').text(0);
    $('.questionNumber').text(0);
  }

//function to render STORE values

function renderQuizContent() {
    console.log('`renderQuizContent` ran');
    const quizContent = STORE;
}

//functions for updating quizBox
// starts quiz
function startQuiz(){
    $('.hideBox').hide();
    $('.quizStart').on('click', '.startButton', function() {
        $('.quizStart').hide();
        $('.questionNumber').text(1);
        $('.quizQuestionBox').show();
        $('.quizQuestionBox').prepend(displayQuestion());
        console.log('startButton ran');
    });

};

//creates html for question form
// createThing 
function createQuizQuestion(questionIndex) {
    console.log('createQuizQuestion ran');
    let questionForm = $(`<form>
        <fieldset>
            <legend class="questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`)

    let fieldSelect = $(questionForm).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex){
        $(`<label class="questionAndScore" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span><br>
      </label>
      `).appendTo(fieldSelect);
    });

    $(`<button type="submit" class="submitButton button">Check your answer</button > `).appendTo(fieldSelect);
  return questionForm;

}

//submits a chosen answer and checks it against the correct answer
function submitAnswer() {
    $('.mainContainer').on('submit', function (event) {
      event.preventDefault();
      $('.hideBox').hide();
      $('.checkBox').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
    console.log('submitAnswer ran')
  }


//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
    $('.checkBox').html(
      `<h3 class="correctHeading">Good answer Kid!</h3>
      <img src="images/GKMC-cover-art.jpg" alt="good kid maad city cover" class="checkImg">
        <p class="questionAndScore checkText">Keep it up fam!</p>
        <button type="button" class="nextButton button">Next one</button>`
    );
    updateScore();
    console.log('correctAnswer ran')
    console.log(score);
  }


//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
    $('.checkBox').html(
      `<h3 class="incorrectHeading">That's the wrong answer...</h3>
      <img src="images/kendrick-damn-shirt.jpg" alt="dissappointed kendrick" class="checkImg">
      <p class="questionAndScore checkText">It's actually:</p>
      <p class="questionAndScore checkText">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next one</button>`
    );
    console.log('wrongAnswer ran')
    console.log(score);
  }

//generates the next question
function nextQuestion() {
    $('.mainContainer').on('click', '.nextButton', function (event) {
      $('.hideBox').hide();
      $('.quizQuestionBox').show();
      updateQuestionNumber();
      $('.quizQuestionBox form').replaceWith(displayQuestion());
    });
    console.log('nextQuestion ran')
  }

//tally final score and comment at the end of the quiz
function finalTally() {
    console.log('finalTally ran');
    console.log(score);
    $('.quizFinal').show();
  
    const perfect = [
      'Damn, you really know Kendrick!',
      'images/smiling-kendrick.png',
      'Kendrick is smiling at you!',
      'K-dot would be proud!'
    ];
  
    const good = [
      "Good try kid, don't be too M.A.A.D",
      'images/sad-kendrick.jpg',
      'Kendrick is looking at you with hesitation.',
      'Keep researching Kendrick and try again!'
    ];
  
    const bad = [
      'Never heard of Kendrick Lamar?',
      'images/side-eye-kendrick.jpg',
      'Kendrick is giving you the side-eye.',
      'I would recommend listening to his music, then trying again.'
    ];
  
    if (score === 5) {
        array = perfect;
    } else if (score <= 4 && score >=2){
        array = good;
    } else {
        array = bad;
    }
    return $('.quizFinal').html(
      `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is: ${score} / 5</h3>
          <p>${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }

//takes user back to the start page
function restartQuiz() {
    $('.mainContainer').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.hideBox').hide();
      $('.quizStart').show();
    });
  }


function makeQuiz() {
    startQuiz();
    displayQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
 }


$(makeQuiz);



//This should hide or replace the previous page with information for the first quiz question
//On the first quiz question, a user should be required to submit an answer to proceed
//Upon submit, the user's answer should be checked, if correct they will see a correct page, if not they will see an incorrect page
//After seeing correct or incorrect page, clicking "next" should take them to the next question
//On the last correct/incorrect page, the user should be taken to the final page.
//This final page should have a tally of the amount of answers correct and some other text based on amount right
//This final page should have a restart button that will allow the person to go back to the beginning of the quiz with cleared results
