'use strict';

/*
Paras pelistrategia on arvata numeroskaalan puolesta välistä ja edetä näin kunnes saadaan yksi luku jäljelle.

*/


let startTime = Date.now();

const highestNumber = 100;
const lowestNumber = 1;
const maxwGuesses = 10;

let randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;

const resultParas = document.querySelector('.resultParas');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const simulationButton = document.getElementById('simulation-button');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');


let guessCount = 1;
let resetButton;
let scoreTime;
let scoreGuesses;


const checkGuess = () => {

  console.log(startTime);
  resultParas.style.display = 'flex';

  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = 'Correct!';
    let endTime = Date.now();
    let totalTime = endTime - startTime;
    scoreTime = document.createElement('p');
    scoreGuesses = document.createElement('p');
    scoreTime.textContent = 'Your total time ' + totalTime / 1000 + ' seconds';
    scoreTime.classList.add('results');
    scoreGuesses.textContent = 'Your total number of guesses ' +  guessCount;
    scoreGuesses.classList.add('results');
    document.body.append(scoreTime);
    document.body.append(scoreGuesses);
    setGameOver();
  } else if (guessCount === maxwGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    scoreTime = document.createElement('p');
    scoreGuesses = document.createElement('p');
    scoreTime.textContent = '';
    scoreGuesses.textContent = '';
    scoreTime.classList.add('results');
    scoreGuesses.classList.add('results');
    document.body.append(scoreTime);
    document.body.append(scoreGuesses);
    setGameOver();
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

const setGameOver = () => {

  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');

  resetButton.textContent = 'Start new game';


  document.body.append(resetButton);

  resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
  guessCount = 1;
  startTime = Date.now();
  resultParas.style.display = 'none';

  console.log('kävin täällä');

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);
  scoreGuesses.parentNode.removeChild(scoreGuesses);
  scoreTime.parentNode.removeChild(scoreTime);


  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;
};



const algorithm = () => {

};

simulationButton.addEventListener('click', algorithm);
