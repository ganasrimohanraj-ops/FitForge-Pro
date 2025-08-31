const workouts = {
  cardio: ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers', 'Running in Place'],
  strength: ['Push-ups', 'Squats', 'Lunges', 'Plank', 'Deadlifts'],
  flexibility: ['Toe Touches', 'Yoga Flow', 'Hamstring Stretch', 'Quad Stretch', 'Shoulder Rolls']
};

const quotes = [
  "Push yourself, because no one else will do it for you.",
  "Sweat is just fat crying.",
  "You don’t have to be extreme, just consistent.",
  "One workout at a time, one day at a time.",
  "Discipline is the bridge between goals and accomplishment."
];

const startBtn = document.getElementById('startBtn');
const routineList = document.getElementById('routineList');
const timerDisplay = document.getElementById('timerDisplay');
const quoteEl = document.getElementById('quote');
const streakEl = document.getElementById('streak');

let routine = [];
let current = 0;

startBtn.addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const duration = parseInt(document.getElementById('duration').value);
  if (!duration || duration <= 0) return alert("Enter a valid duration");

  // Show quote
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Generate routine
  const pool = workouts[type];
  const rounds = Math.min(pool.length, Math.floor(duration / 5));
  routine = [];

  routineList.innerHTML = '';
  for (let i = 0; i < rounds; i++) {
    const ex = pool[Math.floor(Math.random() * pool.length)];
    routine.push(ex);
    const li = document.createElement('li');
    li.textContent = `${ex} - 30 sec`;
    routineList.appendChild(li);
  }

  current = 0;
  updateStreak();
  runExercise();
});

function runExercise() {
  if (current >= routine.length) {
    timerDisplay.textContent = "✅ Workout Complete!";
    return;
  }

  let time = 30;
  timerDisplay.textContent = `🏃 ${routine[current]} (${time}s)`;
  const interval = setInterval(() => {
    time--;
    timerDisplay.textContent = `🏃 ${routine[current]} (${time}s)`;
    if (time <= 0) {
      clearInterval(interval);
      runRest();
    }
  }, 1000);
}

function runRest() {
  let rest = 15;
  timerDisplay.textContent = `😌 Rest (${rest}s)`;
  const restInterval = setInterval(() => {
    rest--;
    timerDisplay.textContent = `😌 Rest (${rest}s)`;
    if (rest <= 0) {
      clearInterval(restInterval);
      current++;
      runExercise();
    }
  }, 1000);
}

function updateStreak() {
  const today = new Date().toLocaleDateString();
  let streak = JSON.parse(localStorage.getItem('fitforgeStreak')) || [];
  if (!streak.includes(today)) {
    streak.push(today);
    localStorage.setItem('fitforgeStreak', JSON.stringify(streak));
  }
  streakEl.textContent = `Streak: ${streak.length} day(s)`;
}