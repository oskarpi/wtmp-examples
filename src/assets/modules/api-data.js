'use strict';

let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

if (day < 10) {
  day = '0' + day;
}

if (month < 10) {
  month = '0' + month;
}

today = `${year}-${month}-${day}`;

const getSodexoData = async () => {
  let response;
  try {
    response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`);

  }
  catch (error) {
    console.error('Sodexo-api fetching error', error.message);
  }
  return await response.json();
};

const getFazerData = async(language) => {
  let response;
  try {
    response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://foodandco.fi/modules/json/json/Index?costNumber=3134&language=${language? 'fi' : 'en'}`);
  }
  catch (error) {
    console.error('Fazer-api fetching error', error.message);
  }
  return await response.json();
};

const initFazer= async (language) =>{
  let response;
  let menu;

  try {
    response = await getFazerData(language);
    let menus = Object.values(response.MenusForDays);
    for(let daysMenu of menus){
      if(daysMenu.Date.slice(0,10) === today){
        menu = daysMenu.SetMenus[0].Components;
      }
    }
    return menu;
  }
  catch (error) {
    console.log('Fazer-init error', error.message);
  }
};



const initSodexo= async (language) =>{
  let response;
  let menu = [];

  try {
    response = await getSodexoData();
    let courses = Object.values(response.courses);
    for(let course of courses){
      if(language) {
        menu.push(course.title_fi);
      }else{
        menu.push(course.title_en);
      }
    }
    return menu;
  }
  catch (error) {
    console.log('Sodexo-api error', error.message);
  }
};


const apiData = {today, initSodexo, initFazer};
export default apiData;
