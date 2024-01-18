import { FC, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/icomoon/eye';

import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { validateEmail, validatePassword } from './validationRules';
import FloatingInput from '../FloatingInput';

const LoginPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordIcon, setPasswordIcon] = useState(eye);
	const handleLogin = (formValues: { email: string; password: string }): void => {
		appDispatch(login(formValues))
			.then((res) => {
				const payload = res.payload as { message: string };
				if (payload.message) {
					console.error(payload.message);
				}
			})
			.catch(() => {});
	};
	const validationSchema = Yup.object({
		email: validateEmail(t),
		password: validatePassword(t),
	});

	const labelAuthorization = <p className="h3 login_register--header">{t('login')}</p>;

	const headerDescription = <p className="login_register--header">{t('header_desc')}</p>;
	const handlePasswordToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setPasswordShow(!passwordShow);
		setPasswordIcon(passwordShow ? eye : eyeBlocked);
	};

	const inputLogin = (
		<Form.Group as={Col} md="12" controlId="formEmail">
			<InputGroup>
				<Field
					as={FloatingInput}
					className="login_register--input"
					type="email"
					name="email"
					placeholder={t('placeholder_email')}
				/>
			</InputGroup>
			<ErrorMessage name="email" component="div" className="warning_message--validation" />
		</Form.Group>
	);
	const inputPassword = (
		<Form.Group as={Col} md="12" controlId="formPassword">
			<InputGroup>
				<div className="col d-flex">
					<div className="col-12 ">
						<Field
							as={FloatingInput}
							name="password"
							placeholder={t('placeholder_password')}
							type={passwordShow ? 'text' : 'password'}
						/>
					</div>
					<div className="col">
						<Icon
							icon={passwordIcon}
							size={24}
							onClick={(event) => {
								handlePasswordToggle(event);
							}}
							className="floating_input--icon_eye_password"
						/>
					</div>
				</div>
			</InputGroup>
			<ErrorMessage name="password" component="div" className="warning_message--validation" />
		</Form.Group>
	);

	const checkboxRememberMe = (
		<div className="d-flex">
			<Form.Check
				type="checkbox"
				id="checkbox_remember"
				className="login_register--checkbox mb-3"
			/>
			<div className="login_register--checkbox">{t('remember_me')}</div>
		</div>
	);
	const buttonForgotPassword = (
		<Form.Label className="px-3" id="forgot_password">
			<Link to="/restore_password" className="login_register--link pt-2">
				{t('forgot_your_password')}
			</Link>
		</Form.Label>
	);

	const buttonLogin = (
		<Button id="button_login" className="login_register--btn" name="submit" type="submit">
			{t('login')}
		</Button>
	);
	const labelOR = (
		<div className="login_register--divide mt-4">
			<span className="login_register--divide__text">{t('or')}</span>
		</div>
	);

	const labelDontHaveAccount = (
		<p className="login_register--signup__text">{t('dont_have_account')}</p>
	);
	const buttonRegisterNow = (
		<Link to="/register" className="login_register--btn">
			<Button id="button_register" className="login_register--btn" type="submit">
				{t('sign_up_now')}
			</Button>
		</Link>
	);
	return (
		<div className="login_register--container">
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					handleLogin(values);
					setSubmitting(false);
				}}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						{labelAuthorization}
						{headerDescription}
						{inputLogin}
						{inputPassword}
						<div className="d-flex">
							{checkboxRememberMe}
							{buttonForgotPassword}
						</div>
						{buttonLogin}
						{labelOR}
						{labelDontHaveAccount}
						{buttonRegisterNow}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginPage;
