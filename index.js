const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const selected = Math.floor(Math.random() * 100);
let guesses = 5;
let attempts = 0;

function difficulty(num) {
  switch (Number(num)) {
    case 10:
      return "Easy";
    case 5:
      return "Medium";
    case 3:
      return "Hard";
  }
}

function startGame() {
  rl.question("Enter your guess: ", (ans) => {
    if (isNaN(ans)) {
      console.log(`Please, use numbers`);
      startGame();
    }
    const answer = Number(ans);
    attempts++;
    if (attempts === guesses) {
      console.log(`You used all ${guesses} guesses. Try again!`);
      rl.close();
    }
    if (answer < selected) {
      console.log(`Incorrect! The number is greater than ${answer}`);
      startGame();
    } else if (answer > selected) {
      console.log(`Incorrect! The number is less than ${answer}`);
      startGame();
    } else if (answer === selected) {
      console.log(
        `Congratulations! You guessed the correct number in ${attempts} attempts.`
      );
      rl.close();
    }
  });
}

function choseDifficulty() {
  rl.question(
    `\nWelcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.\nPlease select the difficulty level:\n\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n\nEnter your choice: `,
    (answer) => {
      switch (Number(answer)) {
        case 1:
          guesses = 10;
          break;
        case 2:
          guesses = 5;
          break;
        case 3:
          guesses = 3;
          break;
        default:
          console.log("number must be 1, 2 or 3");
          rl.close();
      }
      console.log(
        `\nGreat! You have selected the ${difficulty(
          guesses
        )} difficulty level. \nLet's start the game!`
      );
      startGame();
    }
  );
}

choseDifficulty();

rl.on("close", () => {
  process.exit(0);
});
