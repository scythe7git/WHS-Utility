function updateCountdown() {
  var now = new Date();
  
  // Get the timezone offset
  var timezoneOffset = now.getTimezoneOffset();
  
  // Convert the offset to hours and minutes
  var hours = Math.abs(Math.floor(timezoneOffset / 60));
  var minutes = Math.abs(timezoneOffset % 60);
  
  // Determine the sign of the offset
  var sign = timezoneOffset > 0 ? "-" : "+";

  // Construct the timezone name
  var timezoneName = "GMT" + sign + pad(hours) + ":" + pad(minutes);
  
  console.log("Timezone:", timezoneName);

  var periods = [
    { name: "Period 1", time: "08:45" },
    { name: "Period 2", time: "09:40" },
    { name: "Break", time: "10:40" },
    { name: "Period 3", time: "11:00" },
    { name: "Homeroom", time: "12:00" },
    { name: "Period 4", time: "12:20" },
    { name: "Lunch", time: "13:20" },
    { name: "Period 5", time: "14:20" },
    { name: "School ends", time: "15:20" }
  ];

  var nextPeriod = null;
  
  // Find the next period
  for (var i = 0; i < periods.length; i++) {
    var periodTime = new Date(now.toDateString() + " " + periods[i].time);
    if (periodTime.getTime() > now.getTime()) {
      nextPeriod = periods[i];
      break;
    }
  }

  if (nextPeriod) {
    var timeDiff = new Date(now.toDateString() + " " + nextPeriod.time).getTime() - now.getTime();
    var hours = Math.floor(timeDiff / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    var countdownStr = "";
    if (nextPeriod.name === "School ends") {
      countdownStr = "School ending in ";
    } else {
      countdownStr = nextPeriod.name + " starts in ";
    }
    countdownStr += hours + "h " + minutes + "m " + seconds + "s";

    document.getElementById("countdown").innerText = countdownStr;
  } else {
    // If no next period is found, reset the countdown to the start of Period 1 for the next school day
    var startOfNextDay = new Date(now);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1); // Set to next day
    startOfNextDay.setHours(8, 45, 0, 0); // Set to start of Period 1
    var timeUntilNextPeriod1 = startOfNextDay.getTime() - now.getTime();

    var hours = Math.floor(timeUntilNextPeriod1 / (1000 * 60 * 60));
    var minutes = Math.floor((timeUntilNextPeriod1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntilNextPeriod1 % (1000 * 60)) / 1000);

    var countdownStr = "Period 1 starts in ";
    countdownStr += hours + "h " + minutes + "m " + seconds + "s";

    document.getElementById("countdown").innerText = countdownStr;
  }

  // Display the current period
  var currentPeriodStr = "";
  if (nextPeriod) {
    if (nextPeriod.name === "School ends") {
      currentPeriodStr = "School has finished";
    } else {
      var currentIndex = periods.findIndex(period => period.name === nextPeriod.name);
      var currentPeriodIndex = currentIndex > 0 ? currentIndex - 1 : periods.length - 1;
      currentPeriodStr = periods[currentPeriodIndex].name;
    }
  } else {
    // If no next period is found, set the current period to "School has finished"
    currentPeriodStr = "School has finished";
  }

  document.getElementById("currentPeriod").innerText = currentPeriodStr;

  // Display device's timezone
  document.getElementById("deviceTimezone").innerText = "Your Timezone: " + timezoneName;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();

// Helper function to pad single-digit numbers with leading zeros
function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
