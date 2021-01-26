'use strict';

const touchButton = document.querySelector('button');
const body = document.querySelector('body');


//i.


let secretWord = 'hello';
let input = '';
window.addEventListener('keypress', function(event) {
  input += event.key;

  if(input.length > secretWord.length) {
    input = input.substr(1);
  }

  if(input === secretWord) {
    alert("SECRET CODE!");
  }

});



//ii.

const doubleClickedCoords = (event) =>{
  event.preventDefault();
  console.log(`clicked coordinates:, ${event.pageX}, ${event.pageY}`);
};

document.addEventListener('dblclick', doubleClickedCoords);


//iii.

touchButton.addEventListener('mouseover', (event) =>{
  event.preventDefault();
  touchButton.textContent = 'you touched the button';
});

touchButton.addEventListener('mouseleave', (event) =>{
  event.preventDefault();
  touchButton.textContent = 'Touch me';
});


//iv.


setTimeout(() => {
  const warning = document.createElement('h1');
  warning.textContent = "Hurry up";
  body.append(warning);
}, 15000);


//v.

let idleHurry;
const idleWarning = document.getElementById('idle-warning');

const setIdleTimer = () => {
  idleHurry = setTimeout(() =>{
    idleWarning.textContent = "Hurry up, idle warning";
    body.append(idleWarning);
  }, 15000);
};

setIdleTimer();

window.addEventListener('mousemove',  () =>{
  idleWarning.textContent = '';
  clearTimeout(idleHurry);
  setIdleTimer();
});

window.addEventListener('keypress', () =>{
  idleWarning.textContent = '';
  clearTimeout(idleHurry);
  setIdleTimer();
});

window.addEventListener('click', () => {
  idleWarning.textContent = '';
  clearTimeout(idleHurry);
  setIdleTimer();
});

window.addEventListener('dblclick', ()=> {
  idleWarning.textContent = '';
  clearTimeout(idleHurry);
  setIdleTimer();
});







