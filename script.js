const questions = [
    { 
	question: "What is the 1+0?",      
  options: [
            "G", 
            "8", 
            "Y", 
            "1"
        ], 
        answer: "1"
    },
    { 
        question: "What is the capital of France?", 
        options: ["Paris", "London", "Berlin", "Madrid"], 
        answer: "Paris" 
    },
    { 
        question: "What is 5 + 3?", 
        options: ["5", "8", "12", "15"], 
        answer: "8" 
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        options: ["Earth", "Mars", "Jupiter", "Venus"], 
        answer: "Mars" 
    },
    { 
        question: "What is the largest ocean on Earth?", 
        options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
        answer: "Pacific" 
    },
    { 
        question: "What is the chemical symbol for gold?", 
        options: ["Au", "Ag", "Pb", "Fe"], 
        answer: "Au" 
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 25;
let totalTimeSpent = 0; // Variable to track total time spent
const totalAllowedTime = questions.length * 25; // Total allowed time for the quiz

function loadQuestion() {
    resetTimer();
    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionObj.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 25; // Reset time for each question
    document.getElementById("time").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            totalTimeSpent += 25; // Add the full time for the question if time runs out
            checkAnswer(""); 
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const optionsContainer = document.getElementById("options");
    const buttons = optionsContainer.getElementsByTagName("button");

    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
        totalTimeSpent += (25 - timeLeft); // Add the time spent on the question
        nextQuestion(); // Move to the next question if the answer is correct
    } else {
        for (let button of buttons) {
            if (button.innerText === selectedOption) {
                button.classList.add("incorrect");
                setTimeout(() => {
                    button.classList.remove("incorrect");
                }, 1000);
            }
        }
    }

    // If the time runs out, we need to show the correct answer and move to the next question
    if (timeLeft <= 0) {
        // Show the correct answer (optional)
        for (let button of buttons) {
            if (button.innerText === correctAnswer) {
                button.classList.add("correct"); // You can add a class to highlight the correct answer
            }
        }
        setTimeout(() => {
            nextQuestion(); // Move to the next question after a delay
        }, 1000); // Delay to allow the user to see the correct answer
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function resetTimer() {
    clearInterval(timer);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("question-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your final score is: ${score}/${questions.length}</p>
        <p>Total time taken: ${totalTimeSpent} seconds out of ${totalAllowedTime} seconds</p>
    `;
}

// Load the first question when the page loads
loadQuestion();