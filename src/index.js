'use strict';

// Test
import Tools from './assets/modules/sodexo-module';
import ToolsFazer from './assets/modules/fazer-module';

const menu = document.querySelector('.restaurant-menu');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const fazerChangeLanguage = document.getElementById('fazer-change-language');
let fazerMenu = document.getElementById('fazer-menu');
//const sortFazerButton = document.getElementById('fazer-sort-button');
let sort = Tools.sort;
//let fazerSort = true;
let language = Tools.language;
let fazerLanguage = 'fi';

for (const val of Tools.finnishLunchArray) {
  const course = document.createElement('li');
  course.classList.add('dish');
  course.textContent = val;
  menu.append(course);
}

for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage)) {
  const course = document.createElement('li');
  course.classList.add('dish');
  course.textContent = meal;
  fazerMenu.append(course);
}
if (fazerLanguage === 'fi') {
  fazerLanguage = 'en';
}
else {
  fazerLanguage = 'fi';
}

changeLanguageButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  language = Tools.changeLanguage(language);
});

sortAlphapetButton.addEventListener('click', () => {
  if (language === 'fi') {
    menu.textContent = '';
    for (const dish of Tools.sortAlphapet(Tools.finnishLunchArray, sort)) {
      const course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
    }
    sort = !sort;
  }
  else {
    menu.textContent = '';
    for (const dish of Tools.sortAlphapet(Tools.englishLunchArray, sort)) {
      const course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
    }
    sort = !sort;
  }
});

randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  Tools.randomDish(language);
});

fazerChangeLanguage.addEventListener('click', (evt) => {
  evt.preventDefault();
  fazerMenu.textContent = '';
  for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage)) {
    const course = document.createElement('li');
    course.classList.add('dish');
    course.textContent = meal;
    fazerMenu.append(course);
  }
  if (fazerLanguage === 'fi') {
    fazerLanguage = 'en';
  }
  else {
    fazerLanguage = 'fi';
  }
});
/*
sortFazerButton.addEventListener('click', (evt) => {
  fazerMenu.textContent = '';
  if (fazerSort) {
    console.log(fazerLanguage);
    for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage).sort()) {
      const course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = meal;
      fazerMenu.append(course);
    }
    fazerSort = !fazerSort;
  }
  else {
    console.log(fazerLanguage);
    for (const meal of ToolsFazer.printTodaysMenu(fazerLanguage).sort().reverse()) {
      const course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = meal;
      fazerMenu.append(course);
    }
    fazerSort = !fazerSort;
  }
});
*/
