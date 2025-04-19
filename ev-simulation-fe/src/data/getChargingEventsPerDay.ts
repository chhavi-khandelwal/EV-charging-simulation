// data.ts

export const dummyEventDataDaily = [
	{ period: '2025-04-01', count: 12 },
	{ period: '2025-04-02', count: 15 },
	{ period: '2025-04-03', count: 11 },
	{ period: '2025-04-04', count: 18 },
	{ period: '2025-04-05', count: 14 },
];

export const dummyEventDataMonthly = [
	{ period: '2025-01', count: 310 },
	{ period: '2025-02', count: 280 },
	{ period: '2025-03', count: 340 },
	{ period: '2025-04', count: 295 },
];

export const dummyEventDataYearly = [
	{ period: '2023', count: 3700 },
	{ period: '2024', count: 4000 },
	{ period: '2025', count: 3890 },
];

export function getDummyEventData(aggregation: 'day' | 'month' | 'year') {
	switch (aggregation) {
		case 'day':
			return dummyEventDataDaily;
		case 'month':
			return dummyEventDataMonthly;
		case 'year':
			return dummyEventDataYearly;
		default:
			return [];
	}
}
