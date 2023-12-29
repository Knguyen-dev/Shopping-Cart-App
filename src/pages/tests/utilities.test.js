import { describe, it, expect } from "vitest";
import { getDateString, createDateModule } from "../utilities/utilities";

describe("Testing date string conversion", () => {
	it("Expect January 1st, 2015 to be '2015-01-01' ", () => {
		const date = new Date(2015, 0, 1);
		expect(getDateString(date)).toBe("2015-01-01");
	});

	it("Expect March 7th, 2022 to be '2022-03-07' ", () => {
		const date = new Date(2022, 2, 7);
		expect(getDateString(date)).toBe("2022-03-07");
	});

	it("Expect July 31st, 2009 to be '2009-07-31' ", () => {
		const date = new Date(2009, 6, 31);
		expect(getDateString(date)).toBe("2009-07-31");
	});

	it("Expect February 29th, 2024 to be '2024-02-29' ", () => {
		const date = new Date(2024, 1, 29);
		expect(getDateString(date)).toBe("2024-02-29");
	});
});

describe("Testing datesModule", () => {
	it("Expect correct dates for 'April 13th, 2021'", () => {
		const date = new Date(2021, 3, 13);
		const { year, todayStr, lastThirtyDaysStr, thisWeekStr, nextYearStr } =
			createDateModule(date);
		expect(year).toBe(2021);
		expect(todayStr).toBe("2021-04-13");
		expect(lastThirtyDaysStr).toBe("2021-03-13,2021-04-13");
		expect(thisWeekStr).toBe("2021-04-13,2021-04-20");
		expect(nextYearStr).toBe("2021-04-13,2022-04-13");
	});

	it("Expect correct dates for 'March 7th, 2022'", () => {
		const date = new Date(2022, 2, 7);
		const { year, todayStr, lastThirtyDaysStr, thisWeekStr, nextYearStr } =
			createDateModule(date);
		expect(year).toBe(2022);
		expect(todayStr).toBe("2022-03-07");
		expect(lastThirtyDaysStr).toBe("2022-02-07,2022-03-07");
		expect(thisWeekStr).toBe("2022-03-07,2022-03-14");
		expect(nextYearStr).toBe("2022-03-07,2023-03-07");
	});

	it("Expect correct dates for 'December 31st, 2023'", () => {
		const date = new Date(2023, 11, 31); // December 31st, 2023
		const { year, todayStr, lastThirtyDaysStr, thisWeekStr, nextYearStr } =
			createDateModule(date);
		expect(year).toBe(2023);
		expect(todayStr).toBe("2023-12-31");
		expect(lastThirtyDaysStr).toBe("2023-12-01,2023-12-31"); // Assuming a month before is December 1st
		expect(thisWeekStr).toBe("2023-12-31,2024-01-07"); // Assuming a week later is January 7th, 2024
		expect(nextYearStr).toBe("2023-12-31,2024-12-31"); // Next year should be December 31st, 2024
	});

	it("Expect correct dates for 'February 29th, 2024' (Leap Year)", () => {
		const date = new Date(2024, 1, 29); // February 29th, 2024 (Leap Year)
		const { year, todayStr, lastThirtyDaysStr, thisWeekStr, nextYearStr } =
			createDateModule(date);
		expect(year).toBe(2024);
		expect(todayStr).toBe("2024-02-29");
		expect(lastThirtyDaysStr).toBe("2024-01-29,2024-02-29"); // Assuming a month before is January 30th
		expect(thisWeekStr).toBe("2024-02-29,2024-03-07"); // Assuming a week later is March 7th, 2024
		expect(nextYearStr).toBe("2024-02-29,2025-03-01"); // Next year should be February 29th, 2025 (Leap Year)
	});
});
