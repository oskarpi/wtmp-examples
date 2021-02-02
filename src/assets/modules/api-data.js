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
      `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`);

  }
  catch (error) {
    console.error('Sodexo-api error', error.message);
  }
  return await response.json();
};

const getFazerData = async() => {
  let response;
  try {
    response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://foodandco.fi/modules/json/json/Index?costNumber=3134&language=fi`);
  }
  catch (error) {
    console.error('Fazer-api error', error.message);
  }
  return await response.json();
};

const initFazer= async () =>{
  let response;
  let menu;

  try {
    response = await getFazerData();
    let menus = Object.values(response.MenusForDays);
    for(let daysMenu of menus){
      if(daysMenu.Date.slice(0,10) === today){
        menu = (daysMenu.SetMenus[0].Components);
      }
    }
    //console.log(menu);
    return menu;
  }
  catch (error) {
    console.log('Fazer-api error', error.message);
  }
};

initFazer().then(data => {console.log('Fazerdata: ', data);});

const initSodexo= async () =>{
  let response;
  let menu = [];

  try {
    response = await getSodexoData();
    let courses = Object.values(response.courses);
    for(let course of courses){
      menu.push(course.title_fi);
    }
    return menu;
  }
  catch (error) {
    console.log('Sodexo-api error', error.message);
  }
};

initSodexo().then(data => {console.log('Sodexodata: ', data);});
const apiData = {today, initSodexo, initFazer};
export default apiData;
