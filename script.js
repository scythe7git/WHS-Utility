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

  var currentPeriod = null;
  var nextPeriod = null;
  
  // Find the current and next periods
  for (var i = 0; i < periods.length; i++) {
    var periodTime = new Date(now.toDateString() + " " + periods[i].time);
    if (periodTime.getTime() <= now.getTime()) {
      currentPeriod = periods[i];
    } else {
      nextPeriod = periods[i];
      break;
    }
  }

  if (nextPeriod) {
    var timeDiff = new Date(now.toDateString() + " " + nextPeriod.time).getTime() - now.getTime();
    var hours = Math.floor(timeDiff / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    var countdownStr;
    if (nextPeriod.name === "School ends") {
      countdownStr = "School ending in ";
      // Start the confetti animation
      startConfetti();
    } else {
      countdownStr = nextPeriod.name + " starts in ";
    }

    countdownStr += hours + "h " + minutes + "m " + seconds + "s";

    document.getElementById("countdown").innerText = countdownStr;

    if (currentPeriod && currentPeriod.name !== "School ends") {
      document.getElementById("currentPeriod").innerText = "Current Period: " + currentPeriod.name;
    } else {
      document.getElementById("currentPeriod").innerText = "";
    }
  } else {
    document.getElementById("countdown").innerText = "School has finished for today.";
    document.getElementById("currentPeriod").innerText = "";
  }
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

// Function to start the confetti animation
function startConfetti() {
  var duration = 5000; // Duration of the confetti animation in milliseconds
  var startTime = Date.now();

  // Create confetti elements and animate them
  var confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  document.body.appendChild(confettiContainer);

  var intervalId = setInterval(function() {
    var timePassed = Date.now() - startTime;
    if (timePassed > duration) {
      clearInterval(intervalId);
      document.body.removeChild(confettiContainer); // Remove the confetti container after animation
    } else {
      createConfetti(confettiContainer);
    }
  }, 50);
}

// Function to create individual confetti elements
function createConfetti(container) {
  var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]; // List of possible confetti colors
  var confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.animationDuration = Math.random() * 3 + 2 + "s"; // Randomize animation duration between 2 and 5 seconds
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly choose a color
  container.appendChild(confetti);
}
