// ============================================
// AMANDA'S BEAUTY BAR — BOOKING FORM (Step 1)
// ============================================
// This file handles the multi-step booking form.
// Each step is a separate <div> that we show/hide.

// --- Step navigation helper ---
// "currentStep" tracks which step we are on (1, 2, 3, or 4)
let currentStep = 1;

// grabbing all the step divs into an array
const formSteps = [
  document.getElementById("formStep1"),
  document.getElementById("formStep2"),
  document.getElementById("formStep3"),
  document.getElementById("formStep4"),
];

// grabbing all the step indicator dots
const stepDots = [
  document.getElementById("step-dot-1"),
  document.getElementById("step-dot-2"),
  document.getElementById("step-dot-3"),
  document.getElementById("step-dot-4"),
];

// This function shows only the step we want, and hides the rest
function goToStep(stepNumber) {
  // stepNumber is 1-based (1, 2, 3, 4)
  // arrays are 0-based so we subtract 1 for the index

  formSteps.forEach((step, index) => {
    if (index === stepNumber - 1) {
      step.classList.remove("hidden"); // show this step
    } else {
      step.classList.add("hidden"); // hide all others
    }
  });

  // Update the step indicator dots
  stepDots.forEach((dot, index) => {
    dot.classList.remove("active", "completed");
    if (index < stepNumber - 1) {
      dot.classList.add("completed"); // steps already done
    } else if (index === stepNumber - 1) {
      dot.classList.add("active"); // current step
    }
  });

  currentStep = stepNumber;
}

// --- Step 1 → Step 2 ---
document.getElementById("nextToStep2").addEventListener("click", () => {
  // Simple validation: check name, phone, and service are filled in
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const service = document.getElementById("serviceSelect").value;

  if (!name) {
    alert("Please enter your full name.");
    return; // stop here, don't go to next step
  }
  if (!phone) {
    alert("Please enter your phone number.");
    return;
  }
  if (!service) {
    alert("Please select a service.");
    return;
  }

  goToStep(2); // all good — go to next step
});

// --- Step 2 → Step 1 (back button) ---
document.getElementById("backToStep1").addEventListener("click", () => {
  goToStep(1);
});

// --- Step 3 → Step 2 (back button) ---
document.getElementById("backToStep2").addEventListener("click", () => {
  goToStep(2);
});

// --- Step 4 → Step 3 (back button) ---
document.getElementById("backToStep3").addEventListener("click", () => {
  goToStep(3);
});
