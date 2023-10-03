
function getScriptableDate(getFilePath, monthAndDay) {
  let returnDate;
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
    let day;
    let m;
    if (typeof monthAndDay === "string") {
      if (monthAndDay.includes("/")) {
        let splitted = monthAndDay.split("/");
        splitted = monthAndDay.split("/");
        day = parseInt(splitted[1]);
        m = parseInt(splitted[0]);
      } else {
        day = parseInt(monthAndDay);
        let getDate = new Date();
        m = getDate.getMonth() + 1;
      }
    } else if (typeof monthAndDay === "number") {
      day = monthAndDay;
      let getDate = new Date();
      m = getDate.getMonth() + 1;
    } else {
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (m < 10) {
      m = "0" + m;
    }
    date = new Date();
    let y = String(date.getFullYear());
    let month = months[m - 1];
    const formatDate = y + "-" + m + "-" + day;

    if (getFilePath) {
      returnDate = "/" + y + "/" + month + "/" + formatDate;
    } else {
      returnDate = y + "-" + m + "-" + day;
    }
  } else {
    date = new Date();
    let y = String(date.getFullYear());
    let m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    let month = months[m - 1];
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    const formatDate = y + "-" + m + "-" + day;
    if (getFilePath) {
      returnDate = "/" + y + "/" + month + "/" + formatDate;
    } else {
      returnDate = y + "-" + m + "-" + day;
    }
  }
  return returnDate;
}

// module.exports = { getScriptableDate };


// let datePath = getScriptableDate(true, 8);
// let getScriptableDatePath = getScriptableDate(false, "9/8");


// console.log("he")