import { FC } from 'react';

type ButtonType = boolean | number;

interface ButtonProps<T extends ButtonType> {
	btnValue: T;
	text: string;
	widthBtn?: string;
	heightBtn?: string;
	isConfirm?: boolean;
	onClickBtn: (value: T) => void;
}

const Button: FC<ButtonProps<ButtonType>> = ({
	btnValue,
	text,
	widthBtn,
	onClickBtn,
	isConfirm,
	heightBtn,
}) => {
	const buttonStyle = {
		width: widthBtn,
		height: heightBtn,
	};

	const handleClick = (): void => {
		onClickBtn(btnValue);
	};

	return (
		<button
			className={`button ${isConfirm ? 'button__confirm' : ''}`}
			style={buttonStyle}
			onClick={handleClick}
		>
			{text}
		</button>
	);
};

export default Button;
