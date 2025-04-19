type DropdownProps<T> = {
	label: string;
	options: { label: string; value: T }[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
};

export function Dropdown<T extends string>({
	label,
	options,
	value,
	onChange,
	className = '',
}: DropdownProps<T>) {
	return (
		<label className={`flex flex-col gap-3 text-sm w-full ${className}`}>
			<span className='font-medium text-white'>{label}</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value as T)}
				className='
					h-[38px]
		bg-white text-gray-900
		border border-gray-300
		rounded-md pr-10 pl-3 py-2
		shadow-sm
		focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
		appearance-none
		relative
		transition
		select-arrow
				'
			>
				{options.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
					>
						{opt.label}
					</option>
				))}
			</select>
		</label>
	);
}
