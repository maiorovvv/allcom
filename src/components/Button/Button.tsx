import { FC } from 'react';

interface ButtonProps {
	btnType: boolean;
	text: string;
	widthBtn?: string;
	heigthBtn?: string;
	isConfirm?: boolean;
	onClickBtn: (flag?: boolean) => void;
}

const Button: FC<ButtonProps> = ({ btnType, text, widthBtn, onClickBtn, isConfirm }) => {
	const buttonStyle = {
		width: widthBtn,
	};

	const handleClick = (): void => {
		onClickBtn(btnType);
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
