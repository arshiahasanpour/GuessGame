let secretNumber;
let attempts;
let timeLeft;
let timerInterval;

function startGame() {
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  document.getElementById("restartBtn").classList.add("hidden");
  document.getElementById("guessBtn").classList.remove("hidden");
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("guess").classList.remove("hidden");
  document.getElementById("higher").classList.remove("hidden");
  document.getElementById("lower").classList.remove("hidden");
  document.getElementById("higher").style.color = "white";
  document.getElementById("lower").style.color = "white";
  document.getElementById("message").textContent = "";
  document.getElementById("guess").value = "";
  document.getElementById("guess").placeholder = "Enter your guess (0-1000)";
  document.getElementById("guess").focus();
  document.getElementById("timer").textContent = 60;

  secretNumber = Math.floor(Math.random() * 1001);
  attempts = 0;
  timeLeft = 60;
  startTimer();
}

function startTimer() { 
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const message = document.getElementById("message");
  const userGuess = Number(guessInput.value);
  document.getElementById("guess").focus();
  document.getElementById("guess").select();

  if (userGuess < 0 || userGuess > 1000 || isNaN(userGuess)) {
    message.textContent = "Enter a valid number between 0 and 1000";
    message.style.color = "black";
    return;
  }else{
    message.textContent = "";
  }

  attempts++;

  if (userGuess === secretNumber) {
    endGame(true);
  } else if (userGuess < secretNumber) {
    lower.style.color = "rgb(255, 0, 98)";
    higher.style.color = "white";
  } else {
    lower.style.color = "white";
    higher.style.color = "rgb(255, 0, 98)";
  }
}

function endGame(win) {

  clearInterval(timerInterval);
  const message = document.getElementById("message");

  if (win) {
    message.textContent = `Congratulations! You tried (${attempts}) attempts`;
    message.style.color = "green";
  } else {
    message.textContent = `Game Over! The correct number was ${secretNumber}`;
    message.style.color = "red";
  }

  document.getElementById("restartBtn").classList.remove("hidden");

  document.getElementById("guessBtn").classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("guess").classList.add("hidden");
  document.getElementById("higher").classList.add("hidden");
  document.getElementById("lower").classList.add("hidden");
}

function restartGame() {
  startGame();
}
