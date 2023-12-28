function getDateString(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export const datesModule = (() => {
	const today = new Date();

	const aMonthBefore = new Date(today);
	aMonthBefore.setMonth(today.getMonth() - 1);
	const aWeekLater = new Date(today);
	aWeekLater.setDate(today.getDate() + 7);
	const aYearLater = new Date(today);
	aYearLater.setFullYear(today.getFullYear() + 1);

	// Get numbers representing current year, month and day, which can be returned
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	const todayStr = getDateString(today);
	const aMonthBeforeStr = getDateString(aMonthBefore);
	const aWeekLaterStr = getDateString(aWeekLater);
	const aYearLaterStr = getDateString(aYearLater);

	const lastThirtyDaysStr = `${aMonthBeforeStr},${todayStr}`;
	const thisWeekStr = `${todayStr},${aWeekLaterStr}`;
	const nextYearStr = `${todayStr},${aYearLaterStr}`;

	return {
		year,
		month,
		day,
		todayStr,
		lastThirtyDaysStr,
		thisWeekStr,
		nextYearStr,
	};
})();
