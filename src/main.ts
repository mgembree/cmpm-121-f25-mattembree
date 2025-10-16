// deno-lint-ignore-file

console.log("🎮 CMPM 121 - Starting...");

// Simple counter for demonstration
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
      <button id="auto-increment">👆 Frog Generator 👆</button>
    </div>
  </div>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("count")!;
const autoButton = document.getElementById("auto-increment")!;
const fpsElement = document.getElementById("fps")!;

//Default Clicker Button
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});

//Auto clicker Button
autoButton.addEventListener("click", () => {
  frogps++;
  fpsElement.textContent = frogps.toString();
  
  if (!animationId) {
    lastTime = performance.now();
    animationId = requestAnimationFrame(animate);
  }

  /* Step 3 - Using setInterval
  setInterval(() => {
    counter++;
    counterElement.textContent = counter.toString();
  }, 1000);
  */
});

// Step 4 - Animation function using requestAnimationFrame
function animate(currentTime: number) {
  if (frogps > 0) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // Calculate increment based on time passed
    // frogps = frogs per 1000ms
    const increment = (frogps * deltaTime) / 1000;
    counter += increment;
    
    counterElement.textContent = counter.toFixed(2);
  }
  
  animationId = requestAnimationFrame(animate);
}