import { Loader } from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	className = '',
	isLoading = false,
	disabled,
	...props
}) => (
	<button
		{...props}
		className={`bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md transition flex items-center  ${className} ${
			disabled ? '!bg-indigo-400 cursor-not-allowed' : ''
		}`}
		disabled={disabled}
	>
		{isLoading && <Loader />}
		{children}
	</button>
);

export default Button;
