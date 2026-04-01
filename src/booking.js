// ============================================
// AMANDA'S BEAUTY BAR — BOOKING FORM
// ============================================

// -----------------------------------------------
// BOOKING DATA — stores what the user selects
// We build this up across all 4 steps
// -----------------------------------------------
const bookingData = {
  name: "",
  phone: "",
  service: "",
  date: "", // will be set in Step 2
  time: "", // will be set in Step 3
};

// -----------------------------------------------
// CALENDAR STATE — tracks which month is showing
// -----------------------------------------------
let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth(); // 0 = January, 11 = December

// -----------------------------------------------
// STEP NAVIGATION
// -----------------------------------------------
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
  formSteps.forEach((step, index) => {
    step.classList.toggle("hidden", index !== stepNumber - 1);
  });

  stepDots.forEach((dot, index) => {
    dot.classList.remove("active", "completed");
    if (index < stepNumber - 1) dot.classList.add("completed");
    else if (index === stepNumber - 1) dot.classList.add("active");
  });
}

// -----------------------------------------------
// STEP 1 — Validation & moving to Step 2
// -----------------------------------------------
document.getElementById("nextToStep2").addEventListener("click", () => {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const service = document.getElementById("serviceSelect").value;

  if (!name) {
    alert("Please enter your full name.");
    return;
  }
  if (!phone) {
    alert("Please enter your phone number.");
    return;
  }
  if (!service) {
    alert("Please select a service.");
    return;
  }

  // Save to bookingData
  bookingData.name = name;
  bookingData.phone = phone;
  bookingData.service = service;

  goToStep(2);
  renderCalendar(); // build the calendar when we arrive on step 2
});

// -----------------------------------------------
// STEP 2 — CALENDAR
// -----------------------------------------------

// Helper: format a Date object as "YYYY-MM-DD"
function formatDate(year, month, day) {
  const mm = String(month + 1).padStart(2, "0"); // month is 0-based, padStart adds a leading 0 if needed
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

// Helper: format "YYYY-MM-DD" into a readable string like "Saturday, 5 April 2026"
function prettyDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Renders the calendar grid for calendarYear / calendarMonth
function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const monthLabel = document.getElementById("calendarMonthLabel");

  // Update the month/year label at the top
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
  monthLabel.textContent = `${monthNames[calendarMonth]} ${calendarYear}`;

  // Clear old grid cells (but keep the day-name headers)
  const oldCells = grid.querySelectorAll(".cal-cell");
  oldCells.forEach((cell) => cell.remove());

  // Today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // strip time so comparison is date-only

  // What day of the week does the 1st fall on? (0=Sun, 6=Sat)
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();

  // How many days are in this month?
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  // Add empty cells for days before the 1st
  // (e.g. if 1st is Wednesday, we need 3 blank cells)
  for (let i = 0; i < firstDayOfMonth; i++) {
    const empty = document.createElement("div");
    empty.classList.add("cal-cell", "cal-empty");
    grid.appendChild(empty);
  }

  // Add a cell for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("cal-cell");
    cell.textContent = day;

    const dateStr = formatDate(calendarYear, calendarMonth, day);
    const thisDate = new Date(calendarYear, calendarMonth, day);

    // --- Apply states ---

    // 1. Past date → greyed out, not clickable
    if (thisDate < today) {
      cell.classList.add("cal-past");
    }
    // 2. Available date → clickable
    else {
      cell.classList.add("cal-available");
      cell.addEventListener("click", () => selectDate(dateStr, cell));
    }

    // 4. Already selected → highlight it
    if (dateStr === bookingData.date) {
      cell.classList.add("cal-selected");
    }

    grid.appendChild(cell);
  }

  // Update the selected date label below the calendar
  updateDateLabel();
}

// Called when user clicks an available date
function selectDate(dateStr, cell) {
  // Remove highlight from previously selected cell
  document.querySelectorAll(".cal-cell.cal-selected").forEach((c) => {
    c.classList.remove("cal-selected");
  });

  // Highlight the clicked cell
  cell.classList.add("cal-selected");

  // Save the date
  bookingData.date = dateStr;

  // Update the label
  updateDateLabel();

  // Enable the Next button
  document.getElementById("nextToStep3").disabled = false;
}

// Shows the selected date in plain English below the calendar
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

// Prev month button
document.getElementById("calPrev").addEventListener("click", () => {
  calendarMonth--;
  if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear--;
  }
  renderCalendar();
});

// Next month button
document.getElementById("calNext").addEventListener("click", () => {
  calendarMonth++;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear++;
  }
  renderCalendar();
});

// Step 2 → Step 3
document.getElementById("nextToStep3").addEventListener("click", () => {
  if (!bookingData.date) {
    alert("Please select a date.");
    return;
  }
  goToStep(3);
});

// Step 2 → back to Step 1
document.getElementById("backToStep1").addEventListener("click", () => {
  goToStep(1);
});

// -----------------------------------------------
// STEP 3 & 4 — back buttons (placeholders for now)
// -----------------------------------------------
document.getElementById("backToStep2").addEventListener("click", () => {
  goToStep(2);
});

document.getElementById("backToStep3").addEventListener("click", () => {
  goToStep(3);
});
