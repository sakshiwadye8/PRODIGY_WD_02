let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  hoursSpan.textContent = String(hours).padStart(2, "0");
  minutesSpan.textContent = String(minutes).padStart(2, "0");
  secondsSpan.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 1000); // No milliseconds, update every 1s

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
  isRunning = true;
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay(0);
  lapsList.innerHTML = '';

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  isRunning = false;
}

function addLap() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const lapText = `Lap ${lapsList.children.length + 1}: ` +
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}`;

  const li = document.createElement("li");
  li.textContent = lapText;
  lapsList.prepend(li);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
