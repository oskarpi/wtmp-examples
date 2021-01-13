'use strict';

let startTime = Date.now();

const highestNumber = 100;
const lowestNumber = 1;
const maxwGuesses = 10;

let randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
let scoreTime;
let scoreGuesses;


const checkGuess = () => {

  console.log(startTime);

  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    let endTime = Date.now();
    let totalTime = endTime - startTime;
    setGameOver(totalTime, guessCount);
  } else if (guessCount === maxwGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    let endTime = Date.now();
    let totalTime = endTime - startTime;
    setGameOver(totalTime, guessCount);
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
};

guessSubmit.addEventListener('click', checkGuess);

const setGameOver = (totalTime, guessCount) => {

  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  scoreTime = document.createElement('p');
  scoreGuesses = document.createElement('p');
  resetButton.textContent = 'Start new game';

  if(guessCount< 10){
    scoreTime.textContent = 'Your total time ' + totalTime / 1000 + ' seconds';
    scoreGuesses.textContent = 'Your total number of guesses ' +  guessCount;
  }else{
    scoreTime.textContent = '';
    scoreGuesses.textContent = '';
  }

  document.body.append(resetButton);
  document.body.append(scoreTime);
  document.body.append(scoreGuesses);
  resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
  guessCount = 1;
  startTime = Date.now();

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);
  scoreTime.parentNode.removeChild(scoreTime);
  scoreGuesses.parentNode.removeChild(scoreGuesses);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;
};
