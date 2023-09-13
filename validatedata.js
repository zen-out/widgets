const fs = require("fs");
const { getDailyPercentage, scriptableGetFile } = require("./fs.js");
let monthAndDay = "9/10";

let proteinToday = scriptableGetFile("Protein", monthAndDay);
let weightInPounds = scriptableGetFile("Weight & Body Mass", monthAndDay);
let activeEnergyCalories = scriptableGetFile("Active Energy", monthAndDay);
let caloriesToday = scriptableGetFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
let restingEnergyCalories = scriptableGetFile(
  "Basal Energy Burned",
  monthAndDay
);

if (caloriesToday > 2500) {
  caloriesToday = caloriesToday * 0.239006;
}

console.log("Protein", proteinToday);
console.log("Weight", weightInPounds);
console.log("Active", activeEnergyCalories);
console.log("Eating", caloriesToday);
console.log("Resting", restingEnergyCalories);
