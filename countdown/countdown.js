function updateCountdown() {
  // variables
  var now = new Date();
  var dayOfWeek = now.getDay();
  var timezoneOffset = now.getTimezoneOffset();
  var hours = Math.abs(Math.floor(timezoneOffset / 60));
  var minutes = Math.abs(timezoneOffset % 60);
  var sign = timezoneOffset > 0 ? "-" : "+";
  var timezoneName = "GMT" + sign + pad(hours) + ":" + pad(minutes);
  
// tried implementing a system to set a custom time but it broke everything

  console.log("Timezone:", timezoneName);

  var periods = [];
  
  if (dayOfWeek === 3) { // checking if wednesday
    periods = [
      { name: "Period 1", time: "09:30" },
      { name: "Period 2", time: "10:20" },
      { name: "Break", time: "11:10" },
      { name: "Period 3", time: "11:30" },
      { name: "Period 4", time: "12:20" },
      { name: "Lunch", time: "13:20" },
      { name: "Period 5", time: "14:20" },
      { name: "School ends", time: "15:20" }
    ];
  } else if (dayOfWeek === 0 || dayOfWeek === 6) { // checking if weekend, if it is will display the next period 1 on monday
    var daysUntilMonday = 1 + (dayOfWeek === 6 ? 1 : 0);
    var startOfNextWeek = new Date(now.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
    startOfNextWeek.setHours(8, 45, 0, 0);
    
    var timeUntilNextPeriod1 = startOfNextWeek.getTime() - now.getTime();
    
    if (timeUntilNextPeriod1 <= 0) {
      startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
      timeUntilNextPeriod1 = startOfNextWeek.getTime() - now.getTime();
    }
    
    var hours = Math.floor(timeUntilNextPeriod1 / (1000 * 60 * 60));
    var minutes = Math.floor((timeUntilNextPeriod1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntilNextPeriod1 % (1000 * 60)) / 1000);

    var countdownStr = "Period 1 starts in ";
    countdownStr += hours + "h " + minutes + "m " + seconds + "s";

    document.getElementById("countdown").innerText = countdownStr;
    
    document.getElementById("currentPeriod").innerText = "Weekend";
    document.getElementById("deviceTimezone").innerText = "Your Timezone: " + timezoneName;
    
    return;
  } else {
    periods = [ // probs could have put both of the arrays together but idk how alex help
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
  }

  var nextPeriod = null;
  
  for (var i = 0; i < periods.length; i++) {
    var periodTime = new Date(now.toDateString() + " " + periods[i].time);
    if (periodTime.getTime() > now.getTime()) {
      nextPeriod = periods[i];
      break;
    }
  }
// stupid logic (chatgpt did this from ealier)
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
    var startOfNextDay = new Date(now);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1);
    startOfNextDay.setHours(8, 45, 0, 0);
    var timeUntilNextPeriod1 = startOfNextDay.getTime() - now.getTime();

    var hours = Math.floor(timeUntilNextPeriod1 / (1000 * 60 * 60));
    var minutes = Math.floor((timeUntilNextPeriod1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntilNextPeriod1 % (1000 * 60)) / 1000);

    var countdownStr = "Period 1 starts in ";
    countdownStr += hours + "h " + minutes + "m " + seconds + "s";

    document.getElementById("countdown").innerText = countdownStr;
  }

  var currentPeriodStr = "";
  if (nextPeriod) {
    if (nextPeriod.name === "School ends") {
      currentPeriodStr = "Period 5";
    } else {
      var currentIndex = periods.findIndex(period => period.name === nextPeriod.name);
      var currentPeriodIndex = currentIndex > 0 ? currentIndex - 1 : periods.length - 1;
      currentPeriodStr = periods[currentPeriodIndex].name;
    }
  } else {
    currentPeriodStr = "School has finished";
  }

  document.getElementById("currentPeriod").innerText = currentPeriodStr;

  document.getElementById("deviceTimezone").innerText = "Your Timezone: " + timezoneName;
}

setInterval(updateCountdown, 1000);

updateCountdown();

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
