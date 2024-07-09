const choices = ["piedra", "papel", "tijeras"];
let playerWins = 0;
let computerWins = 0;
let ties = 0;

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    ties++;
    return "¡Es un empate!";
  } else if (
    (playerSelection === "piedra" && computerSelection === "tijeras") ||
    (playerSelection === "papel" && computerSelection === "piedra") ||
    (playerSelection === "tijeras" && computerSelection === "papel")
  ) {
    playerWins++;
    return "¡Ganaste!";
  } else {
    computerWins++;
    return "¡Perdiste!";
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Tu: ${playerWins} - Máquina: ${computerWins} - Empates: ${ties}`;
}

function makeMove(playerMove) {
  const computerMove = computerPlay();
  const result = playRound(playerMove, computerMove);

  const resultElement = document.getElementById("result");
  resultElement.textContent = `Elegiste ${playerMove}. La máquina eligió ${computerMove}. ${result}`;

  updateScore();
  
  const container = document.getElementById("result-container");
  container.className = ""; 

  if (result.includes('Ganaste')) {
    resultElement.style.color = '#27ae60'; 
  } else if (result.includes('Perdiste')) {
    resultElement.style.color = '#e74c3c'; 
  } else {
    resultElement.style.color = '#f39c12';
  }
}

function changeBackgroundColor() {
  const body = document.body;
  const randomColor = getRandomColor();
  body.style.backgroundColor = randomColor;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function goBack() {
  window.location.href = "hub-de-apps.html";
}
