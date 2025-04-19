import { AggregationLevel } from '../context/SimulationContext';

export const dummyEnergyDataDaily = [
	{ period: '2025-04-01', energy: 120 },
	{ period: '2025-04-02', energy: 135 },
	{ period: '2025-04-03', energy: 150 },
	{ period: '2025-04-04', energy: 110 },
	{ period: '2025-04-05', energy: 140 },
];

export const dummyEnergyDataMonthly = [
	{ period: '2025-01', energy: 3400 },
	{ period: '2025-02', energy: 3100 },
	{ period: '2025-03', energy: 3700 },
	{ period: '2025-04', energy: 2900 },
];

export const dummyEnergyDataYearly = [
	{ period: '2023', energy: 38500 },
	{ period: '2024', energy: 40200 },
	{ period: '2025', energy: 39500 },
];

export function getDummyEnergyData(aggregation: AggregationLevel) {
	switch (aggregation) {
		case 'day':
			return dummyEnergyDataDaily;
		case 'month':
			return dummyEnergyDataMonthly;
		case 'year':
			return dummyEnergyDataYearly;
		default:
			return [];
	}
}
