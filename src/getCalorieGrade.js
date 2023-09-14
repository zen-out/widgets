const { settings } = require("./settings.js");
const { scriptableGetFile } = require("./fsGetFile.js");
// const { scriptableGetFile } = require("./scriptableGetFile.js");
function calculateCaloricIntake(monthAndDay) {
  let activeEnergyCalories = scriptableGetFile("Active Energy", monthAndDay);
  let caloriesToday = scriptableGetFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
  let restingEnergyCalories = scriptableGetFile(
    "Basal Energy Burned",
    monthAndDay
  );
  let totalCaloriesBurned = restingEnergyCalories + activeEnergyCalories;
  let caloriesNeededForGoal = settings.goalPoundsPerWeek * 3500;
  let dailyCaloricDeficit = caloriesNeededForGoal / 7;
  let allowedCalories = totalCaloriesBurned - dailyCaloricDeficit;
  return calculatePercentage(caloriesToday, allowedCalories);
}
function calculatePercentage(caloriesConsumed, allowedCalories) {
  let percentageConsumed = caloriesConsumed / allowedCalories;
  if (percentageConsumed <= 1.0) {
    return 100;
  } else if (percentageConsumed <= 1.1) {
    return 80;
  } else if (percentageConsumed <= 1.2) {
    return 70;
  } else if (percentageConsumed <= 1.3) {
    return 60;
  } else {
    return 50;
  }
}

function proteinGoal(monthAndDay) {
  let proteinToday = scriptableGetFile("Protein", monthAndDay);
  let weightInPounds = scriptableGetFile("Weight & Body Mass", monthAndDay);
  let weightInKg = weightInPounds * 0.45359237;
  let idealProtein = weightInKg * 1.5;
  if (proteinToday >= idealProtein) {
    return 10;
  } else {
    return 0;
  }
}
function getCalorieGrade(monthAndDay) {
  let daily = calculateCaloricIntake(monthAndDay);
  let protein = proteinGoal(monthAndDay);
  let sum = daily + protein;
  if (typeof sum === "number") {
    if (sum > 91) {
      return "A";
    } else if (sum >= 90) {
      return "B";
    } else if (sum >= 80) {
      return "C";
    } else if (sum >= 70) {
      return "D";
    } else if (sum >= 60) {
      return "F";
    } else {
      return "F";
    }
  } else {
    console.log("Get Daily Percentage");
    return "F";
  }
}

module.exports = {
  calculateCaloricIntake,
  calculatePercentage,
  proteinGoal,
  getCalorieGrade,
};
