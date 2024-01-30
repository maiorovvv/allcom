import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const COUNTDOWN_START = 60;
const COUNTDOWN_END = 0;
const COUNTDOWN_DELAY = 1;
const COUNTDOWN_ONE_SECOND_IS = 1000;

const RestoreUserValidationWait: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(COUNTDOWN_START);
	useEffect(() => {
		const redirectTimeout = setTimeout(() => {
			if (countdown > COUNTDOWN_END) {
				setCountdown(countdown - COUNTDOWN_DELAY);
			} else {
				navigate('/home');
				setCountdown(COUNTDOWN_END);
			}
		}, COUNTDOWN_ONE_SECOND_IS);

		return () => {
			clearTimeout(redirectTimeout);
		};
	}, [countdown]);

	const buttonLogin = (
		<Link to="/login" className="mt-3">
			<Button
				id="button_login"
				name="login"
				className="login_register--btn"
				data-testid="button_login"
			>
				{t('login')}
			</Button>
		</Link>
	);

	const countdownTimer = (
		<span className="login_register--flex_gray pt-4" data-testid="countdown_timer">
			{t('redirect_message', { seconds: countdown })}
		</span>
	);

	const restorePasswordText = (
		<span data-testid="restorePasswordText">{t('restore_password_wait_text')}</span>
	);
	const restorePasswordHeader = (
		<div className="login_register--divide ">
			<span className="login_register--divide__text" data-testid="restorePasswordHeader">
				{t('restore_password_wait_header')}
			</span>
		</div>
	);
	const readyToLogIn = (
		<div className="pt-3">
			<div className="login_register--divide">
				<span className="login_register--divide__text" data-testid="readyToLogInText">
					{t('restore_password_ready_to_login')}
				</span>
			</div>
		</div>
	);

	return (
		<div className="login_register--restore_password_wait row">
			{restorePasswordHeader}
			{restorePasswordText}
			{readyToLogIn}
			{buttonLogin}
			{countdownTimer}
		</div>
	);
};

export default RestoreUserValidationWait;
