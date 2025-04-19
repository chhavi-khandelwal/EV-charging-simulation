import { AggregationLevel } from '../context/SimulationContext';
import { Dropdown } from '../components/Dropdown';
interface DatePickerProps {
	aggregation: AggregationLevel;
	setAggregation: (val: AggregationLevel) => void;
}
const AggregationDropdown = ({
	aggregation,
	setAggregation,
}: DatePickerProps) => {
	const aggregationOptions: { label: string; value: AggregationLevel }[] = [
		{ label: 'Daily', value: 'day' },
		{ label: 'Monthly', value: 'month' },
		{ label: 'Yearly', value: 'year' },
	];

	return (
		<div className=' w-full'>
			<Dropdown
				label='Aggregation Level'
				options={aggregationOptions}
				value={
					aggregationOptions.filter((option) => option.value === aggregation)[0]
						.value
				}
				onChange={setAggregation}
			/>
		</div>
	);
};

export default AggregationDropdown;
