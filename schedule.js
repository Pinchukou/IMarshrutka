/**
 * Marshrutka Schedule Data
 * Directions: 'gomel' (to Kommunar) and 'kommunar' (to Gomel)
 */

export const scheduleData = {
    gomel: [
        { time: "06:55", days: "all" },
        { time: "07:20", days: "all" },
        { time: "07:35", days: "all" },
        { time: "08:10", days: "all" },
        { time: "08:35", days: "all" },
        { time: "09:00", days: "all" },
        { time: "09:25", days: "all" },
        { time: "09:50", days: "all" },
        { time: "10:15", days: "all" },
        { time: "10:55", days: "all" },
        { time: "11:55", days: "all" },
        { time: "12:20", days: "all" },
        { time: "13:10", days: "all" },
        { time: "13:30", days: "weekends" }, // сб, вс
        { time: "13:50", days: "all" },
        { time: "14:15", days: "all" },
        { time: "14:50", days: "all" },
        { time: "15:15", days: "all" },
        { time: "15:40", days: "all" },
        { time: "16:05", days: "all" },
        { time: "16:30", days: "all" },
        { time: "16:55", days: "all" },
        { time: "17:20", days: "all" },
        { time: "17:45", days: "all" },
        { time: "18:10", days: "all" },
        { time: "18:35", days: "all" },
        { time: "19:05", days: "all" },
        { time: "19:25", days: "all" },
        { time: "19:50", days: "all" }
    ],
    kommunar: [
        { time: "05:45", days: "weekdays" }, // пн-пт
        { time: "06:25", days: "all" },
        { time: "06:45", days: "all" },
        { time: "07:15", days: "all" },
        { time: "07:40", days: "all" },
        { time: "08:05", days: "all" },
        { time: "08:30", days: "all" },
        { time: "08:55", days: "all" },
        { time: "09:20", days: "all" },
        { time: "09:45", days: "all" },
        { time: "10:10", days: "all" },
        { time: "10:35", days: "all" },
        { time: "11:00", days: "all" },
        { time: "11:50", days: "all" },
        { time: "12:40", days: "all" },
        { time: "13:05", days: "all" },
        { time: "13:55", days: "all" },
        { time: "14:15", days: "weekends" }, // сб, вс
        { time: "14:45", days: "all" },
        { time: "15:10", days: "all" },
        { time: "15:35", days: "all" },
        { time: "16:00", days: "all" },
        { time: "16:25", days: "all" },
        { time: "16:50", days: "all" },
        { time: "17:15", days: "all" },
        { time: "17:40", days: "all" },
        { time: "18:05", days: "all" },
        { time: "18:30", days: "all" },
        { time: "18:55", days: "all" },
        { time: "19:20", days: "all" },
        { time: "19:50", days: "all" },
        { time: "20:10", days: "all" },
        { time: "20:35", days: "all" }
    ]
};

/**
 * Returns true if the schedule item should run on the given date
 * @param {Object} item - { time: string, days: 'all'|'weekdays'|'weekends' }
 * @param {Date} date - Date object to check
 * @returns {boolean}
 */
export function isRunningToday(item, date) {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = (day === 0 || day === 6);

    if (item.days === 'all') return true;
    if (item.days === 'weekdays') return !isWeekend;
    if (item.days === 'weekends') return isWeekend;
    return false;
}

/**
 * Get sorted array of time strings for a specific direction and date
 */
export function getScheduleForDate(direction, date) {
    const route = scheduleData[direction];
    if (!route) return [];

    return route
        .filter(item => isRunningToday(item, date))
        .map(item => item.time)
        .sort();
}
