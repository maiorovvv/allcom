import { FC, ReactElement, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface TooltipProps {
	text: string;
	children: ReactElement;
}

const Tooltip: FC<TooltipProps> = ({ text, children }): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const refSetTimeout = useRef<NodeJS.Timeout>();

	const onMouseEnterHandler = (): void => {
		refSetTimeout.current = setTimeout(() => {
			setIsVisible(true);
		}, 1000);
	};

	const onMouseLeaveHandler = (): void => {
		clearTimeout(refSetTimeout.current);
		setIsVisible(false);
	};

	return (
		<div onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
			{children}
			{isVisible && <div className="tooltip__text">{text}</div>}
		</div>
	);
};

export default Tooltip;
