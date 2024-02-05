function updateCountdown() {
    fetch('https://worldtimeapi.org/api/timezone/Pacific/Auckland')
      .then(response => response.json())
      .then(data => {
        var now = new Date(data.datetime);
  
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
  
        var closestPeriod = null;
        for (var i = 0; i < periods.length; i++) {
          var periodTime = new Date(now.toDateString() + " " + periods[i].time);
          if (periodTime.getTime() > now.getTime()) {
            closestPeriod = periods[i];
            break;
          }
        }
  
        if (closestPeriod) {
          var timeDiff = periodTime.getTime() - now.getTime();
          var hours = Math.floor(timeDiff / (1000 * 60 * 60));
          var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
          var countdownStr = closestPeriod.name + " starts in ";
          countdownStr += hours + "h " + minutes + "m " + seconds + "s";
  
          document.getElementById("countdown").innerText = countdownStr;
        } else {
          document.getElementById("countdown").innerText = "School has finished for today.";
        }
      })
      .catch(error => {
        console.error('Error fetching time data:', error);
      });
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  
  // Initial update
  updateCountdown();
  