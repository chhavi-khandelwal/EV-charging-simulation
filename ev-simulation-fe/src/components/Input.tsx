export const Input: React.FC<{
	label: string;
	value: number;
	onChange: (v: number) => void;
	min?: number;
	step?: number;
	className?: string;
}> = ({ label, value, onChange, className, min = 0, step = 1 }) => (
	<label
		className={`flex flex-col gap-3 text-sm w-full ${className}`}
		htmlFor={label}
	>
		<span className='font-medium text-white'>{label}</span>
		<input
			id={label}
			type='number'
			className={`p-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
			value={value}
			min={min}
			step={step}
			onChange={(e) => onChange(Number(e.target.value))}
		/>
	</label>
);
