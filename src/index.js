'use strict';

const touchButton = document.querySelector('button');
const body = document.querySelector('body');

/*
i.

 */
document.addEventListener('keydown', (event)=>{

});

/*
ii.

 */
document.addEventListener('dblclick', (event)=>{
  console.log('clicked coordinates: ', event.pageX, event.pageY);
});


/*
iii.

 */
touchButton.addEventListener('mouseover', () =>{
 console.log('you touched the button');
});


/*
iv.
 */

setTimeout(() => {
  const warning = document.createElement('h1');
  warning.textContent = "Hurry up";
  body.append(warning);
}, 15000);

/*
v
 */

