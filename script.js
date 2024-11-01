let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const laps = document.getElementById('laps');

// Format time in mm:ss:ms
function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${ms}`;
}

// Start or pause the stopwatch
startStopButton.addEventListener('click', () => {
  if (!running) {
    startStopButton.textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    running = false;
  }
});

// Reset the stopwatch
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
  startStopButton.textContent = 'Start';
  laps.innerHTML = '';
  running = false;
});

// Record a lap time
lapButton.addEventListener('click', () => {
  if (running) {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    laps.appendChild(lapTime);
  }
});

