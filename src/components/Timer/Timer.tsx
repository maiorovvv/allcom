import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeLeft {
	days: number;
	hours: string;
	minutes: string;
	secs: string;
}
interface TimeProps {
	time: number;
	font_size?: string;
	wigth?: string;
}

const Timer: FC<TimeProps> = ({ time, font_size, wigth }): JSX.Element => {
	const { t } = useTranslation('timer');

	const seconds = useRef(time);

	const HOURS_IN_DAY = 24;
	const MINUTES_IN_HOUR = 60;
	const SECONDS_IN_MINUTE = 60;

	const SECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
	const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

	const PAD_LENGTH = 2;

	const timerClass = seconds.current > SECONDS_IN_HOUR ? 'timer' : 'timer__last_moments';

	const calculateTimeLeft = (): TimeLeft => {
		if (seconds.current <= 0) {
			return {
				days: 0,
				hours: '0',
				minutes: '0',
				secs: '0',
			};
		}

		const days = Math.floor(seconds.current / SECONDS_IN_DAY);
		const hours = Math.floor((seconds.current % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
		const minutes = Math.floor((seconds.current % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
		const secs = seconds.current % SECONDS_IN_MINUTE;

		return {
			days,
			hours: hours.toString().padStart(PAD_LENGTH, '0'),
			minutes: minutes.toString().padStart(PAD_LENGTH, '0'),
			secs: secs.toString().padStart(PAD_LENGTH, '0'),
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (seconds.current <= 0) return;

			seconds.current--;
			setTimeLeft(calculateTimeLeft);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			{seconds.current ? (
				<div className={timerClass} style={{ fontSize: font_size, width: wigth, maxWidth: wigth }}>
					<div className="timer__item_days">
						{timeLeft.days} {t('days', { count: timeLeft.days })}
					</div>
					<div className="timer__items">{timeLeft.hours}:</div>
					<div className="timer__items">{timeLeft.minutes}:</div>
					<div className="timer__items">{timeLeft.secs}</div>
				</div>
			) : (
				<div className="timer__finish">{t('finish')}</div>
			)}
		</>
	);
};

export default Timer;
