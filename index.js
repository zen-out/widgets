let files = FileManager.local();
const iCloudInUse = files.isFileStoredIniCloud(module.filename);

// If so, use an iCloud file manager.
files = iCloudInUse ? FileManager.iCloud() : files;

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

function getScriptableFile(file, monthAndDate) {
  let returnValue = 0;
  const BM = files.bookmarkedPath("Auto Export");
  let datePath = getScriptableDate(true, monthAndDate);
  let getScriptableDatePath = getScriptableDate(false, monthAndDate);
  let healthPath = files.joinPath(BM, datePath);
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

function calculateCaloricIntake(goalPoundsPerWeek, monthAndDay) {
  let activeEnergyCalories = getScriptableFile("Active Energy", monthAndDay);
  let caloriesToday = getScriptableFile("Dietary Energy", monthAndDay); // if more than 2500 then its kj
  let restingEnergyCalories = getScriptableFile(
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
  let proteinToday = getScriptableFile("Protein", monthAndDay);
  let weightInPounds = getScriptableFile("Weight & Body Mass", monthAndDay); // if less than a hundred, then it's kg
  console.log(weightInPounds, "here");
  let weightInKg = weightInPounds * 0.45359237;
  let idealProtein = weightInKg * 1.5;
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
