const path = require("path");
const csvWriter = require("fast-csv");
const csv = require("csv-parser");
const fs = require("fs");

function getData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("./data/health.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
}
function getFormattedDate(getDate, getFilePath) {
  let indexOf = getDate.indexOf("00");
  getDate = getDate.slice(0, indexOf).trim();
  let splitted = getDate.split("-");
  let year = splitted[0];
  let m = splitted[1];
  let day = splitted[2];
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
  let month = months[m - 1];
  // console.log(month);
  let returnDate;
  if (getFilePath) {
    returnDate = "/" + year + "/" + month + "/";
  } else {
    returnDate = year + "-" + m + "-" + day;
  }
  // console.log(returnDate);
  return returnDate;
}

let reference = {
  active: { title: "Active Energy (kcal)", file: "Active Energy" },
  basal: { title: "Basal Energy (kcal)", file: "Basal Energy Burned" },
  dietary: { title: "Dietary Energy (kJ)", file: "Dietary Energy" },
  protein: { title: "Protein (g)", file: "Protein" },
  weight: { title: "Weight & Body Mass (kg)", file: "Weight & Body Mass" },
};
function writeWeightFile(obj, name) {
  let date = getFormattedDate(obj.Date, true);
  let fileDate = getFormattedDate(obj.Date, false);
  let selectedData = [
    {
      "Date/Time": obj.Date,
      "Weight & Body Mass (kg)": obj["Weight & Body Mass (kg)"],
      Source: "Lesley’s Apple Watch",
    },
  ];
  // Create the directory if it doesn't exist
  let dir = `./data${date}${fileDate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, `${reference.weight.file}-${fileDate}.csv`);

  csvWriter
    .writeToPath(filePath, selectedData, { headers: true })
    .on("finish", function () {
      console.log("Done writing to file");
    })
    .on("error", (err) => console.error(err));
}
function writeProteinFile(obj, name) {
  let date = getFormattedDate(obj.Date, true);
  let fileDate = getFormattedDate(obj.Date, false);
  let selectedData = [
    {
      "Date/Time": obj.Date,
      "Protein (g)": obj["Protein (g)"],
      Source: "Lesley’s Apple Watch",
    },
  ];
  // Create the directory if it doesn't exist
  let dir = `./data${date}${fileDate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, `${reference.protein.file}-${fileDate}.csv`);

  csvWriter
    .writeToPath(filePath, selectedData, { headers: true })
    .on("finish", function () {
      console.log("Done writing to file");
    })
    .on("error", (err) => console.error(err));
}
function writeDietaryFile(obj, name) {
  let date = getFormattedDate(obj.Date, true);
  let fileDate = getFormattedDate(obj.Date, false);
  let selectedData = [
    {
      "Date/Time": obj.Date,
      "Dietary Energy (kcal)": obj["Dietary Energy (kcal)"],
      Source: "Lesley’s Apple Watch",
    },
  ];
  // Create the directory if it doesn't exist
  let dir = `./data${date}${fileDate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, `${reference.dietary.file}-${fileDate}.csv`);

  csvWriter
    .writeToPath(filePath, selectedData, { headers: true })
    .on("finish", function () {
      console.log("Done writing to file");
    })
    .on("error", (err) => console.error(err));
}
function writeBasalFile(obj, name) {
  let date = getFormattedDate(obj.Date, true);
  let fileDate = getFormattedDate(obj.Date, false);
  let selectedData = [
    {
      "Date/Time": obj.Date,
      "Basal Energy (kcal)": obj["Basal Energy Burned (kcal)"],
      Source: "Lesley’s Apple Watch",
    },
  ];
  // Create the directory if it doesn't exist
  let dir = `./data${date}${fileDate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, `${reference.basal.file}-${fileDate}.csv`);

  csvWriter
    .writeToPath(filePath, selectedData, { headers: true })
    .on("finish", function () {
      console.log("Done writing to file");
    })
    .on("error", (err) => console.error(err));
}
function writeActivityFile(obj, name) {
  let date = getFormattedDate(obj.Date, true);
  let fileDate = getFormattedDate(obj.Date, false);
  let selectedData = [
    {
      "Date/Time": obj.Date,
      "Active Energy (kcal)": obj["Active Energy (kcal)"],
      Source: "Lesley’s Apple Watch",
    },
  ];
  // Create the directory if it doesn't exist
  let dir = `./data${date}${fileDate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, `${reference.active.file}-${fileDate}.csv`);

  csvWriter
    .writeToPath(filePath, selectedData, { headers: true })
    .on("finish", function () {
      console.log("Done writing to file");
    })
    .on("error", (err) => console.error(err));
}
async function processData() {
  let data = await getData();
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    writeActivityFile(obj);
    writeBasalFile(obj);
    writeProteinFile(obj);
    writeWeightFile(obj);
    writeDietaryFile(obj);
  }
}

processData();
