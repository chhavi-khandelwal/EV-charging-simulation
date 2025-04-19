// Static dummy data for each aggregation level

import { AggregationLevel } from '../context/SimulationContext';

// Daily data (15-minute intervals for one day)
export const dummyDataDaily = [
	{
		period: '2025-04-01',
		chargepoints: [
			{ power: 11, count: 5 },
			{ power: 16, count: 4 },
		],
	},
	{
		period: '2025-04-02',
		chargepoints: [
			{ power: 11, count: 6 },
			{ power: 16, count: 3 },
		],
	},
	{
		period: '2025-04-03',
		chargepoints: [
			{ power: 11, count: 7 },
			{ power: 16, count: 2 },
		],
	},
];

// Monthly data (aggregate by day for the month)
export const dummyDataMonthly = [
	{
		period: '2025-01',
		chargepoints: [
			{ power: 11, count: 5 },
			{ power: 16, count: 4 },
		],
	},
	{
		period: '2025-02',
		chargepoints: [
			{ power: 11, count: 6 },
			{ power: 16, count: 3 },
		],
	},
	{
		period: '2025-03',
		chargepoints: [
			{ power: 11, count: 7 },
			{ power: 16, count: 2 },
		],
	},
];

// Yearly data (aggregate by month for the year)
export const dummyDataYearly = [
	{
		period: '2023',
		chargepoints: [
			{ power: 11, count: 5 },
			{ power: 16, count: 3 },
		],
	},
	{
		period: '2024',
		chargepoints: [
			{ power: 11, count: 6 },
			{ power: 16, count: 4 },
		],
	},
	{
		period: '2025',
		chargepoints: [
			{ power: 11, count: 7 },
			{ power: 16, count: 2 },
		],
	},
];

// Function to aggregate power usage for each aggregation level
export function aggregatePowerData(
	aggregation: AggregationLevel
): { period: string; powerUsed: number }[] {
	switch (aggregation) {
		case 'day':
			return dummyDataDaily.map((d) => ({
				period: d.period,
				powerUsed: d.chargepoints.reduce(
					(sum, cp) => sum + cp.power * cp.count,
					0
				),
			}));

		case 'month':
			return dummyDataMonthly.map((d) => ({
				period: d.period,
				powerUsed: d.chargepoints.reduce(
					(sum, cp) => sum + cp.power * cp.count,
					0
				),
			}));

		case 'year':
			return dummyDataYearly.map((d) => ({
				period: d.period,
				powerUsed: d.chargepoints.reduce(
					(sum, cp) => sum + cp.power * cp.count,
					0
				),
			}));

		default:
			return [];
	}
}
