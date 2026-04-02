const WHATSAPP_NUMBER = "27766590305";

const bookingData = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
};

let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth();

const formSteps = [
  document.getElementById("formStep1"),
  document.getElementById("formStep2"),
  document.getElementById("formStep3"),
  document.getElementById("formStep4"),
];

const stepDots = [
  document.getElementById("step-dot-1"),
  document.getElementById("step-dot-2"),
  document.getElementById("step-dot-3"),
  document.getElementById("step-dot-4"),
];

function goToStep(stepNumber) {
  formSteps.forEach(function (step, index) {
    if (index === stepNumber - 1) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });

  stepDots.forEach(function (dot, index) {
    dot.classList.remove("active", "completed");
    if (index < stepNumber - 1) {
      dot.classList.add("completed");
    } else if (index === stepNumber - 1) {
      dot.classList.add("active");
    }
  });

  if (stepNumber === 4) {
    populateSummary();
  }
}

function handleStep1Next() {
  const nameValue = document.getElementById("clientName").value.trim();
  const phoneValue = document.getElementById("clientPhone").value.trim();
  const serviceValue = document.getElementById("serviceSelect").value;

  if (!nameValue) {
    alert("Please enter your full name.");
    return;
  }
  if (!phoneValue) {
    alert("Please enter your phone number.");
    return;
  }
  if (!serviceValue) {
    alert("Please select a service.");
    return;
  }

  bookingData.name = nameValue;
  bookingData.phone = phoneValue;
  bookingData.service = serviceValue;

  goToStep(2);
  renderCalendar();
}

function formatDate(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function prettyDate(dateStr) {
  const parts = dateStr.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const monthNames = [
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

  document.getElementById("calendarMonthLabel").textContent =
    `${monthNames[calendarMonth]} ${calendarYear}`;

  const oldCells = grid.querySelectorAll(".cal-cell");
  oldCells.forEach(function (cell) {
    cell.remove();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("cal-cell", "cal-empty");
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("cal-cell");
    cell.textContent = day;

    const dateStr = formatDate(calendarYear, calendarMonth, day);
    const thisDate = new Date(calendarYear, calendarMonth, day);

    if (thisDate < today) {
      cell.classList.add("cal-past");
    } else {
      cell.classList.add("cal-available");
      cell.addEventListener(
        "click",
        (function (clickedDateStr, clickedCell) {
          return function () {
            handleDateClick(clickedDateStr, clickedCell);
          };
        })(dateStr, cell),
      );
    }

    if (dateStr === bookingData.date) {
      cell.classList.add("cal-selected");
    }

    grid.appendChild(cell);
  }

  updateDateLabel();
}

function handleDateClick(dateStr, cell) {
  const allSelected = document.querySelectorAll(".cal-cell.cal-selected");
  allSelected.forEach(function (c) {
    c.classList.remove("cal-selected");
  });

  cell.classList.add("cal-selected");
  bookingData.date = dateStr;

  updateDateLabel();

  document.getElementById("nextToStep3").disabled = false;
}

function updateDateLabel() {
  const label = document.getElementById("selectedDateLabel");
  if (bookingData.date) {
    label.textContent = `Selected: ${prettyDate(bookingData.date)}`;
    label.classList.add("has-date");
  } else {
    label.textContent = "No date selected yet.";
    label.classList.remove("has-date");
  }
}

function handleCalPrev() {
  calendarMonth = calendarMonth - 1;
  if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear = calendarYear - 1;
  }
  renderCalendar();
}

function handleCalNext() {
  calendarMonth = calendarMonth + 1;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear = calendarYear + 1;
  }
  renderCalendar();
}

function handleStep2Next() {
  if (!bookingData.date) {
    alert("Please select a date.");
    return;
  }
  goToStep(3);
}

function handleTimeSlotClick(slot) {
  const allSlots = document.querySelectorAll(".time-slot");
  allSlots.forEach(function (s) {
    s.classList.remove("time-selected");
  });

  slot.classList.add("time-selected");
  bookingData.time = slot.dataset.time;

  updateTimeLabel();

  document.getElementById("nextToStep4").disabled = false;
}

function updateTimeLabel() {
  const label = document.getElementById("selectedTimeLabel");
  const timeParts = bookingData.time.split(":");
  const hours = Number(timeParts[0]);
  const minutes = Number(timeParts[1]);
  const d = new Date();
  d.setHours(hours, minutes);
  const friendly = d.toLocaleTimeString("en-ZA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  label.textContent = `Selected: ${friendly}`;
  label.classList.add("has-time");
}

function handleStep3Next() {
  if (!bookingData.time) {
    alert("Please select a time.");
    return;
  }
  goToStep(4);
}

function populateSummary() {
  const timeParts = bookingData.time.split(":");
  const hours = Number(timeParts[0]);
  const minutes = Number(timeParts[1]);
  const d = new Date();
  d.setHours(hours, minutes);
  const friendlyTime = d.toLocaleTimeString("en-ZA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  document.getElementById("summaryName").textContent = bookingData.name;
  document.getElementById("summaryPhone").textContent = bookingData.phone;
  document.getElementById("summaryService").textContent = bookingData.service;
  document.getElementById("summaryDate").textContent = prettyDate(
    bookingData.date,
  );
  document.getElementById("summaryTime").textContent = friendlyTime;
}

function handleConfirmBooking() {
  const summaryTime = document.getElementById("summaryTime").textContent;

  const messageText =
    "Hi Amanda! I'd like to book an appointment.💕\n\n" +
    "Name: " +
    bookingData.name +
    "\n" +
    "Phone: " +
    bookingData.phone +
    "\n" +
    "Service: " +
    bookingData.service +
    "\n" +
    "Date: " +
    prettyDate(bookingData.date) +
    "\n" +
    "Time: " +
    summaryTime;

  const encodedMessage = encodeURIComponent(messageText);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

// Event Listeners
document
  .getElementById("nextToStep2")
  .addEventListener("click", handleStep1Next);
document.getElementById("backToStep1").addEventListener("click", function () {
  goToStep(1);
});

document.getElementById("calPrev").addEventListener("click", handleCalPrev);
document.getElementById("calNext").addEventListener("click", handleCalNext);
document
  .getElementById("nextToStep3")
  .addEventListener("click", handleStep2Next);
document.getElementById("backToStep2").addEventListener("click", function () {
  goToStep(2);
});

const timeSlotElements = document.querySelectorAll(".time-slot");
timeSlotElements.forEach(function (slot) {
  slot.addEventListener("click", function () {
    handleTimeSlotClick(slot);
  });
});

document
  .getElementById("nextToStep4")
  .addEventListener("click", handleStep3Next);
document.getElementById("backToStep3").addEventListener("click", function () {
  goToStep(3);
});

document
  .getElementById("confirmBooking")
  .addEventListener("click", handleConfirmBooking);
