'use strict';

import fazerFinLuch from './fazer-week-example.json';
import fazerEngLuch from './fazer-week-example-en.json';


let lunch = '';
let todaysLunch = [];


const getWeekday = () => {
  const date = new Date;
  let weekday = date.getDay() - 1;
  if (weekday === -1) {
    weekday = 6;
  }
  return weekday;
};

const todaysLuchFin = fazerFinLuch.LunchMenus[getWeekday()];
const todaysLuchEng = fazerEngLuch.LunchMenus[getWeekday()];

const printTodaysMenu = (language) => {
  todaysLunch = [];
  if (language === 'fi') {
    //console.log(todaysLuchFin);
    for (const setMenu of todaysLuchFin.SetMenus){
      lunch = '';
      for (let x = 0; x<setMenu.Meals.length; x++){
        if(x === setMenu.Meals.length-1) {
          lunch += setMenu.Meals[x].Name + '.';
        }else{
          lunch += setMenu.Meals[x].Name + ', ';
        }
      }
      todaysLunch.push(lunch);
    }
    return todaysLunch;
  }else{
    for(const setMenu of todaysLuchEng.SetMenus){
      lunch = '';
      for (let x = 0; x<setMenu.Meals.length; x++){
        if (x === setMenu.Meals.length - 1) {
        lunch += setMenu.Meals[x].Name + '.';
      }else{
          lunch += setMenu.Meals[x].Name + ', ';
        }
      }
      todaysLunch.push(lunch);
    }
    return todaysLunch;
  }
};


const ToolsFazer = {printTodaysMenu};
export default ToolsFazer;
