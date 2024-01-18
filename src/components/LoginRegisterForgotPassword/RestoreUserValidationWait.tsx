import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const RestoreUserValidationWait: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(60);

	useEffect(() => {
		const redirectTimeout = setTimeout(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown > 0) {
					return prevCountdown - 1;
				} else {
					navigate('/home');
					return 0;
				}
			});
		}, 1000);

		return () => {
			clearTimeout(redirectTimeout);
		};
	}, [countdown, navigate]);

	const buttonLogin = (
		<Link to="/login" className="mt-3">
			<Button id="button_login" name="login" className="login_register--btn">
				{t('login')}
			</Button>
		</Link>
	);

	const countdownTimer = (
		<span className="login_register--flex_gray pt-4">
			{t('redirect_message', { seconds: countdown })}
		</span>
	);
	const restorePasswordText = <span>{t('restore_password_wait_text')}</span>;
	const restorePasswordHeader = (
		<div className="login_register--divide ">
			<span className="login_register--divide__text">{t('restore_password_wait_header')}</span>
		</div>
	);
	return (
		<div className="login_register--restore_password_wait row">
			{restorePasswordHeader}
			{restorePasswordText}
			{buttonLogin}
			{countdownTimer}
		</div>
	);
};

export default RestoreUserValidationWait;
