// copy from here
const GOAL_POUNDS = 1.7;

function calculateCaloricIntake(monthAndDay) {
  let activeEnergyCalories = getScriptableFile("Active Energy", monthAndDay);
  let caloriesToday = getScriptableFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
  if (caloriesToday == 0) {
    caloriesToday = 2000;
  }
  let restingEnergyCalories = getScriptableFile(
    "Basal Energy Burned",
    monthAndDay
  );
  let totalCaloriesBurned = restingEnergyCalories + activeEnergyCalories;
  let caloriesNeededForGoal = GOAL_POUNDS * 3500;
  let dailyCaloricDeficit = caloriesNeededForGoal / 7;
  let allowedCalories = totalCaloriesBurned - dailyCaloricDeficit;
  return calculatePercentage(caloriesToday, allowedCalories);
}
function calculatePercentage(caloriesConsumed, allowedCalories) {
  let percentageConsumed = caloriesConsumed / allowedCalories;
  if (percentageConsumed > 0) {
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
  } else {
    return 50;
  }
}

function proteinGoal(monthAndDay) {
  let proteinToday = getScriptableFile("Protein", monthAndDay);
  let weightInPounds = getScriptableFile("Weight & Body Mass", monthAndDay);
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
  console.log(sum);
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
console.log(getCalorieGrade(6));
