const params = { bg: "" };
var settings = {
  100: "#6CCF64",
  90: "#52A34E",
  80: "#2E6B38",
  70: "#1F432B",
  60: "#171B21",
  year: 2023,
  goalPoundsPerWeek: 1.5,
  debug: true,
  calendarApp: "calshow",
  backgroundImage: params.bg ? params.bg : "transparent.jpg",
  calFilter: params.calFilter ? params.calFilter : [],
  intensityColor: "",
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
var settings_default = settings;

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

function scriptableGetFile(file, monthAndDate) {
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
    if (file.includes("Weight") && returnValue < 100) {
      returnValue = returnValue * 2.20462;
    } else if (file.includes("Dietary") && returnValue > 2500) {
      returnValue = returnValue * 0.239006;
    }
  } else {
    returnValue = "--";
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
    return settings[sum];
  } else {
    console.log("Get Daily Percentage");
    return "#171B21";
  }
}

let daily = calculateCaloricIntake("9/12");
console.log(daily, "daily goal");
let protein = proteinGoal("9/12");
console.log(protein, "protein goal");
let percent = getDailyPercentage("9/12");
console.log(percent);
