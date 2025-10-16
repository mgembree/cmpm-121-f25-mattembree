// deno-lint-ignore-file
// Frog Clicker Game

// deno-lint-ignore prefer-const
let counter: number = 0;
let frogps: number = 0;
let lastTime: number = 0;
let animationId: number | null = null;

// Add HTML structure
document.body.innerHTML = `
  <div class="game-container">
    <h1>🐸 Frog Clicker 🐸</h1>
    <p>🐸 Frogs: <span id="count">0</span> || Frogs Per Second 🐸: <span id="fps">0</span></p>
    <div class="button-container">
      <button id="increment">🪷 Click Me! 🪷</button>
      <button id="upgrade" disabled>🚀 Buy Upgrade (Cost: 10 frogs) 🚀</button>
    </div>
  </div>
`;

// Button Handlers
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("count")!;
const fpsElement = document.getElementById("fps")!;
const upgradeButton = document.getElementById("upgrade")! as HTMLButtonElement;

// Function to update counters and buttons
function updateDisplay() {
  counterElement.textContent = counter.toFixed(2);
  fpsElement.textContent = frogps.toString();
  upgradeButton.disabled = counter < 10;
}

//Step 4 - Animation function using requestAnimationFrame
function animate(currentTime: number) {
  if (frogps > 0) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Calculate increment based on time passed
    // frogps per second = frogps per 1000ms
    const increment = (frogps * deltaTime) / 1000;
    counter += increment;

    updateDisplay();
  }

  animationId = requestAnimationFrame(animate);
}

//Step 5 - Auto clicker Upgrade Button
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    frogps++;
    updateDisplay();

    if (!animationId) {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  }
});

//Step 1|2 - Default Clicker Button
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

updateDisplay();
