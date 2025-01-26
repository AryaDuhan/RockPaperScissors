let score = JSON.parse(localStorage.getItem("score"));
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

document.querySelector(
  ".js-score"
).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

// a global variable not preferable to use

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Scissors";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Paper";
  }

  return computerMove;
  // using scope of code this doesn't conflict with other variable name
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const autoplayStatus = document.querySelector(".js-autoplay-status");

  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoplayStatus.innerHTML = `Auto play is On`;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayStatus.innerHTML = "Auto play is Off";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Win";
    }
  }

  if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win";
    } else if (computerMove === "Scissors") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "Tie";
    }
  }

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `YOU
  <img src="images/${playerMove}-emoji.png" class="move-icon" />
  <img src="images/${computerMove}-emoji.png" class="move-icon" />
  COMPUTER`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetEverything() {
  resetResult = document.querySelector(".js-result");
  resetMoves = document.querySelector(".js-moves");

  resetResult.innerHTML = "";
  resetMoves.innerHTML = "";
}
