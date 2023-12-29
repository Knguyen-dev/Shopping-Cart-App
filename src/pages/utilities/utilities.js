export function getDateString(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export const createDateModule = (today = new Date()) => {
	const aMonthBefore = new Date(today);
	aMonthBefore.setMonth(today.getMonth() - 1);
	const aWeekLater = new Date(today);
	aWeekLater.setDate(today.getDate() + 7);
	const aYearLater = new Date(today);
	aYearLater.setFullYear(today.getFullYear() + 1);

	// Get integer representing the current year and create strings needed
	// for some tabs in the application
	const year = today.getFullYear();

	const todayStr = getDateString(today);
	const aMonthBeforeStr = getDateString(aMonthBefore);
	const aWeekLaterStr = getDateString(aWeekLater);
	const aYearLaterStr = getDateString(aYearLater);

	const lastThirtyDaysStr = `${aMonthBeforeStr},${todayStr}`;
	const thisWeekStr = `${todayStr},${aWeekLaterStr}`;
	const nextYearStr = `${todayStr},${aYearLaterStr}`;

	return {
		year,
		todayStr,
		lastThirtyDaysStr,
		thisWeekStr,
		nextYearStr,
	};
};
