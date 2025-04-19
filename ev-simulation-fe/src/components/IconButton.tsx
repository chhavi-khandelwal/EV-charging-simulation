import React from 'react';

interface IconButtonProps {
	icon: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	ariaLabel: string;
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	ariaLabel,
	className = '',
	disabled = false,
	type = 'button',
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			aria-label={ariaLabel}
			disabled={disabled}
			className={`
        inline-flex items-center justify-center
        rounded-full
        focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition hover:bg-gray-100
        ${className}
      `}
		>
			{icon}
		</button>
	);
};

export default IconButton;
