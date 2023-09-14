const { getScriptableDate } = require("./src/getScriptableDate.js");
const {
  calculateCaloricIntake,
  calculatePercentage,
  proteinGoal,
  getCalorieGrade,
} = require("./src/getCalorieGrade");
const { scriptableGetFile } = require("./src/fsGetFile.js");
function dateTest() {
  let test1 = getScriptableDate(true, "9");
  console.debug("should be sept 9", test1);
  let test2 = getScriptableDate(true, 9);
  console.debug("should be 9/9", test2);
  let test3 = getScriptableDate(true, "9/11");
  console.debug("should be 9/11", test3);
  let test4 = getScriptableDate(false, "9");
  console.debug("should be 9/9", test4);
  let test5 = getScriptableDate(false, 9);
  console.debug("should be 9/9", test5);
  let test6 = getScriptableDate(false, "9/11");
  console.debug("should be 9/11", test6);
  let test7 = getScriptableDate(true);
  console.debug("should be today", test7);
  let test8 = getScriptableDate(false);
  console.debug("should be today", test8);
}
dateTest();
function getFileTest(monthAndDay) {
  console.log("month and day", monthAndDay);
  let activeEnergyCalories = scriptableGetFile("Active Energy", monthAndDay);
  console.log("active energy ", activeEnergyCalories);
  let caloriesToday = scriptableGetFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
  console.log("calories", caloriesToday);
  let restingEnergyCalories = scriptableGetFile(
    "Basal Energy Burned",
    monthAndDay
  );
  console.debug("resting", restingEnergyCalories);
  let proteinToday = scriptableGetFile("Protein", monthAndDay);
  console.debug("protein", proteinToday);
  let weightInPounds = scriptableGetFile("Weight & Body Mass", monthAndDay);
  console.debug("weight", weightInPounds);
}
getFileTest("11");
function calorieTest() {}
calorieTest();
