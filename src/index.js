'use strict';

let startTime = Date.now();

const highestNumber = 100;
const lowestNumber = 1;
const maxwGuesses = 10;
let numbersArray = new Array(100).fill(0).map((e,i)=>i+1);
let randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;
const guessedNumbersArray = [];
const guessCountArray = [];

const resultParas = document.querySelector('.resultParas');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
let scoreTime;
let scoreGuesses;
let startIndex;
let endIndex;
let guessTotalCount;
//console.log(randomNumber);


/*
Paras pelistrategia on arvata numeroskaalan puolesta välistä. Kun peli kertoo onko luku pienempi vai suurempi edetään siihen suuntaan
ja arvataan lukujen puolesta välistä. Näin edetään kunnes saadaan oikea luku jäljelle.
Algoritmina tätä jäljittelee binääri haku.
Funktio ottaa parametrina Array [numerot 0-100] ja numeron (satunnainen luku).
*/

const binarySearch = (numbers, randomNumber) => {
  startIndex = 0;
  endIndex = numbers.length - 1;
  guessTotalCount = 0;
  while(startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    if(randomNumber === numbers[middleIndex]) {
      guessTotalCount++;
      guessCountArray.push(guessTotalCount);
      //guessedNumbersArray.push(numbers[middleIndex]);
      //return console.log("Target was found at index " + middleIndex+ ' Number of guesses ', guessCount, guessCountArray, guessedNumbersArray);
    }
    if(randomNumber > numbers[middleIndex]) {
      //console.log("Searching the right side of Array", numbers[middleIndex]);
      //guessedNumbersArray.push(numbers[middleIndex]);
      startIndex = middleIndex + 1;
      guessTotalCount++;
    }
    if(randomNumber < numbers[middleIndex]) {
      //console.log("Searching the left side of array", numbers[middleIndex]);
      //guessedNumbersArray.push(numbers[middleIndex]);
      endIndex = middleIndex - 1;
      guessTotalCount++;
    }
  }

  //console.log("Target value not found in array");
};

for (let i=0; i<5; i++){
  //randomNumber = Math.floor(Math.random() * highestNumber) + lowestNumber;
  binarySearch(numbersArray, randomNumber);
}
console.log(guessCountArray);

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
    scoreGuesses.textContent = 'Your total number of guesses ' + guessCount;
    scoreGuesses.classList.add('results');
    document.body.append(scoreTime);
    document.body.append(scoreGuesses);
    setGameOver();
  }
  else if (guessCount === maxwGuesses) {
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
  }
  else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    }
    else if (userGuess > randomNumber) {
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
  for (let i = 0; i < resetParas.length; i++) {
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

