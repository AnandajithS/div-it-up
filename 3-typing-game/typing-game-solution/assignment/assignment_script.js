let questions = [
    { question: "What year did the Soviet Union dissolve?", answer: "1991" },
    { question: "Who was the first person to win two Nobel Prizes?", answer: "Marie Curie" },
    { question: "What year did the Berlin Wall fall?", answer: "1989" },
    { question: "What element has the highest melting point?", answer: "Tungsten" },
    { question: "Unicorn is the national animal of which country?", answer: "Scotland" },
    { question: "Which Indian state has the longest coastline?", answer: "Gujarat" },
    { question: "What was the first country to leave the Soviet Union?", answer: "Lithuania" },
    { question: "Which country built the first high-speed rail system?", answer: "Japan" },
    { question: "What is the longest bone in the human body?", answer: "Femur" },
    { question: "What is the largest cryptocurrency by market cap?", answer: "Bitcoin" },
    { question: "Which country has the most number of time zones?", answer: "France" },
    { question: "What is the only sport to have been played on the moon?", answer: "Golf" },
    { question: "Which country was formerly known as Persia?", answer: "Iran" },
    { question: "The Library of Alexandria was located in which modern-day country?", answer: "Egypt" }
];

let score = 0;
let timer;
const timeLimit=30;
let timeLeft;

let highScore = localStorage.getItem("topscore") || 0;
document.getElementById("high-score").innerText = highScore;

let currentQuestionIndex = -1; 
let usedQuestions = [];

function getRandomQuestion() {
    if (usedQuestions.length == questions.length) {
        document.getElementById("question").innerText = "You won! Refresh or restart to play again.";
        document.getElementById("submit").disabled = true;
        document.getElementById("answer").disabled = true;
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    currentQuestionIndex = randomIndex;
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    displayTimer();
}

const timerElement=document.getElementById("timer");
function displayTimer(){
    timeLeft=timeLimit;
    timerElement.innerText=`Time left: ${timeLeft}`;
    timer=setInterval(()=>{
        if (timeLeft==0){
            clearInterval(timer);
            endGame();
        }
        else{
            timerElement.innerText = `Time left: ${timeLeft}s`;
            timeLeft--;
        }
    },1000)
}

const startButton=document.getElementById("start");
const container=document.getElementById("container");
container.style.display="none";
startButton.addEventListener("click", function () {
    startButton.style.display = "none"; 
    container.style.display = "block"; 
    getRandomQuestion();
});

document.getElementById("submit").addEventListener("click", function () {
    const userAnswer = document.getElementById("answer").value.trim();
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        score++;
        document.getElementById("score").innerText = `Score: ${score} | High Score: ${highScore}`;
        document.getElementById("answer").value = "";
        getRandomQuestion();
    } else {
        endGame();
}});

function endGame(){
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("restart").classList.remove("hidden");

    if (score > highScore) {
        localStorage.setItem("topscore", score);
        document.getElementById("high-score").innerText = score;
    }

    document.getElementById("submit").disabled = true;
    document.getElementById("answer").disabled = true;
}

document.getElementById("restart").addEventListener("click", function () {
    score = 0;
    usedQuestions = [];
    document.getElementById("score").innerText = `Score: 0 | High Score: ${highScore}`;
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("restart").classList.add("hidden");
    document.getElementById("submit").disabled = false;
    document.getElementById("answer").disabled = false;
    document.getElementById("answer").value = "";
    getRandomQuestion();
});

getRandomQuestion();
