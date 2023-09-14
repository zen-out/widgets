const fs = require("fs");
const params = { bg: "" };
var settings = {
  A: "#6CCF64",
  B: "#52A34E",
  C: "#2E6B38",
  D: "#1F432B",
  F: "#171B21",
  year: 2023,
  goalPoundsPerWeek: 1.5,
  debug: true,
  calendarApp: "calshow",
  backgroundImage: params.bg ? params.bg : "transparent.jpg",
  calFilter: params.calFilter ? params.calFilter : [],
  widgetBackgroundColor: "#000000",
  todayTextColor: "#000000",
  markToday: true,
  todayCircleColor: "#FFB800",
  showEventCircles: true,
  discountAllDayEvents: false,
  eventCircleColor: "#1E5C7B",
  weekdayTextColor: "#ffffff",
  weekendLetters: "#FFB800",
  weekendLetterOpacity: 1,
  weekendDates: "#FFB800",
  locale: "en-US",
  textColor: "#ffffff",
  eventDateTimeOpacity: 0.7,
  widgetType: params.view ? params.view : "cal",
  showAllDayEvents: true,
  showCalendarBullet: true,
  startWeekOnSunday: false,
  showEventsOnlyForToday: false,
  nextNumOfDays: 7,
  showCompleteTitle: false,
  showPrevMonth: true,
  showNextMonth: true,
  individualDateTargets: false,
  flipped: params.flipped ? params.flipped : false,
};

/*
function scriptableGetFile(file, monthAndDate) {
  let returnValue = 0;
  // const BM = files.bookmarkedPath("Auto Export");
  let getScriptableDatePath;
  if (monthAndDate) {
    getScriptableDatePath = getScriptableDate(false, monthAndDate);
  } else {
    getScriptableDatePath = getScriptableDate(false);
  }
  let filePath = `./data/${file}-${getScriptableDatePath}.csv`;
  let fileData = fs.readFileSync(filePath, "utf8");
  let lines = fileData.split("\n");
  for (let i = 1; i < lines.length; i++) {
    let columns = lines[i].split(",");
    let eachNum = parseFloat(columns[1]);
    if (!isNaN(eachNum)) {
      returnValue += eachNum;
    }
  }
  // kg
  if (file.includes("Weight") && returnValue < 100) {
    returnValue = returnValue * 2.20462;
  } else if (file.includes("Dietary") && returnValue > 2100) {
    // kj
    returnValue = returnValue * 0.239006;
  }
  return returnValue;
}

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

function getDailyPercentage(monthAndDay) {
  let daily = calculateCaloricIntake(monthAndDay);
  let protein = proteinGoal(monthAndDay);
  let sum = daily + protein;
  if (typeof sum === "number") {
    if (sum > 91) {
      return settings.A;
    } else if (sum >= 90) {
      return settings.B;
    } else if (sum >= 80) {
      return settings.C;
    } else if (sum >= 70) {
      return settings.D;
    } else if (sum >= 60) {
      return settings.F;
    } else {
      return settings.F;
    }
  } else {
    console.log("Get Daily Percentage");
    return settings.F;
  }
}

let daily = calculateCaloricIntake("9/6");
console.log(daily, "daily goal");
let protein = proteinGoal("9/6");
console.log(protein, "protein goal");
let percent = getDailyPercentage("9/6");
console.log(percent);

module.exports = { getDailyPercentage, scriptableGetFile };
*/
