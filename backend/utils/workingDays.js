const axios = require('axios');

// Basic cache for reducing API calls since holidays don't change often
const holidayCache = {};

const fetchHolidays = async (year, countryCode = 'IN') => {
  const cacheKey = `${year}-${countryCode}`;
  if (holidayCache[cacheKey]) return holidayCache[cacheKey];

  try {
    const { data } = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidayDates = data.map(h => h.date); // Array of 'YYYY-MM-DD'
    holidayCache[cacheKey] = holidayDates;
    return holidayDates;
  } catch (err) {
    console.error(`Failed to fetch holidays for ${cacheKey}:`, err.message);
    return []; // Fall back to empty holidays on error
  }
};

const calculateWorkingDays = async (startDate, endDate) => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (start > end) return 0;

  const yearStart = start.getFullYear();
  const yearEnd = end.getFullYear();
  let holidays = [];

  // Fetch holidays for spanning years
  for (let y = yearStart; y <= yearEnd; y++) {
    const hols = await fetchHolidays(y, 'IN'); // Using India as default based on user locale
    holidays = holidays.concat(hols);
  }

  let workingDaysCount = 0;
  let current = new Date(start);

  while (current <= end) {
    const dayOfWeek = current.getDay();
    // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Check if it's a holiday
      const dateString = current.toISOString().split('T')[0];
      if (!holidays.includes(dateString)) {
        workingDaysCount++;
      }
    }
    current.setDate(current.getDate() + 1);
  }

  return workingDaysCount;
};

module.exports = { calculateWorkingDays };
