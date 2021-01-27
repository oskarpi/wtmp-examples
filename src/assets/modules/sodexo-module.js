'use strict';

import LunchMenu from './sodexo-day-example.json';

const sodexoMenu = document.querySelector('#sodexo-menu');
const randomDishP = document.getElementById('random-dish-p');

let language = 'fi';
let sort = false;
const finnishLunchArray = [];
const englishLunchArray = [];



for(let o in LunchMenu.courses) {
  finnishLunchArray.push(LunchMenu.courses[o].title_fi);
};


for(let o in LunchMenu.courses) {
  englishLunchArray.push(LunchMenu.courses[o].title_en);
};

const changeLanguage = (language) => {
  sodexoMenu.textContent = '';
  if(language==='fi'){
    for(const val of englishLunchArray){
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = val;
      sodexoMenu.append(course);
      language='en';
    }
    return language;
  }else{
    for(const val of finnishLunchArray){
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = val;
      sodexoMenu.append(course);
      language='fi';
    }
    return language;
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

const randomDish = (language) => {
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


const Tools = {language, sort, finnishLunchArray, englishLunchArray, changeLanguage, sortAlphapet, randomDish};
export default Tools;
