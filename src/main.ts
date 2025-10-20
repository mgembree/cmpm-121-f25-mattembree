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

// Add HTML structure with embedded CSS
document.body.innerHTML = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: "Comic Sans MS", cursive, sans-serif;
      background: linear-gradient(135deg, #87ceeb 0%, #98fb98 50%, #90ee90 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    /* Game container */
    .game-container {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 600px;
      width: 100%;
      border: 3px solid #228b22;
      position: relative;
    }
    
    /* Title */
    h1 {
      color: #2e8b57;
      font-size: 2.5rem;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      animation: bounce 2s infinite ease-in-out;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    
    /* Stats display */
    p {
      font-size: 1.3rem;
      color: #2e8b57;
      margin-bottom: 30px;
      font-weight: bold;
      background: rgba(144, 238, 144, 0.3);
      padding: 10px;
      border-radius: 10px;
      border: 2px solid #98fb98;
    }
    
    .button-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }
    
    /* Giant Frog Button */
    #increment {
      font-size: 8rem;
      padding: 20px;
      background: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 50%;
      position: relative;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
      user-select: none;
    }
    
    #increment:hover {
      transform: translateY(-8px) scale(1.05);
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
      animation: frogBounce 0.6s ease-in-out infinite;
    }
    
    #increment:active {
      transform: translateY(-2px) scale(0.95);
      filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes frogBounce {
      0%, 100% { transform: translateY(-8px) scale(1.05); }
      50% { transform: translateY(-12px) scale(1.08); }
    }
    
    @keyframes frogClick {
      0% { transform: scale(1); }
      50% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    
    #increment.clicked {
      animation: frogClick 0.2s ease-out;
    }
    
    /* Upgrade buttons */
    button[id^="upgrade"] {
      font-size: 1.1rem;
      padding: 15px 25px;
      background: linear-gradient(45deg, #4682b4, #87ceeb);
      color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
      border: 2px solid #4169e1;
      min-width: 300px;
      font-family: inherit;
      line-height: 1.4;
    }
    
    button[id^="upgrade"]:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      background: linear-gradient(45deg, #4169e1, #4682b4);
    }
    
    button[id^="upgrade"]:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    button[id^="upgrade"]:disabled {
      background: linear-gradient(45deg, #999, #ccc);
      cursor: not-allowed;
      opacity: 0.6;
      border-color: #999;
    }
    
    #upgradeA:not(:disabled) {
      background: linear-gradient(45deg, #ff69b4, #ffb6c1);
      border-color: #ff1493;
    }
    
    #upgradeA:hover:not(:disabled) {
      background: linear-gradient(45deg, #ff1493, #ff69b4);
    }
    
    #upgradeB:not(:disabled) {
      background: linear-gradient(45deg, #8b4513, #daa520);
      border-color: #cd853f;
    }
    
    #upgradeB:hover:not(:disabled) {
      background: linear-gradient(45deg, #cd853f, #8b4513);
    }
    
    #upgradeC:not(:disabled) {
      background: linear-gradient(45deg, #20b2aa, #48d1cc);
      border-color: #008b8b;
    }
    
    #upgradeC:hover:not(:disabled) {
      background: linear-gradient(45deg, #008b8b, #20b2aa);
    }
    
    /* Responsive design */
    @media (max-width: 600px) {
      .game-container {
        padding: 20px;
        margin: 10px;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      #increment {
        font-size: 6rem;
        padding: 15px;
      }
      
      button[id^="upgrade"] {
        min-width: 250px;
        font-size: 1rem;
      }
    }
    
    /* Add some sparkle animation */
    @keyframes sparkle {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    h1:hover {
      animation: sparkle 0.5s ease-in-out infinite;
    }
  </style>
  <div class="game-container">
    <h1>🐸 Frog Clicker 🐸</h1>
    <p>🐸 Frogs: <span id="count">0</span> || Frogs Per Second: <span id="fps">0</span> 🐸</p>
    <div class="button-container">
      <button id="increment">🐸</button>
      <button id="upgradeA" disabled>🪷 Buy Lily Pad (Cost: 10 Frogs) 🪷<br>Owned: <span id="countA">0</span></button>
      <button id="upgradeB" disabled>🦟 Buy Bug Swarm (Cost: 100 Frogs) 🦟<br>Owned: <span id="countB">0</span></button>
      <button id="upgradeC" disabled>🏞️ Buy Frog Pond (Cost: 1000 Frogs) 🏞️<br>Owned: <span id="countC">0</span></button>
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
  frogps = Math.round(frogps * 10) / 10; // Fix floating point precision
  fpsElement.textContent = frogps.toFixed(1);

  // Update purchase counters
  upgradeA_countElement.textContent = upgradeA_count.toString();
  upgradeB_countElement.textContent = upgradeB_count.toString();
  upgradeC_countElement.textContent = upgradeC_count.toString();

  const upgradeA_cost = getUpgradeCost(upgradeA_baseCost, upgradeA_count);
  const upgradeB_cost = getUpgradeCost(upgradeB_baseCost, upgradeB_count);
  const upgradeC_cost = getUpgradeCost(upgradeC_baseCost, upgradeC_count);

  upgradeButtonA.innerHTML =
    `🪷 Buy Lily Pad (Cost: ${upgradeA_cost} Frogs) 🪷<br>Owned: <span id="countA">${upgradeA_count}</span>`;
  upgradeButtonB.innerHTML =
    `🦟 Buy Bug Swarm (Cost: ${upgradeB_cost} Frogs) 🦟<br>Owned: <span id="countB">${upgradeB_count}</span>`;
  upgradeButtonC.innerHTML =
    `🏞️ Buy Frog Pond (Cost: ${upgradeC_cost} Frogs) 🏞️<br>Owned: <span id="countC">${upgradeC_count}</span>`;

  upgradeButtonA.disabled = counter < upgradeA_cost;
  upgradeButtonB.disabled = counter < upgradeB_cost;
  upgradeButtonC.disabled = counter < upgradeC_cost;
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
//Step 6 - Generalize upgrade system -- 10 Frogs for 0.1 fps || 100 Frogs for 2 fps || 1000 Frogs for 50 fps
upgradeButtonA.addEventListener("click", () => {
  const cost = getUpgradeCost(upgradeA_baseCost, upgradeA_count);
  if (counter >= cost) {
    counter -= cost; //Fixed: uses the calculated cost
    frogps += 0.1;
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
    counter -= cost;
    frogps += 2;
    upgradeB_count++;
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
    counter -= cost;
    frogps += 50;
    upgradeC_count++;
    updateDisplay();

    if (!animationId) {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
  }
});

//Step 1|2 - Default Clicker Button with animation
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
  
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 200);
});

updateDisplay();
