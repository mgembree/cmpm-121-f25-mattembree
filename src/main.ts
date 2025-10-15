// deno-lint-ignore-file

console.log("🎮 CMPM 121 - Starting...");

// Simple counter for demonstration
// deno-lint-ignore prefer-const
let counter: number = 0;
let frogps = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Frog Clicker</h1>
  <p>🐸Frogs: <span id="count">0</span> || Frogs Per Second 🐸 : <span id="fps">0</span> </p>
  <button id="increment">🪷Click Me!🪷</button>
  <button id="auto-increment">👆Frog Generator👆</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("count")!;
const autoButton = document.getElementById("auto-increment")!;
const fpsElement = document.getElementById("fps")!;

//Auto clicker Button
autoButton.addEventListener("click", () => {
    frogps++;
    fpsElement.textContent = frogps.toString();
  setInterval(() => {
    counter++;
    counterElement.textContent = counter.toString();
  }, 1000);
});

//Default Clicker Button
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});
