'use strict';

import LunchMenu from './assets/sodexo-day-example.json';
import fazerLuchMenu from './assets/fazer-week-example.json';
// Test
console.log('lunch menu object', LunchMenu);
console.log('fazer menu', fazerLuchMenu.LunchMenus[0].SetMenus);

const menu = document.querySelector('.restaurant-menu');
const restaurantBox = document.querySelector('.restaurant-box');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const randomDishP = document.getElementById('random-dish-p');
const regexForm = document.getElementById('regex-form');
const regexSubmit = document.getElementById('regex-submit');
const regexInput = document.getElementById('regex-input');
const sortPriceButton = document.getElementById('sort-price-button');
const filterPriceButton = document.getElementById('filter-price-button');
const raisePriceButton = document.getElementById('raise-price-button');
const sumPriceButton = document.getElementById('sum-price-button');
const selectVeganButton = document.getElementById('select-vegan-button');
const daysMenu = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}];
let course;
let language = 'fi';
let sort = false;

const finnishLunchArray = [];
for (let o in LunchMenu.courses) {
  finnishLunchArray.push(LunchMenu.courses[o].title_fi);
}

const englishLunchArray = [];
for (let o in LunchMenu.courses) {
  englishLunchArray.push(LunchMenu.courses[o].title_en);
}

for (const val of finnishLunchArray) {
  course = document.createElement('li');
  course.classList.add('dish');
  course.textContent = val;
  menu.append(course);
}
;

const changeLanguage = () => {
  menu.textContent = '';
  if (language === 'fi') {
    for (const val of englishLunchArray) {
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = val;
      menu.append(course);
      language = 'en';
    }
  }
  else {
    for (const val of finnishLunchArray) {
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = val;
      menu.append(course);
      language = 'fi';
    }
  }
};

const sortAlphapet = (array, order) => {
  if (!order) {
    sort = true;
    return array.sort();
  }
  else {
    sort = false;
    return array.sort().reverse();
  }
};

const randomDish = () => {
  randomDishP.textContent = '';
  if (language === 'fi') {
    const random = Math.floor(Math.random() * 9) + 1;
    const randomDish = LunchMenu.courses[random].title_fi;
    randomDishP.textContent = 'Päivän arvottu annos: ' + randomDish;
  }
  else {
    const random = Math.floor(Math.random() * 9) + 1;
    const randomDish = LunchMenu.courses[random].title_en;
    randomDishP.textContent = 'Random dish of the day: ' + randomDish;
  }
};

changeLanguageButton.addEventListener('click', changeLanguage);

sortAlphapetButton.addEventListener('click', () => {
  if (language === 'fi') {
    menu.textContent = '';

    for (const dish of sortAlphapet(finnishLunchArray, sort)) {
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);

    }
  }
  else {

    menu.textContent = '';
    for (const dish of sortAlphapet(englishLunchArray, sort)) {
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
    }
  }
});

randomButton.addEventListener('click', randomDish);

regexForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validateMeal(regexInput.value);
});

const validateMeal = (meal) => {
  console.log(/^[A-ZÖÄÅ]{1}[a-zöäå0-9 \-/,()]{4,64}$/.test(meal));
};

const sortMenuPrice = () => {
   let sortedMenu = [...daysMenu].sort((a, b) => b.price - a.price);
   console.log('Ateriat hinnan mukaan pienimmästä suurimpaan', sortedMenu);
};

const filterMenuPrice = () =>{
  let filteredMenu = [...daysMenu].filter((meal) => meal.price < 5);
  console.log('Alle 5€ ateriat', filteredMenu);
};

const raiseMenuPrice = () => {
  let raisedMenu = daysMenu.map((meal) => (meal.price*1.15).toFixed(2));
  console.log('Nostetut hinnat:', raisedMenu);
};

const sumMenuPrice = () =>{
  let sumPrice = daysMenu.reduce((a, b) => ({price: a.price + b.price}));
  console.log('Menun hinta:', sumPrice);
};

const selectVeganMeal = () =>{
  let mondayLunch = fazerLuchMenu.LunchMenus[0].SetMenus;
  for(const mealSet of mondayLunch){
    //console.log(mealSet);
    for (const meal of mealSet.Meals){

    }
  }
};

sortPriceButton.addEventListener('click', sortMenuPrice);
filterPriceButton.addEventListener('click', filterMenuPrice);
raisePriceButton.addEventListener('click', raiseMenuPrice);
sumPriceButton.addEventListener('click', sumMenuPrice);
selectVeganButton.addEventListener('click', selectVeganMeal);
