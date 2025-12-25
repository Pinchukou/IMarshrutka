import { scheduleData, isRunningToday, getScheduleForDate } from './schedule.js';

// State
let currentDirection = 'gomel'; // 'gomel' or 'kommunar'
let timerInterval = null;

// Themes
const themes = ['default', 'pink', 'blue', 'green'];

// DOM Elements
const tabGomel = document.querySelector('[data-direction="gomel"]');
const tabKommunar = document.querySelector('[data-direction="kommunar"]');
const countdownDisplay = document.getElementById('countdown-display');
const timeRemainingEl = document.getElementById('time-remaining');
const scheduleGrid = document.getElementById('schedule-grid');
const diceBtn = document.getElementById('dice-btn');
const body = document.body;

// Setup
function init() {
    setupEventListeners();
    render();
    startTimer();
}

function setupEventListeners() {
    tabGomel.addEventListener('click', () => setDirection('gomel'));
    tabKommunar.addEventListener('click', () => setDirection('kommunar'));
    diceBtn.addEventListener('click', randomizeTheme);
}

function setDirection(direction) {
    currentDirection = direction;

    // Update Tabs
    if (direction === 'gomel') {
        tabGomel.classList.add('active');
        tabKommunar.classList.remove('active');
    } else {
        tabGomel.classList.remove('active');
        tabKommunar.classList.add('active');
    }

    render();
}

function randomizeTheme() {
    const currentTheme = body.getAttribute('data-theme') || 'default';
    let newTheme = currentTheme;

    while (newTheme === currentTheme) {
        newTheme = themes[Math.floor(Math.random() * themes.length)];
    }

    body.setAttribute('data-theme', newTheme);
}

function render() {
    const now = new Date();
    const todaySchedule = getScheduleForDate(currentDirection, now);

    renderScheduleGrid(todaySchedule, now);
    updateCountdown(todaySchedule, now);
}

function renderScheduleGrid(schedule, now) {
    scheduleGrid.innerHTML = '';
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    schedule.forEach(timeStr => {
        const [h, m] = timeStr.split(':').map(Number);
        const busMinutes = h * 60 + m;

        const el = document.createElement('div');
        el.className = 'time-slot';
        el.textContent = timeStr;

        if (busMinutes < currentMinutes) {
            el.classList.add('past');
        } else if (!document.querySelector('.time-slot.next') && busMinutes >= currentMinutes) {
            el.classList.add('next');
        }

        scheduleGrid.appendChild(el);
    });
}

function updateCountdown(schedule, now) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nextBusMinutes = -1;
    let nextBusTimeStr = "";

    // Find next bus today
    for (const timeStr of schedule) {
        const [h, m] = timeStr.split(':').map(Number);
        const busMinutes = h * 60 + m;
        if (busMinutes >= currentMinutes) {
            nextBusMinutes = busMinutes;
            nextBusTimeStr = timeStr;
            break;
        }
    }

    if (nextBusMinutes !== -1) {
        // Bus is later today
        const diff = nextBusMinutes - currentMinutes;
        const diffH = Math.floor(diff / 60);
        const diffM = diff % 60;

        countdownDisplay.textContent = nextBusTimeStr;

        let remainingText = "";
        if (diffH > 0) remainingText += `${diffH}h `;
        remainingText += `${diffM}min`;
        timeRemainingEl.textContent = `Arrives in: ${remainingText}`;
    } else {
        // No more buses today
        countdownDisplay.textContent = "--:--";
        timeRemainingEl.textContent = "No more buses today";
    }
}

function startTimer() {
    // Update every second just to keep time accurate,
    // although our granularity is minutes.
    timerInterval = setInterval(() => {
        render(); // Re-render to update countdown and past/future classes
    }, 1000);
}

// Start
init();
