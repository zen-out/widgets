const { getScriptableDate } = require("./getScriptableDate");

// copy from here
const BOOKMARK = "Auto Export";
function getScriptableFile(file, monthAndDate) {
  let files = FileManager.local();
  const iCloudInUse = files.isFileStoredIniCloud(module.filename);
  files = iCloudInUse ? FileManager.iCloud() : files;
  let returnValue = 0;
  const BM = files.bookmarkedPath(BOOKMARK);
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

module.exports = { getScriptableFile };
