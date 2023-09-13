const fs = require("fs");

function getScriptableDate(getFilePath, monthAndDay) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date;
  if (monthAndDay) {
    let splitted = monthAndDay.split("/");
    let day = parseInt(splitted[1]);
    let m = parseInt(splitted[0]);
    if (day < 10) {
      day = "0" + day;
    }
    if (m < 10) {
      m = "0" + m;
    }
    let month = months[m - 1];
    const formatDate = 2023 + "-" + m + "-" + day;

    if (getFilePath) {
      return "/" + 2023 + "/" + month + "/" + formatDate;
    } else {
      return 2023 + "-" + m + "-" + day;
    }
  } else {
    date = new Date();
    var y = String(date.getFullYear());
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var month = months[m - 1];
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    const formatDate = y + "-" + m + "-" + day;
    if (getFilePath) {
      return "/" + y + "/" + month + "/" + formatDate;
    } else {
      return y + "-" + m + "-" + day;
    }
  }
}
let getScriptableDatePath = getScriptableDate(false);

let getScriptableDatePath2 = getScriptableDate(true);
console.log(getScriptableDatePath, getScriptableDatePath2);

console.log("2023-09-13 /2023/September/2023-09-13");

let test = getScriptableDate(false, "9/11");

let test2 = getScriptableDate(true, "9/11");
console.log(test, test2);

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
  } else if (file.includes("Dietary") && returnValue > 2500) {
    // kj
    returnValue = returnValue * 0.239006;
  }
  console.log(returnValue);
  return returnValue;
}

// scriptableGetFile("Active Energy", "9/11");
function calculateCaloricIntake(goalPoundsPerWeek, monthAndDay) {
  let activeEnergyCalories = scriptableGetFile("Active Energy", monthAndDay);
  let caloriesToday = scriptableGetFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
  let restingEnergyCalories = scriptableGetFile(
    "Basal Energy Burned",
    monthAndDay
  );
  var totalCaloriesBurned = restingEnergyCalories + activeEnergyCalories;
  var caloriesNeededForGoal = goalPoundsPerWeek * 3500;
  var dailyCaloricDeficit = caloriesNeededForGoal / 7;
  var dailyCaloricIntake = totalCaloriesBurned - dailyCaloricDeficit;
  if (caloriesToday <= dailyCaloricIntake) {
    return true;
  } else {
    return false;
  }
}

function proteinGoal(monthAndDay) {
  let proteinToday = scriptableGetFile("Protein", monthAndDay);
  let weightInPounds = scriptableGetFile("Weight & Body Mass", monthAndDay); // if less than a hundred, then it's kg
  let weightInKg = weightInPounds * 0.45359237;
  let idealProtein = weightInKg * 1.5;
  console.log(proteinToday, "proteinToday");
  console.log(idealProtein, "idealProten");
  if (proteinToday >= idealProtein) {
    return true;
  } else {
    return false;
  }
}

let daily = calculateCaloricIntake(1.5, "9/11");
console.log(daily);
let protein = proteinGoal("9/11");
console.log(protein);
