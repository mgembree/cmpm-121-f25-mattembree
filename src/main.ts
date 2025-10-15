// deno-lint-ignore-file

console.log("🎮 CMPM 121 - Starting...");

// Simple counter for demonstration
// deno-lint-ignore prefer-const
let counter: number = 0;
let frogps: number = 0;

// Add CSS styles
const styles = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Lucida Console", "Courier New", monospace;
      background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3a5 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #2d5016;
    }

    h1 {
      font-size: 3rem;
      color: #2d5016;
      text-shadow: 3px 3px 0px #88c999;
      margin-bottom: 30px;
      text-align: center;
    }


    p {
      font-size: 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      padding: 15px 25px;
      border-radius: 25px;
      border: 3px solid #88c999;
      margin-bottom: 30px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      text-align: center;
      min-width: 400px;
    }

    #count, #fps {
      font-weight: bold;
      color: #1a7431;
      font-size: 1.8rem;
    }

    button {
      font-size: 1.3rem;
      padding: 15px 30px;
      margin: 10px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      min-width: 200px;
    }

    #increment {
      background: linear-gradient(45deg, #ff6b6b, #ffa726);
      color: white;
      transform: scale(1);
    }

    #increment:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
    }

    #increment:active {
      transform: scale(0.95);
    }

    #auto-increment {
      background: linear-gradient(45deg, #4ecdc4, #45b7aa);
      color: white;
    }

    #auto-increment:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(78, 205, 196, 0.4);
    }

    #auto-increment:active {
      transform: scale(0.95);
    }

    .game-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 30px;
      padding: 40px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 2rem;
      }
      
      p {
        font-size: 1.2rem;
        min-width: 300px;
        padding: 10px 20px;
      }
      
      button {
        font-size: 1.1rem;
        padding: 12px 25px;
        min-width: 180px;
      }
    }
  </style>
`;

// Add HTML structure
document.head.insertAdjacentHTML('beforeend', styles);
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