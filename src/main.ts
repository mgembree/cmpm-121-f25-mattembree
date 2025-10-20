// deno-lint-ignore-file
// Frog Clicker Game

// deno-lint-ignore prefer-const
let counter: number = 0;
let frogps: number = 0;
let lastTime: number = 0;
let animationId: number | null = null;

// Item interface
interface Item {
  name: string;
  cost: number;
  rate: number;
  emoji: string;
}

const availableItems: Item[] = [
  { name: "Lily Pad", cost: 10, rate: 0.1, emoji: "🪷" },
  { name: "Bug Swarm", cost: 100, rate: 2, emoji: "🦟" },
  { name: "Frog Pond", cost: 1000, rate: 50, emoji: "🏞️" },
];

const purchaseCounts: number[] = new Array(availableItems.length).fill(0);

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
    .upgrade-btn {
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
    
    .upgrade-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      background: linear-gradient(45deg, #4169e1, #4682b4);
    }
    
    .upgrade-btn:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .upgrade-btn:disabled {
      background: linear-gradient(45deg, #999, #ccc);
      cursor: not-allowed;
      opacity: 0.6;
      border-color: #999;
    }
    
    .upgrade-btn-0:not(:disabled) {
      background: linear-gradient(45deg, #ff69b4, #ffb6c1);
      border-color: #ff1493;
    }
    
    .upgrade-btn-0:hover:not(:disabled) {
      background: linear-gradient(45deg, #ff1493, #ff69b4);
    }
    
    .upgrade-btn-1:not(:disabled) {
      background: linear-gradient(45deg, #8b4513, #daa520);
      border-color: #cd853f;
    }
    
    .upgrade-btn-1:hover:not(:disabled) {
      background: linear-gradient(45deg, #cd853f, #8b4513);
    }
    
    .upgrade-btn-2:not(:disabled) {
      background: linear-gradient(45deg, #20b2aa, #48d1cc);
      border-color: #008b8b;
    }
    
    .upgrade-btn-2:hover:not(:disabled) {
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
      
      .upgrade-btn {
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
      ${availableItems.map((item, index) =>
        `<button id="upgrade-${index}" class="upgrade-btn upgrade-btn-${index}" disabled>
          ${item.emoji} Buy ${item.name} (Cost: ${item.cost} Frogs) ${item.emoji}<br>
          Owned: <span id="count-${index}">0</span>
        </button>`
      ).join("")}
    </div>
  </div>
`;

// Button Handlers
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("count")!;
const fpsElement = document.getElementById("fps")!;

// Get all upgrade buttons and count elements dynamically
const upgradeButtons: HTMLButtonElement[] = [];
const countElements: HTMLElement[] = [];

for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons.push(
    document.getElementById(`upgrade-${i}`)! as HTMLButtonElement,
  );
  countElements.push(document.getElementById(`count-${i}`)!);
}

// Dynamic pricing function
function getUpgradeCost(baseCost: number, purchaseCount: number): number {
  return Math.round(baseCost * Math.pow(priceIncreaseFactor, purchaseCount));
}

// Function to update counters and buttons
function updateDisplay() {
  counterElement.textContent = counter.toFixed(2);
  frogps = Math.round(frogps * 10) / 10; // Fix floating point precision
  fpsElement.textContent = frogps.toFixed(1);

  // Update all items using loop
  for (let i = 0; i < availableItems.length; i++) {
    const item = availableItems[i];
    const purchaseCount = purchaseCounts[i];
    const cost = getUpgradeCost(item.cost, purchaseCount);

    // Update purchase counter display
    countElements[i].textContent = purchaseCount.toString();

    // Update button text with current cost
    upgradeButtons[i].innerHTML =
      `${item.emoji} Buy ${item.name} (Cost: ${cost} Frogs) ${item.emoji}<br>Owned: <span id="count-${i}">${purchaseCount}</span>`;

    // Update button availability
    upgradeButtons[i].disabled = counter < cost;
  }
}

//Step 4 - Animation function using requestAnimationFrame
function animate(currentTime: number) {
  if (frogps > 0) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    const increment = (frogps * deltaTime) / 1000;
    counter += increment;

    updateDisplay();
  }

  animationId = requestAnimationFrame(animate);
}

//Step 8 - Data-driven upgrade system using loops
// Add event listeners for all upgrade buttons using loops
for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons[i].addEventListener("click", () => {
    const item = availableItems[i];
    const cost = getUpgradeCost(item.cost, purchaseCounts[i]);

    if (counter >= cost) {
      counter -= cost;
      frogps += item.rate;
      purchaseCounts[i]++;
      updateDisplay();

      if (!animationId) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(animate);
      }
    }
  });
}

//Step 1|2 - Default Clicker Button with animation
button.addEventListener("click", () => {
  counter++;
  updateDisplay();

  // Add click animation
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 200);
});

updateDisplay();
