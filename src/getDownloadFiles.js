const { getScriptableDate } = require("./getScriptableDate");
const BOOKMARK = "Auto Export";
async function getDownloadFiles() {
  let files = FileManager.iCloud();
  for (let j = 1; j < 32; j++) {
    const BM = files.bookmarkedPath(BOOKMARK);
    let getString = j.toString();
    let datePath = getScriptableDate(true, getString);

    let getScriptableDatePath = getScriptableDate(false, getString);
    let healthPath = files.joinPath(BM, datePath);

    let getFiles = [
      "Protein",
      "Weight & Body Mass",
      "Active Energy",
      "Dietary Energy",
      "Basal Energy Burned",
    ];
    for (let i = 0; i < getFiles.length; i++) {
      let file = getFiles[i];
      let readFile = files.joinPath(
        healthPath,
        String(`${file}-${getScriptableDatePath}.csv`)
      );
      if (files.fileExists(readFile)) {
        if (!files.isFileDownloaded(readFile)) {
          await files.downloadFileFromiCloud(readFile);
        }
      }
    }
  }
}

module.exports = { getDownloadFiles };
