import { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Input } from '../components/Input';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import { v4 as uuidv4 } from 'uuid';
import { AddIcon } from '../Icons/AddIcon';
import { RemoveIcon } from '../Icons/RemoveIcon';
import DatePicker from '../components/DatePicker';
import AggregationToggle from '../components/AggregationToggle';

const ChargePointForm: React.FC = () => {
	const { settings, setSettings, loading, setFormSubmitted } = useSimulation();
	const [chargePoints, setChargePoints] = useState(settings.chargePoints);
	const [aggregation, setAggregation] = useState(settings.aggregation);
	const [selectedDate, setSelectedDate] = useState(settings.selectedDate);
	const [arrivalMultiplier, setArrivalMultiplier] = useState(
		settings.arrivalMultiplier
	);
	const [consumptionPerKm, setConsumptionPerKm] = useState(
		settings.consumptionPerKm
	);

	const updateChargePoint = (
		id: string,
		field: 'power' | 'count',
		value: number
	) => {
		const newChargingPoints = [...chargePoints];
		setChargePoints(
			newChargingPoints.map((cp) =>
				cp.id === id ? { ...cp, [field]: value } : cp
			)
		);
	};

	const addChargePoint = () => {
		setChargePoints([...chargePoints, { power: 11, count: 1, id: uuidv4() }]);
	};

	const removeChargePoint = (id: string) => {
		const newChargingPoints = [...chargePoints];
		setChargePoints(newChargingPoints.filter((cp) => cp.id !== id));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormSubmitted(true);
		const newSettings = {
			arrivalMultiplier,
			consumptionPerKm,
			chargePoints,
			aggregation,
			selectedDate,
		};
		setSettings(newSettings);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 bg-stone-950 p-8 rounded-lg w-full max-w-xl'
		>
			<div className='flex row gap-6 md:w-full flex-col md:flex-row'>
				<Input
					label='Arrival Probability Multiplier (%)'
					value={settings.arrivalMultiplier}
					onChange={(val) => setArrivalMultiplier(val)}
					min={20}
					step={10}
				/>
				<Input
					label='Car Consumption (kWh/100km)'
					value={consumptionPerKm * 100}
					onChange={(val) => setConsumptionPerKm(val / 100)}
					step={0.1}
				/>
			</div>

			<div className='space-y-4'>
				<h3 className='font-semibold text-white'>Chargepoints</h3>
				{chargePoints.map((cp) => (
					<div
						key={cp.id}
						className='flex items-center gap-6 relative flex-wrap'
					>
						<Input
							label={`Power (kW)`}
							value={cp.power}
							onChange={(v) => updateChargePoint(cp.id, 'power', v)}
							className='flex-1 min-w-0'
						/>
						<Input
							label={`Count`}
							value={cp.count}
							onChange={(v) => updateChargePoint(cp.id, 'count', v)}
							className='flex-1 min-w-0'
						/>
						{chargePoints.length > 1 && (
							<IconButton
								icon={<RemoveIcon />}
								ariaLabel='Remove Charging Point'
								disabled={chargePoints.length === 1}
								onClick={() => removeChargePoint(cp.id)}
								className='absolute top-11 right-[-25px]'
							></IconButton>
						)}
					</div>
				))}
				<IconButton
					icon={<AddIcon />}
					ariaLabel='Add Charging Point'
					onClick={addChargePoint}
				></IconButton>
			</div>
			<div className='flex row gap-6 md:w-full flex-col md:flex-row'>
				<DatePicker
					selectedDate={selectedDate}
					label={'Select Exemplary Day'}
					onChange={setSelectedDate}
					ariaLabel='Exemplary Day'
				/>
				<AggregationToggle
					aggregation={aggregation}
					setAggregation={setAggregation}
				/>
			</div>

			<Button
				type='submit'
				className='mt-4'
				isLoading={loading}
				disabled={loading}
			>
				Run Simulation
			</Button>
		</form>
	);
};

export default ChargePointForm;
