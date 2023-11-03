import { FC } from 'react';
import { BeatLoader } from 'react-spinners';

interface SpinnerProps {
	color?: string;
	margin?: number;
	size?: number;
	speedMultiplier?: number;
}

const defaultColor = '#ffc107';
const defaultMargin = 1;
const defaultSize = 80;
const defaultSpeedMultiplier = 1;

const Spinner: FC<SpinnerProps> = (props): JSX.Element => {
	const { color, margin, size, speedMultiplier } = props;

	return (
		<BeatLoader
			color={color || defaultColor}
			loading
			margin={margin || defaultMargin}
			size={size || defaultSize}
			speedMultiplier={speedMultiplier || defaultSpeedMultiplier}
		/>
	);
};

export default Spinner;
