const fs = require("fs");
const { getScriptableDate } = require("./getScriptableDate");

function getScriptableFile(file, monthAndDate) {
  let returnValue = 0;
  // const BM = files.bookmarkedPath("Auto Export");
  let getScriptableDatePath;
  let scriptableFilePath;
  if (monthAndDate) {
    getScriptableDatePath = getScriptableDate(false, monthAndDate);
    scriptableFilePath = getScriptableDate(true, monthAndDate);
  } else {
    getScriptableDatePath = getScriptableDate(false);
    scriptableFilePath = getScriptableDate(true);
  }

  let filePath = `./data${scriptableFilePath}/${file}-${getScriptableDatePath}.csv`;
  let fileData;
  if (fs.existsSync(filePath)) {
    fileData = fs.readFileSync(filePath, "utf8");
    let lines = fileData.split("\n");
    for (let i = 1; i < lines.length; i++) {
      let columns = lines[i].split(",");
      let eachNum = parseFloat(columns[1]);
      if (!isNaN(eachNum)) {
        returnValue += eachNum;
      }
    }
  } else {
    if (file.includes("Weight")) {
      return 134;
    } else if (file.includes("Active Energy")) {
      return 400;
    } else if (file.includes("Dietary Energy")) {
      return 1400;
    } else if (file.includes("Protein")) {
      return 50;
    } else if (file.includes("Basal")) {
      return 1500;
    }
  }

  // kg
  if (file.includes("Weight") && returnValue < 100) {
    returnValue = returnValue * 2.20462;
  } else if (file.includes("Dietary") && returnValue > 2100) {
    returnValue = returnValue * 0.239006;
  }
  return returnValue;
}

module.exports = { getScriptableFile };
