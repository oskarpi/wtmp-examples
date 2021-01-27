'use strict';

const mouse = document.querySelector('#mouse');
const mouseCenter = document.querySelector('#mouse-center');
const girl = document.querySelector('#girl');
const parrot = document.querySelector('#parrot');
const body = document.querySelector('body');

let cX = body.clientWidth/2;
let  cY = body.clientHeight/2;

document.addEventListener('mousemove', (event) =>{

  let mouseX = event.clientX;
  let mouseY = event.clientY;

  let centerX = cX - mouseX;
  let centerY = cY - mouseY;

  mouse.innerHTML = `Yläreunasta: ${mouseX}  ja Y:  ${mouseY}`;
  mouseCenter.innerHTML = `Keskipisteestä X: ${centerX} ja Y: ${centerY}`;

  girl.style.transform = `translate(${mouseX/girl.getAttribute('data-speed')}%, ${mouseY/girl.getAttribute('data-speed')}%)`;
  parrot.style.transform = `translate(${mouseX/parrot.getAttribute('data-speed')}%, ${mouseY/parrot.getAttribute('data-speed')}%)`;

});
