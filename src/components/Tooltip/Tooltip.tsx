import { FC, ReactElement, useRef, useState } from 'react';

import '../../assets/scss/elements/_tooltip.module.scss';

export interface TooltipProps {
	text: string;
	children: ReactElement;
}

const DELAY_TIME = 1000;

const Tooltip: FC<TooltipProps> = ({ text, children }): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const refSetTimeout = useRef<NodeJS.Timeout>();

	const onMouseEnterHandler = (): void => {
		refSetTimeout.current = setTimeout(() => {
			setIsVisible(true);
		}, DELAY_TIME);
	};

	const onMouseLeaveHandler = (): void => {
		clearTimeout(refSetTimeout.current);
		setIsVisible(false);
	};

	return (
		<div
			className="tooltip__container"
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
		>
			{children}
			{isVisible && <div className="tooltip__text">{text}</div>}
		</div>
	);
};

export default Tooltip;
