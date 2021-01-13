'use strict';

const menu = document.querySelector('.restaurant-menu');
const restaurantBox = document.querySelector('.restaurant-box');
const changeLanguageButton = document.getElementById('change-language');
const sortAlphapetButton = document.getElementById('sort');
const randomButton = document.getElementById('random-dish');
const randomDishP = document.getElementById('random-dish-p');
let course;
let language = 'fi';
let sort = false;

const coursesEn = ['Hamburger, cream sauce and poiled potates',
                'Goan style fish curry and whole grain rice',
                'Vegan Chili sin carne and whole grain rice',
                'Broccoli puree soup, side salad with two napas',
                'Lunch baguette with BBQ-turkey filling',
                'Cheese / Chicken / Vege / Halloum burger and french fries'];

const coursesFi = ['Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa',
                'Goalaista kalacurrya ja täysjyväriisiä',
                'vegaani Chili sin carne ja täysjyväriisi',
                'Parsakeittoa,lisäkesalaatti kahdella napaksella',
                'Lunch baguette with BBQ-turkey filling',
                'Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset'];

for(const dish of coursesFi){
  course = document.createElement('li');
  course.classList.add('dish');
  course.textContent = dish;
  menu.append(course);
}

const changeLanguage = () => {
  menu.textContent = '';
  if(language==='fi'){
   for(const dish of coursesEn){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
      language='en';
    }
  }else{
    for(const dish of coursesFi){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
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
    const randomDish = coursesFi[Math.floor(Math.random() * coursesFi.length)];
    randomDishP.textContent =  'Päivän arvottu annos: ' + randomDish;
  }else{
    const randomDish = coursesEn[Math.floor(Math.random() * coursesEn.length)];
    randomDishP.textContent = 'Random dish of the day: ' + randomDish;
  }
};

changeLanguageButton.addEventListener('click', changeLanguage);

sortAlphapetButton.addEventListener('click', () => {
  if(language === 'fi'){
    menu.textContent = '';
    for(const dish of sortAlphapet(coursesFi, sort)){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
  }}else{
    menu.textContent = '';
    for(const dish of sortAlphapet(coursesEn, sort)){
      course = document.createElement('li');
      course.classList.add('dish');
      course.textContent = dish;
      menu.append(course);
      }
  }
});

randomButton.addEventListener('click', randomDish);
