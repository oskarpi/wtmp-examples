'use strict';

// Test
import sodexoData from './assets/modules/sodexo-data';
import fazerData from './assets/modules/fazer-data';
import apiData from './assets/modules/api-data';
import sodexoLunch from './assets/modules/sodexo-day-example.json';

const sodexoMenu = document.querySelector('#sodexo-menu');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const fazerChangeLanguage = document.getElementById('fazer-change-language');
let fazerMenu = document.getElementById('fazer-menu');
const sortFazerButton = document.getElementById('fazer-sort-button');
const randomFazerButton = document.getElementById('fazer-random-button');
const randomFazerMealP = document.getElementById('fazer-random-meal');
const randomDishP = document.getElementById('random-dish-p');
let sort = true;
let fazerSort = true;
let language = 'fi';
let sodexoLanguage = true;
let sodexoSort = true;
let fazerLanguage = true;
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
  console.log(menu);
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

const sortSodexoMenu = (sodexoMenu1, language) =>{

  let sortedSodexoMenu;
  sodexoMenu.textContent = '';

  if(!sort){
    sortedSodexoMenu = (language === 'fi' ? sodexoMenu1.fi.sort().reverse() : sodexoMenu1.en.sort().reverse());
  }else{
    sortedSodexoMenu = (language === 'fi' ? sodexoMenu1.fi.sort() : sodexoMenu1.en.sort());
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
  if(!sort){
    sortedFazerMenu = (language === 'fi' ? fazerMenu1.fi.sort().reverse() : fazerMenu1.en.sort().reverse());
  }else{
    sortedFazerMenu = (language === 'fi' ? fazerMenu1.fi.sort() : fazerMenu1.en.sort());
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
  if(language === 'fi') {
    language = 'en';
    printSodexoMenu(sodexoMenuObject, language);
    printFazerMenu(fazerMenuObject, language);
  }else{
    language = 'fi';
    printSodexoMenu(sodexoMenuObject, language);
    printFazerMenu(fazerMenuObject, language);
  }
});



sortAlphapetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  sortSodexoMenu(sodexoMenuObject, language);
  //sortFazerMenu(fazerMenuObject, language);
  sort = !sort;
});

randomButton.addEventListener('click', (language) => {
  randomDishP.textContent = '';
  console.log(language);
  console.log(objecToArrays(sodexoMenuObject, language));
  if (language) {
    let random = Math.floor(Math.random() * Object.keys(sodexoMenuObject).find(k=>sodexoMenuObject[k]===language).length);
    let randomDish = Object.keys(sodexoMenuObject).find(k=>sodexoMenuObject[k]===language);
    randomDishP.textContent = 'Päivän arvottu annos: ' + randomDish[random];
  }
  else {
    let random = Math.floor(Math.random() * Object.keys(sodexoMenuObject).find(k=>sodexoMenuObject[k]===language).length);
    const randomDish = Object.keys(sodexoMenuObject).find(k=>sodexoMenuObject[k]===language);
    randomDishP.textContent = 'Random dish of the day: ' + randomDish[random];
  }
});




//apiData.initFazer().then(data => {});
//initSodexo().then(data => {console.log('Sodexodata: ', data);});

/*for (const val of sodexoData.finnishLunchArray) {
  const course = document.createElement('li');
  course.classList.add('menu-li');
  course.textContent = val;
  sodexoMenu.append(course);
}

for (const meal of fazerData.printTodaysMenu(fazerLanguage)) {
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
  language = sodexoData.changeLanguage(language);
});

sortAlphapetButton.addEventListener('click', () => {
  if (language === 'fi') {
    sodexoMenu.textContent = '';
    for (const dish of sodexoData.sortAlphapet(sodexoData.finnishLunchArray, sort)) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = dish;
      sodexoMenu.append(course);
    }
    sort = !sort;
  }
  else {
    sodexoMenu.textContent = '';
    for (const dish of sodexoData.sortAlphapet(sodexoData.englishLunchArray, sort)) {
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
  sodexoData.randomDish(language);
});

console.log(fazerData.printTodaysMenu(fazerLanguage));
console.log(sodexoData.finnishLunchArray);



fazerChangeLanguage.addEventListener('click', (evt) => {
  evt.preventDefault();
  fazerMenu.textContent = '';
  for (const meal of fazerData.printTodaysMenu(fazerLanguage)) {
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
    for (const meal of fazerData.printTodaysMenu(!fazerLanguage).sort()) {
      const course = document.createElement('li');
      course.classList.add('menu-li');
      course.textContent = meal;
      fazerMenu.append(course);
    }
    fazerSort = !fazerSort;
  }
  else {
    console.log(fazerLanguage);
    for (const meal of fazerData.printTodaysMenu(!fazerLanguage).sort().reverse()) {
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
  randomFazerMealP.textContent = 'Arvottu annos: ' + fazerData.randomDish(fazerLunchMenu);
});
 */
