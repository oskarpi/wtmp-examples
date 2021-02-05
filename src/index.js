'use strict';


import apiData from './assets/modules/api-data';


const sodexoMenu = document.querySelector('#sodexo-menu');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
let fazerMenu = document.getElementById('fazer-menu');
const randomFazerButton = document.getElementById('fazer-random-button');
const randomFazerMealP = document.getElementById('fazer-random-meal');
const randomDishP = document.getElementById('random-dish-p');
const restaurants = document.querySelectorAll('.restaurant-box');
const searchField = document.getElementById('search-restaurant');
const searchButton = document.getElementById('search-icon');
let sort = true;
let language = 'fi';
let fazerMenuObject = {};
let sodexoMenuObject = {};
const menuButton = document.querySelector('#menu-icon');
const navItems = document.getElementById('nav-links');
const searchForm = document.getElementById('search-form');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').
      then(registration => {
        console.log('SW registered: ', registration);
      }).
      catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

menuButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (navItems.style.display === 'flex' && searchForm.style.display ===
    'flex') {
    navItems.style.display = 'none';
    searchForm.style.display = 'none';
  }
  else {
    navItems.style.display = 'flex';
    searchForm.style.display = 'flex';
  }

});

window.addEventListener('resize', (event) => {
  if (window.innerWidth > 800) {
    navItems.style.display = 'flex';
    searchForm.style.display = 'flex';
  }
  else {
    navItems.style.display = 'none';
    searchForm.style.display = 'none';
  }
});

const printSodexoMenu = (menu, language) => {
  sodexoMenu.textContent = '';
  if (language === 'fi') {
    for (let sodexoCourse of menu.fi) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = sodexoCourse;
      sodexoMenu.append(course);
    }
  }
  else {
    for (let sodexoCourse of menu.en) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = sodexoCourse;
      sodexoMenu.append(course);
    }
  }
};

const printFazerMenu = async (menu, language) => {
  fazerMenu.textContent = '';

  if (language === 'fi') {
    for (let fazerCourse of menu.fi) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = fazerCourse;
      fazerMenu.append(course);
    }
  }
  else {
    for (let fazerCourse of menu.en) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = fazerCourse;
      fazerMenu.append(course);
    }
  }
};

const sortSodexoMenu = (sodexoMenu1, language) => {

  let sortedSodexoMenu;
  sodexoMenu.textContent = '';

  if (!sort) {
    sortedSodexoMenu = (language === 'fi' ?
      sodexoMenu1.fi.sort().reverse() :
      sodexoMenu1.en.sort().reverse());
  }
  else {
    sortedSodexoMenu = (language === 'fi' ?
      sodexoMenu1.fi.sort() :
      sodexoMenu1.en.sort());
  }

  for (let sodexoLunch of sortedSodexoMenu) {
    const course = document.createElement('li');
    course.classList.add('menu-li');
    course.textContent = sodexoLunch;
    sodexoMenu.append(course);
  }
};

const sortFazerMenu = (fazerMenu1, language) => {
  let sortedFazerMenu;
  fazerMenu.textContent = '';
  if (!sort) {
    sortedFazerMenu = (language === 'fi' ?
      fazerMenu1.fi.sort().reverse() :
      fazerMenu1.en.sort().reverse());
  }
  else {
    sortedFazerMenu = (language === 'fi' ?
      fazerMenu1.fi.sort() :
      fazerMenu1.en.sort());
  }
  for (let fazerLunch of sortedFazerMenu) {
    const course = document.createElement('li');
    course.classList.add('menu-li');
    course.textContent = fazerLunch;
    fazerMenu.append(course);
  }
};

const init = async () => {
  try {
    sodexoMenuObject = await apiData.initSodexo();
    await printSodexoMenu(sodexoMenuObject, language);
    fazerMenuObject['fi'] = await apiData.initFazer('fi');
    fazerMenuObject['en'] = await apiData.initFazer('en');
    await printFazerMenu(fazerMenuObject, language);
  }
  catch (error) {
    console.log('init error', error.message);
  }
};

init();

changeLanguageButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (language === 'fi') {
    language = 'en';
    printSodexoMenu(sodexoMenuObject, language);
    printFazerMenu(fazerMenuObject, language);
  }
  else {
    language = 'fi';
    printSodexoMenu(sodexoMenuObject, language);
    printFazerMenu(fazerMenuObject, language);
  }
});

sortAlphapetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  sortSodexoMenu(sodexoMenuObject, language);
  sortFazerMenu(fazerMenuObject, language);
  sort = !sort;
});

randomButton.addEventListener('click', (event) => {
  event.preventDefault();
  let menu;
  randomDishP.textContent = '';
  menu = (language === 'fi' ? sodexoMenuObject.fi : sodexoMenuObject.en);
  let random = Math.floor(Math.random() * menu.length);
  let randomDish = menu;
  randomDishP.textContent = 'Päivän arvottu annos: ' + randomDish[random];
});

randomFazerButton.addEventListener('click', (event) =>{
  event.preventDefault();
  let menu;
  randomFazerMealP.textContent = '';
  menu = (language === 'fi' ? fazerMenuObject.fi : fazerMenuObject.en);
  let random = Math.floor(Math.random() * menu.length);
  let randomDish = menu;
  randomFazerMealP.textContent = 'Päivän arvottu annos: ' + randomDish[random];
});




searchButton.addEventListener('click', (event)=>{
  event.preventDefault();
  for(let restaurant of  restaurants){
    console.log(restaurant);
    if(restaurant.innerHTML.toLowerCase().includes(searchField.value.toLowerCase())){
      restaurant.style.display = 'flex';
    }else{
      restaurant.style.display = 'none';
    }
  }
});
