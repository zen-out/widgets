function scriptableGetFile(file, monthAndDate) {
  let files = FileManager.local();
  const iCloudInUse = files.isFileStoredIniCloud(module.filename);
  files = iCloudInUse ? FileManager.iCloud() : files;
  let returnValue = 0;
  const BM = files.bookmarkedPath("Auto Export");
  let datePath = getScriptableDate(true, monthAndDate);
  let getScriptableDatePath = getScriptableDate(false, monthAndDate);
  let healthPath = files.joinPath(BM, datePath);
  let readFile = files.joinPath(
    healthPath,
    String(`${file}-${getScriptableDatePath} 2.csv`)
  );
  if (!files.fileExists(readFile)) {
    readFile = files.joinPath(
      healthPath,
      String(`${file}-${getScriptableDatePath}.csv`)
    );
  }
  if (files.fileExists(readFile)) {
    if (files.isFileDownloaded(readFile)) {
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
