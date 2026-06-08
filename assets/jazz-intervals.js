let audioContext;

const intervals = {
  beginner: ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Octave'],
  intermediate: ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
  advanced: ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave', 'Minor 9th', 'Major 9th', 'Minor 10th', 'Major 10th']
};

const intervalRatios = {
  'Minor 2nd': 16 / 15,
  'Major 2nd': 9 / 8,
  'Minor 3rd': 6 / 5,
  'Major 3rd': 5 / 4,
  'Perfect 4th': 4 / 3,
  'Tritone': Math.pow(2, 6 / 12),
  'Perfect 5th': 3 / 2,
  'Minor 6th': 8 / 5,
  'Major 6th': 5 / 3,
  'Minor 7th': 16 / 9,
  'Major 7th': 15 / 8,
  'Octave': 2,
  'Minor 9th': 16 / 7,
  'Major 9th': 9 / 4,
  'Minor 10th': 12 / 5,
  'Major 10th': 5 / 2
};

const noteFrequencies = {
  C: 261.63,
  'C#': 277.18,
  D: 293.66,
  'D#': 311.13,
  E: 329.63,
  F: 349.23,
  'F#': 369.99,
  G: 392.0,
  'G#': 415.3,
  A: 440.0,
  'A#': 466.16,
  B: 493.88
};

const noteColors = {
  C: '#ffd8dc',
  'C#': '#ffe0c4',
  D: '#fff4be',
  'D#': '#dff9d8',
  E: '#d8ebff',
  F: '#e8dcff',
  'F#': '#f5ddff',
  G: '#ffdcd1',
  'G#': '#d8f8ea',
  A: '#ffe2da',
  'A#': '#eadbc3',
  B: '#d8edd8'
};

let currentInterval = null;
let score = { correct: 0, incorrect: 0, intervalsCompleted: 0 };
let currentLevel = 'beginner';
let currentInstrument = 'sine';
let baseFrequency = noteFrequencies.A;
let answerLocked = false;

const intervalDisplay = document.getElementById('interval-display');
const feedbackElement = document.getElementById('feedback');
const intervalOptions = document.getElementById('interval-options');
const playIntervalBtn = document.getElementById('play-interval-btn');
const listenAgainBtn = document.getElementById('listen-again-btn');
const instrumentSelect = document.getElementById('instrument-select');
const rootNoteSelect = document.getElementById('root-note-select');
const newGameBtn = document.getElementById('new-game-btn');
const levelDisplay = document.getElementById('level-display');

function ensureAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      intervalDisplay.textContent = 'Your browser does not support Web Audio.';
      return null;
    }
    audioContext = new AudioCtx();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function playNote(frequency, duration = 0.55) {
  const ctx = ensureAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  oscillator.type = currentInstrument;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration + 0.02);
}

function updateScoreDisplay() {
  document.getElementById('correct-score').textContent = score.correct;
  document.getElementById('incorrect-score').textContent = score.incorrect;
  document.getElementById('intervals-completed').textContent = score.intervalsCompleted;
}

function setFeedback(message = '', status = '') {
  feedbackElement.textContent = message;
  feedbackElement.className = 'feedback-line';
  if (status) feedbackElement.classList.add(status);
}

function updateRootNoteAppearance(selectedNote) {
  rootNoteSelect.style.backgroundColor = noteColors[selectedNote] || '#ffffff';
}

function chooseInterval() {
  const bucket = intervals[currentLevel];
  return bucket[Math.floor(Math.random() * bucket.length)];
}

function playCurrentInterval() {
  if (!currentInterval) return;
  const ratio = intervalRatios[currentInterval];
  playNote(baseFrequency);
  window.setTimeout(() => playNote(baseFrequency * ratio), 500);
}

function updateIntervalOptions() {
  intervalOptions.innerHTML = '';

  const options = [currentInterval];
  while (options.length < 4) {
    const randomInterval = chooseInterval();
    if (!options.includes(randomInterval)) options.push(randomInterval);
  }

  options
    .sort(() => Math.random() - 0.5)
    .forEach((interval) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = interval;
      button.addEventListener('click', () => checkAnswer(interval));
      intervalOptions.appendChild(button);
    });
}

function playInterval() {
  ensureAudioContext();
  currentInterval = chooseInterval();
  answerLocked = false;
  intervalDisplay.textContent = 'Listen carefully';
  listenAgainBtn.style.display = 'inline-flex';
  rootNoteSelect.style.display = 'block';
  setFeedback('');
  updateIntervalOptions();
  playCurrentInterval();
}

function listenAgain() {
  if (!currentInterval) return;
  ensureAudioContext();
  playCurrentInterval();
}

function changeRootNote() {
  const selectedNote = rootNoteSelect.value;
  baseFrequency = noteFrequencies[selectedNote];
  updateRootNoteAppearance(selectedNote);
  if (currentInterval) {
    playNote(baseFrequency, 0.45);
  }
}

function checkAnswer(selectedInterval) {
  if (!currentInterval || answerLocked) return;

  if (selectedInterval === currentInterval) {
    answerLocked = true;
    score.correct += 1;
    score.intervalsCompleted += 1;
    updateScoreDisplay();
    intervalDisplay.textContent = currentInterval;
    setFeedback('Correct — next interval coming up.', 'correct');

    window.setTimeout(() => {
      playInterval();
    }, 900);
  } else {
    score.incorrect += 1;
    updateScoreDisplay();
    setFeedback('Incorrect. Try again.', 'incorrect');
  }
}

function newGame() {
  score = { correct: 0, incorrect: 0, intervalsCompleted: 0 };
  currentInterval = null;
  answerLocked = false;
  updateScoreDisplay();
  intervalOptions.innerHTML = '';
  listenAgainBtn.style.display = 'none';
  rootNoteSelect.style.display = 'none';
  intervalDisplay.textContent = 'Tap Play Interval to start';
  setFeedback('');
}

function changeLevel(level) {
  currentLevel = level;
  levelDisplay.textContent = `Current Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
  levelDisplay.className = `level-banner ${level}`;
  playIntervalBtn.className = level;
  newGame();
}

function changeInstrument() {
  currentInstrument = instrumentSelect.value;
}

playIntervalBtn.addEventListener('click', playInterval);
listenAgainBtn.addEventListener('click', listenAgain);
instrumentSelect.addEventListener('change', changeInstrument);
rootNoteSelect.addEventListener('change', changeRootNote);
newGameBtn.addEventListener('click', newGame);
document.getElementById('level-beginner').addEventListener('click', () => changeLevel('beginner'));
document.getElementById('level-intermediate').addEventListener('click', () => changeLevel('intermediate'));
document.getElementById('level-advanced').addEventListener('click', () => changeLevel('advanced'));

document.addEventListener('visibilitychange', () => {
  if (document.hidden && audioContext && audioContext.state === 'running') {
    audioContext.suspend();
  }
});

changeLevel('beginner');
updateRootNoteAppearance(rootNoteSelect.value);
