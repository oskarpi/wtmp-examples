'use strict';

// Test
import Tools from './assets/modules/sodexo-module';
import ToolsFazer from './assets/modules/fazer-module';

const sodexoMenu = document.querySelector('#sodexo-menu');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const fazerChangeLanguage = document.getElementById('fazer-change-language');
let fazerMenu = document.getElementById('fazer-menu');
const sortFazerButton = document.getElementById('fazer-sort-button');
const randomFazerButton = document.getElementById('fazer-random-button');
const randomFazerMealP = document.getElementById('fazer-random-meal');
let sort = Tools.sort;
let fazerSort = false;
let language = Tools.language;
let fazerLanguage = true;
const menuButton = document.querySelector('#menu-icon');
const navItems = document.getElementById('nav-links');
const searchForm = document.getElementById('search-form');

menuButton.addEventListener('click', (event) =>{
  event.preventDefault();
  if(navItems.style.display === 'flex' && searchForm.style.display === 'flex'){
    navItems.style.display = 'none';
    searchForm.style.display = 'none';
  }else{
    navItems.style.display = 'flex';
    searchForm.style.display = 'flex';
  }

});


window.addEventListener('resize',(event)=>{
  if(window.innerWidth > 800){
    navItems.style.display = 'flex';
    searchForm.style.display = 'flex';
  }else{
    navItems.style.display = 'none';
    searchForm.style.display = 'none';
  }
});



for (const val of Tools.finnishLunchArray) {
  const course = document.createElement('li');
  course.classList.add('menu-li');
  course.textContent = val;
  sodexoMenu.append(course);
}

for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage)) {
  const course = document.createElement('li');
  course.classList.add('menu-li');
  course.textContent = meal;
  fazerMenu.append(course);
}
if (fazerLanguage) {
  fazerLanguage  = !fazerLanguage;
}

changeLanguageButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  language = Tools.changeLanguage(language);
});

sortAlphapetButton.addEventListener('click', () => {
  if (language === 'fi') {
    sodexoMenu.textContent = '';
    for (const dish of Tools.sortAlphapet(Tools.finnishLunchArray, sort)) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = dish;
      sodexoMenu.append(course);
    }
    sort = !sort;
  }
  else {
    sodexoMenu.textContent = '';
    for (const dish of Tools.sortAlphapet(Tools.englishLunchArray, sort)) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = dish;
      sodexoMenu.append(course);
    }
    sort = !sort;
  }
});

randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  Tools.randomDish(language);
});

console.log(ToolsFazer.printTodaysMenu(fazerLanguage));
console.log(Tools.finnishLunchArray);



fazerChangeLanguage.addEventListener('click', (evt) => {
  evt.preventDefault();
  fazerMenu.textContent = '';
  for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage)) {
    const course = document.createElement('li');
    course.classList.add('menu-li');
    course.textContent = meal;
    fazerMenu.append(course);
  }
  if (fazerLanguage) {
    fazerLanguage = !fazerLanguage;
  }
  else {
    fazerLanguage = !fazerLanguage;
  }
});

sortFazerButton.addEventListener('click', (evt) => {
  fazerMenu.textContent = '';
  if (!fazerSort) {
    console.log(fazerLanguage);
    for (const meal of ToolsFazer.printTodaysMenu(!fazerLanguage).sort()) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = meal;
      fazerMenu.append(course);
    }
    fazerSort = !fazerSort;
  }
  else {
    console.log(fazerLanguage);
    for (const meal of ToolsFazer.printTodaysMenu(!fazerLanguage).sort().reverse()) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = meal;
      fazerMenu.append(course);
    }
    fazerSort = !fazerSort;
  }
});

randomFazerButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
  randomFazerMealP.textContent = '';
  let fazerLunchMenu = [];
  for (const meal of fazerMenu.childNodes){
    fazerLunchMenu.push(meal.textContent);
  }
  randomFazerMealP.textContent = 'Arvottu annos: ' + ToolsFazer.randomDish(fazerLunchMenu);
});
