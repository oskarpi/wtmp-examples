'use strict';

import LunchMenu from './assets/sodexo-day-example.json';
// Test
console.log('lunch menu object', LunchMenu);

const menu = document.querySelector('.restaurant-menu');
const restaurantBox = document.querySelector('.restaurant-box');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const randomDishP = document.getElementById('random-dish-p');
let course;
let language = 'fi';
let sort = false;

const finnishLunchArray = [];
  for(let o in LunchMenu.courses) {
  finnishLunchArray.push(LunchMenu.courses[o].title_fi);
  }

  const englishLunchArray = [];
  for(let o in LunchMenu.courses) {
    englishLunchArray.push(LunchMenu.courses[o].title_en);
  }

for(const val of finnishLunchArray){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = val;
      menu.append(course);
};


const changeLanguage = () => {
  menu.textContent = '';
  if(language==='fi'){
   for(const val of englishLunchArray){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = val;
      menu.append(course);
      language='en';
    }
  }else{
    for(const val of finnishLunchArray){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = val;
      menu.append(course);
      language='fi';
  }
}
};

const sortAlphapet = (array, order) =>{
  if(!order){
      sort = true;
      return array.sort();
  }else{
    sort = false;
    return array.sort().reverse();
  }
};

const randomDish = () => {
  randomDishP.textContent = '';
  if(language === 'fi'){
    const random = Math.floor(Math.random() * 9) + 1;
    const randomDish = LunchMenu.courses[random].title_fi;
    randomDishP.textContent =  'Päivän arvottu annos: ' + randomDish;
  }else{
    const random = Math.floor(Math.random() * 9) + 1;
    const randomDish = LunchMenu.courses[random].title_en;
    randomDishP.textContent = 'Random dish of the day: ' + randomDish;
  }
};

changeLanguageButton.addEventListener('click', changeLanguage);

sortAlphapetButton.addEventListener('click', () => {
  if(language === 'fi'){
    menu.textContent = '';



    for(const dish of sortAlphapet(finnishLunchArray, sort)){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);

  }}else{

    menu.textContent = '';
    for(const dish of sortAlphapet(englishLunchArray, sort)){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
      }
  }
});

randomButton.addEventListener('click', randomDish);
