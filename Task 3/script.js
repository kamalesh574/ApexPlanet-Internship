document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initJokeAPI();
});

// --- Quiz Logic ---
const quizData = [
    {
        question: "Which of the following is used to style a webpage?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Text Multiple Language", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { text: "fgcolor", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "class", correct: false },
            { text: "font", correct: false },
            { text: "styles", correct: false },
            { text: "style", correct: true }
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<scripting>", correct: false },
            { text: "<script>", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function initQuiz() {
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartBtn.addEventListener('click', startQuiz);
}

function startQuiz() {
    document.getElementById('quiz-setup').classList.remove('active');
    document.getElementById('quiz-results').classList.remove('active');
    document.getElementById('quiz-active').classList.add('active');
    
    currentQuestionIndex = 0;
    score = 0;
    updateScoreTracker();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(quizData[currentQuestionIndex]);
    document.getElementById('question-tracker').innerText = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
}

function showQuestion(question) {
    const questionElement = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');

    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.add('hide');
    const answerButtonsElement = document.getElementById('answer-buttons');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        updateScoreTracker();
    }
    
    setStatusClass(selectedButton, correct);

    const answerButtonsElement = document.getElementById('answer-buttons');
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true; // Disable all buttons after choice
    });

    if (quizData.length > currentQuestionIndex + 1) {
        document.getElementById('next-btn').classList.remove('hide');
    } else {
        setTimeout(showResults, 1500); // Small delay before showing results
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function updateScoreTracker() {
    document.getElementById('score-tracker').innerText = `Score: ${score}`;
}

function showResults() {
    document.getElementById('quiz-active').classList.remove('active');
    document.getElementById('quiz-results').classList.add('active');
    document.getElementById('final-score').innerText = `Your score is: ${score}/${quizData.length}`;
}

// --- API Logic ---
async function initJokeAPI() {
    const fetchJokeBtn = document.getElementById('fetch-joke-btn');
    fetchJokeBtn.addEventListener('click', fetchJoke);
    
    // Fetch initial joke
    fetchJoke();
}

async function fetchJoke() {
    const jokeSetup = document.getElementById('joke-setup');
    const jokePunchline = document.getElementById('joke-punchline');
    const btn = document.getElementById('fetch-joke-btn');

    btn.disabled = true;
    btn.innerText = "Fetching...";
    jokePunchline.classList.remove('show');
    
    try {
        jokeSetup.innerText = "Loading a joke...";
        jokePunchline.innerText = "";
        
        // Fetch from Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        
        jokeSetup.innerText = data.setup;
        jokePunchline.innerText = data.punchline;
        
        // Small delay before showing punchline for comedic effect
        setTimeout(() => {
            jokePunchline.classList.add('show');
        }, 800);

    } catch (error) {
        jokeSetup.innerText = "Oops! Failed to fetch a joke.";
        jokePunchline.innerText = "Try again later!";
        jokePunchline.classList.add('show');
        console.error("Error fetching joke:", error);
    } finally {
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = "Get Another Joke";
        }, 1500);
    }
}
