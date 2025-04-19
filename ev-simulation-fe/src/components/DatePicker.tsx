interface DatePickerProps {
	label: string;
	selectedDate: string;
	onChange: (val: string) => void;
	ariaLabel?: string;
}

const DatePicker = ({
	label,
	selectedDate,
	onChange,
	ariaLabel,
}: DatePickerProps) => {
	const today = new Date().toISOString().split('T')[0]; // format as YYYY-MM-DD

	return (
		<div className='w-full max-w-xs gap-3 flex flex-col'>
			<label
				className='block text-sm font-medium text-gray-200'
				htmlFor={label}
			>
				{label}
			</label>
			<input
				id={label}
				type='date'
				value={selectedDate}
				max={today}
				onChange={(e) => onChange(e.target.value)}
				className='
					w-full
					px-3 py-2
					rounded-md
					bg-white 
					border border-white	
					text-gray-800
					placeholder-gray-800
					focus:outline-none
					focus:ring-2 focus:ring-blue-500 focus:border-blue-500
					transition
				'
				aria-label={ariaLabel}
			/>
		</div>
	);
};

export default DatePicker;
