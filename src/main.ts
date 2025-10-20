// deno-lint-ignore-file
// Frog Clicker Game

// deno-lint-ignore prefer-const
let counter: number = 0;
let frogps: number = 0;
let lastTime: number = 0;
let animationId: number | null = null;

// Purchase counters
let upgradeA_count: number = 0;
let upgradeB_count: number = 0;
let upgradeC_count: number = 0;

// Base costs for upgrades
const upgradeA_baseCost: number = 10;
const upgradeB_baseCost: number = 100;
const upgradeC_baseCost: number = 1000;
const priceIncreaseFactor: number = 1.15;

// Add HTML structure
document.body.innerHTML = `
  <div class="game-container">
    <h1>🐸 Frog Clicker 🐸</h1>
    <p>🐸 Frogs: <span id="count">0</span> || Frogs Per Second 🐸: <span id="fps">0</span></p>
    <div class="button-container">
      <button id="increment">🪷 Click Me! 🪷</button>
      <button id="upgradeA" disabled>🚀 Buy Upgrade A (Cost: 10 frogs) 🚀<br>Owned: <span id="countA">0</span></button>
      <button id="upgradeB" disabled>🚀 Buy Upgrade B (Cost: 100 frogs) 🚀<br>Owned: <span id="countB">0</span></button>
      <button id="upgradeC" disabled>🚀 Buy Upgrade C (Cost: 1000 frogs) 🚀<br>Owned: <span id="countC">0</span></button>
      </div>
  </div>
`;

// Button Handlers
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("count")!;
const fpsElement = document.getElementById("fps")!;
const upgradeButtonA = document.getElementById(
  "upgradeA",
)! as HTMLButtonElement;
const upgradeButtonB = document.getElementById(
  "upgradeB",
)! as HTMLButtonElement;
const upgradeButtonC = document.getElementById(
  "upgradeC",
)! as HTMLButtonElement;

// Purchase counter elements
const upgradeA_countElement = document.getElementById("countA")!;
const upgradeB_countElement = document.getElementById("countB")!;
const upgradeC_countElement = document.getElementById("countC")!;

// Function to update counters and buttons
function updateDisplay() {
  counterElement.textContent = counter.toFixed(2);
  fpsElement.textContent = frogps.toFixed(1); // Fixed floating point precision

  // Update purchase counters
  upgradeA_countElement.textContent = upgradeA_count.toString();
  upgradeB_countElement.textContent = upgradeB_count.toString();
  upgradeC_countElement.textContent = upgradeC_count.toString();

  const upgradeA_cost = getUpgradeCost(upgradeA_baseCost, upgradeA_count);
  const upgradeB_cost = getUpgradeCost(upgradeB_baseCost, upgradeB_count);
  const upgradeC_cost = getUpgradeCost(upgradeC_baseCost, upgradeC_count);

  upgradeButtonA.innerHTML =
    `🚀 Buy Upgrade A (Cost: ${upgradeA_cost} frogs) 🚀<br>Owned: <span id="countA">${upgradeA_count}</span>`;
  upgradeButtonB.innerHTML =
    `🚀 Buy Upgrade B (Cost: ${upgradeB_cost} frogs) 🚀<br>Owned: <span id="countB">${upgradeB_count}</span>`;
  upgradeButtonC.innerHTML =
    `🚀 Buy Upgrade C (Cost: ${upgradeC_cost} frogs) 🚀<br>Owned: <span id="countC">${upgradeC_count}</span>`;

  upgradeButtonA.disabled = counter < upgradeA_baseCost;
  upgradeButtonB.disabled = counter < upgradeB_baseCost;
  upgradeButtonC.disabled = counter < upgradeC_baseCost;
}

//Step 7 - Dynamic pricing function
function getUpgradeCost(baseCost: number, purchaseCount: number): number {
  return Math.round(baseCost * Math.pow(priceIncreaseFactor, purchaseCount));
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
//Step 6 - Generalize upgrade system -- 10 frogs for 0.1 fps || 100 frogs for 2 fps || 1000 frogs for 50 fps
upgradeButtonA.addEventListener("click", () => {
  const cost = getUpgradeCost(upgradeA_baseCost, upgradeA_count);
  if (counter >= cost) {
    counter -= 10;
    frogps += 0.1;
    frogps = Math.round(frogps * 10) / 10; // Fix floating point precision
    upgradeA_count++; // Increment purchase counter
    updateDisplay();

    if (!animationId) {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  }
});

upgradeButtonB.addEventListener("click", () => {
  const cost = getUpgradeCost(upgradeB_baseCost, upgradeB_count);
  if (counter >= cost) {
    counter -= 100;
    frogps += 2;
    upgradeB_count++; // Increment purchase counter
    updateDisplay();

    if (!animationId) {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  }
});

upgradeButtonC.addEventListener("click", () => {
  const cost = getUpgradeCost(upgradeC_baseCost, upgradeC_count);
  if (counter >= cost) {
    counter -= 1000;
    frogps += 50;
    upgradeC_count++; // Increment purchase counter
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
