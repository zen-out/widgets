const fs = require("fs");

function main(goalPoundsPerWeek) {
  // get date today
}
let files = FileManager.local();
const iCloudInUse = files.isFileStoredIniCloud(module.filename);

// If so, use an iCloud file manager.
files = iCloudInUse ? FileManager.iCloud() : files;
function getScriptableDate(getFilePath) {
  let date = new Date();
  var y = String(date.getFullYear());
  var m = date.getMonth() + 1;
  if (m < 10) {
    m = "0" + m;
  }
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
function scriptableGetFile(file) {
  let returnValue = 0;
  const BM = files.bookmarkedPath("Auto Export");
  const datePath = getScriptableDate(true);
  let healthPath = files.joinPath(BM, datePath);
  let getScriptableDatePath = getScriptableDate(false);
  let readFile = files.joinPath(
    healthPath,
    String(`${file}-${getScriptableDatePath}.csv`)
  );
  if (files.fileExists(readFile)) {
    var fileData = files.readString(readFile);
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
  } else {
    returnValue = "--";
  }
  return returnValue;
}

function calculateCaloricIntake(goalPoundsPerWeek) {
  let activeEnergyCalories = scriptableGetFile("Active Energy");
  let caloriesToday = scriptableGetFile("Dietary Energy"); // if more than 2500 then its kj
  let restingEnergyCalories = scriptableGetFile("Basal Energy Burned");
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

function proteinGoal() {
  let proteinToday = scriptableGetFile("Protein");
  let weightInPounds = scriptableGetFile("Weight & Body Mass"); // if less than a hundred, then it's kg
  let weightInKg = weightInPounds * 0.45359237;
  let idealProtein = weightInKg * 1.5;
  if (proteinToday >= idealProtein) {
    return true;
  } else {
    return false;
  }
}

let daily = calculateCaloricIntake(1.5);
console.log(daily);
let protein = proteinGoal();
console.log(protein);

function getData(file) {
  let getScriptableDatePath = getScriptableDate(false);
  const readFile = fs.readFileSync(
    `./data/${file}-${getScriptableDatePath}.csv`,
    "utf8"
  );
  let lines = readFile.split("\n");
  let getSum = 0;
  for (let i = 1; i < lines.length; i++) {
    let columns = lines[i].split(",");
    let eachNum = parseFloat(columns[1]);
    if (!isNaN(eachNum)) {
      getSum += eachNum;
    }
  }
  // kg
  if (file.includes("Weight") && getSum < 100) {
    getSum = getSum * 2.20462;
  }
  // kj
  if (file.includes("Dietary") && getSum > 2500) {
    getSum = getSum * 0.239006;
  }
  return getSum;
}
