import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from 'chart.js';

import { useSimulation } from '../context/SimulationContext';
import { aggregatePowerData } from '../data/aggregatePowerData';
import { getDummyEnergyData } from '../data/getDummyEnergyData';
import { getDummyEventData } from '../data/getChargingEventsPerDay';
import { dummyEventDataExemplaryDay } from '../data/exemplaryDay';

ChartJS.register(
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
);

const DashboardCharts: React.FC = () => {
	const {
		settings: { aggregation, selectedDate },
	} = useSimulation();

	// Process events according to selected aggregation (day, month, or year)
	const aggregatedEnergy = getDummyEnergyData(aggregation);
	const aggregatedEvents = getDummyEventData(aggregation);

	const powerPerChargePoint = aggregatePowerData(aggregation);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full'>
			{/* 1. Power per Chargepoint */}
			<div className='bg-white p-4 rounded shadow w-full'>
				<h3 className='text-lg font-semibold mb-2'>
					Charging Power per {aggregation}
				</h3>
				<Bar
					data={{
						labels: powerPerChargePoint.map((d) => d.period),
						datasets: [
							{
								label: 'Power Used (kW)',
								data: powerPerChargePoint.map((d) => d.powerUsed),
								backgroundColor: '#3b82f6',
							},
						],
					}}
				/>
			</div>
			{/* 2. Exemplary Day View */}
			{selectedDate && (
				<div className='bg-white p-4 rounded shadow w-full'>
					<h3 className='text-lg font-semibold mb-2'>
						Charging Events on {selectedDate} - Exemplary Day
					</h3>
					<Bar
						data={{
							labels: dummyEventDataExemplaryDay.map((d) => d.hour),
							datasets: [
								{
									label: 'Events per Hour',
									data: dummyEventDataExemplaryDay.map((d) => d.count),
									backgroundColor: '#ec4899',
								},
							],
						}}
					/>
				</div>
			)}

			{/* 3. Total Energy Charged */}
			<div className='bg-white p-4 rounded shadow w-full'>
				<h3 className='text-lg font-semibold mb-2'>
					Total Energy Charged (kWh)
				</h3>
				<Bar
					data={{
						labels:
							aggregatedEnergy.length > 0
								? aggregatedEnergy.map((d) => d.period)
								: ['No Data'],
						datasets: [
							{
								label: 'kWh',
								data:
									aggregatedEnergy.length > 0
										? aggregatedEnergy.map((d) => d.energy)
										: [0],
								backgroundColor: '#f59e0b',
							},
						],
					}}
				/>
			</div>

			{/* 4. Charging Events Count */}
			<div className='bg-white p-4 rounded shadow w-full'>
				<h3 className='text-lg font-semibold mb-2'>
					Charging Events per {aggregation}
				</h3>
				<Bar
					data={{
						labels: aggregatedEvents.map((d) => d.period),
						datasets: [
							{
								label: 'Events',
								data: aggregatedEvents.map((d) => d.count),
								backgroundColor: '#6366f1',
							},
						],
					}}
				/>
			</div>
		</div>
	);
};

export default DashboardCharts;
