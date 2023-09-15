const fs = require("fs");

let csv = fs.readFileSync(
  "./data/HealthExport_15-8-2023_15-9-2023(2023-09-15 09-55-14).csv",
  "utf8"
);

csv = csv.replace(/"/g, "");
csv = csv.replace(/-,/g, ",");
csv = csv.replace(/,,+/g, ",");
csv = csv.replace(/,$/, "");

// console.log(csv);
function processString(data) {
  let lines = data.split("\n");
  let arr = [];
  // Process each line separately
  lines = lines.map((line) => {
    let newObj = {};
    line = removeThirdLastComma(line);
    let splitted = line.split(",");
    if (splitted[0].length > 4) {
      newObj.date = splitted[0];
      newObj.activeCalories = parseInt(splitted[1]);
      newObj.calories = parseInt(splitted[2]);
      newObj.protein = parseInt(splitted[3]);
      newObj.resting = parseInt(splitted[4]);
      newObj.weight = parseFloat(splitted[5]);
    }
    arr.push(newObj);
  });
  arr = arr.filter((obj) => Object.keys(obj).length !== 0);
  return arr;
}
let processed = processString(csv);
// console.log(processed);
let stringed = JSON.stringify(processed);
// fs.writeFileSync("./data/test.json", stringed);
function removeThirdLastComma(str) {
  let fields = str.split(",");
  if (fields.length < 4) return str;
  let thirdLastIndex = fields.length - 4;
  fields[thirdLastIndex] = fields[thirdLastIndex] + fields[thirdLastIndex + 1];
  fields.splice(thirdLastIndex + 1, 1);
  return fields.join(",");
}
