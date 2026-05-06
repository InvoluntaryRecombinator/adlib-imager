// ==========================================
// 1. THE STATE (Mad Lib Templates)
// ==========================================
const templates = {
  "1": { // 3 Fields
    labels: ["Animal", "Silly Noun", "Location"],
    buildString: (inputs) => `A highly detailed cinematic photo of a giant ${inputs[0]} wearing a suit made of ${inputs[1]} standing aggressively inside a ${inputs[2]}.`
  },
  "2": { // 4 Fields
    labels: ["Profession", "Adjective", "Food Item", "Verb (Ending in -ing)"],
    buildString: (inputs) => `A stressed out ${inputs[0]} who looks incredibly ${inputs[1]}, desperately ${inputs[3]} a massive, glowing ${inputs[2]} in a dark room.`
  },
  "3": { // 5 Fields
    labels: ["Historical Figure", "Vehicle", "Weapon", "Mythical Creature", "Weather Event"],
    buildString: (inputs) => `An epic oil painting of ${inputs[0]} driving a ${inputs[1]} while wielding a ${inputs[2]} to fight a terrifying ${inputs[3]} during a ${inputs[4]}.`
  }
};

let currentTemplateId = "1";

// ==========================================
// 2. THE SETUP (DOM Elements)
// ==========================================
const dynamicInputsContainer = document.getElementById("dynamic-inputs");
const templateButtons = document.querySelectorAll(".template-btn");
const form = document.getElementById("madlib-form");
const submitBtn = document.getElementById("submit-btn");

const loadingState = document.getElementById("loading-state");
const resultImage = document.getElementById("result-image");

const revealBtn = document.getElementById("reveal-btn");
const hiddenPromptText = document.getElementById("hidden-prompt-text");

// ==========================================
// 3. THE LOGIC (Functions)
// ==========================================

// Function to build the input fields on the screen
function renderFields(templateId) {
  // Clear old fields
  dynamicInputsContainer.innerHTML = ""; 
  
  const currentLabels = templates[templateId].labels;
  
  // Loop through the labels and create HTML for each one
  currentLabels.forEach((label, index) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "input-group";

    const labelEl = document.createElement("label");
    labelEl.textContent = label;

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.required = true;
    inputEl.className = "dynamic-input"; // Class to easily grab them later

    groupDiv.appendChild(labelEl);
    groupDiv.appendChild(inputEl);
    dynamicInputsContainer.appendChild(groupDiv);
  });
}

// ==========================================
// 4. THE TRIGGERS (Event Listeners)
// ==========================================

// Trigger A: Clicking a Template Button
templateButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons, add to the clicked one
    templateButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Update state and re-render fields
    currentTemplateId = btn.getAttribute("data-template");
    renderFields(currentTemplateId);
  });
});

// Trigger B: Clicking the Reveal Button
revealBtn.addEventListener("click", () => {
  revealBtn.style.display = "none";
  hiddenPromptText.style.display = "block";
});

// Trigger C: Submitting the Form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // 1. Lock UI
  submitBtn.textContent = "Generating...";
  submitBtn.disabled = true;
  resultImage.style.display = "none";
  loadingState.style.display = "block";

  // 2. Reset Reveal area
  revealBtn.style.display = "none";
  hiddenPromptText.style.display = "none";

  // 3. Gather all inputs dynamically
  const inputElements = document.querySelectorAll(".dynamic-input");
  const userValues = Array.from(inputElements).map(input => input.value);

  // 4. Build Prompt
  const finalPrompt = templates[currentTemplateId].buildString(userValues);
  
  // 5. Update Reveal logic
  hiddenPromptText.textContent = `"${finalPrompt}"`;

  // 6. Fetch Image
  const safePrompt = encodeURIComponent(finalPrompt);
  
  resultImage.onload = () => {
      loadingState.style.display = "none";
      resultImage.style.display = "block"; 
      
      submitBtn.textContent = "Generate Masterpiece"; 
      submitBtn.disabled = false;
      
      revealBtn.style.display = "block"; // Show the reveal button once image loads
  };

  // Trigger API (Uses API_KEY from config.js)
  resultImage.src = `https://gen.pollinations.ai/image/${safePrompt}?key=${API_KEY}`;
});

// Initialize the very first template on page load
renderFields(currentTemplateId);