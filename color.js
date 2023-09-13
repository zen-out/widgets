const widget = new ListWidget();

function calculateIntensity(eventCounts) {
  const counter = eventCounts.values();
  const counts = [];
  for (const count of counter) {
    counts.push(count);
  }
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  let intensity = 1 / (max - min + 1);
  intensity = intensity < 0.3 ? 0.3 : intensity;
  return intensity;
}

// header
const header = widget.addText("Light Color");
header.font = Font.boldSystemFont(15);
header.textColor = new Color();
header.centerAlignText();
widget.addSpacer();
// days
function countDaysFromDate(dateString) {
  const startDate = new Date(dateString);
  const today = new Date();
  const diffInMilliseconds = today - startDate;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(Math.abs(diffInDays));
}
let getDays = countDaysFromDate("2023-08-25");
const days = widget.addText(String(getDays));
days.font = Font.boldSystemFont(70);
days.textColor = Color.white();

days.textOpacity = 1;
days.centerAlignText();
widget.setPadding(17, 0, 17, 0);

// Days
const text = widget.addText("DAYS");
text.font = Font.boldSystemFont(25);
text.textColor = Color.white();
text.centerAlignText();
text.shadowColor = Color.lightGray();

// Refresh
const now = Date.now();
widget.refreshAfterDate = new Date(now + 12 * 60 * 60 * 1000);

// Set widget

if (config.runsInApp) {
  // display-preview-widget
  widget.presentSmall();
} else {
  // finalize-widget
  Script.setWidget(widget);
}

Script.complete();
// widget.presentSmall();
