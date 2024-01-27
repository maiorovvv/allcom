import { FC, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-icons-kit';
import { eyeBlocked, eye } from 'react-icons-kit/icomoon';

import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { validateEmail, validatePassword } from './validationRules';
import FloatingInput from '../FloatingInput';

const LoginPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordIcon, setPasswordIcon] = useState(eye);

	const handleLogin = (formValues: { email: string; password: string }): void => {
		appDispatch(login(formValues))
			.then((res) => {
				const payload = res.payload as { message?: string };
				if (payload.message) {
					console.error(payload.message);
				} else {
					navigate(-1);
				}
			})
			.catch(() => {});
	};

	const validationSchema = Yup.object({
		email: validateEmail(t),
		password: validatePassword(t),
	});

	const LabelAuthorization: FC = () => <p className="h3 login_register--header">{t('login')}</p>;

	const HeaderDescription: FC = () => <p className="login_register--header">{t('header_desc')}</p>;

	const handlePasswordToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setPasswordShow(!passwordShow);
		setPasswordIcon(passwordShow ? eye : eyeBlocked);
	};

	const InputLogin: FC = () => (
		<Form.Group as={Col} controlId="formEmail">
			<InputGroup>
				<Field
					as={FloatingInput}
					className="login_register--input"
					type="email"
					name="email"
					placeholder={t('placeholder_email')}
					data-testid="InputLogin"
				/>
			</InputGroup>
			<ErrorMessage
				name="email"
				component="div"
				className="warning_message--validation"
				data-testid="error_firstName"
			/>
		</Form.Group>
	);

	const InputPassword: FC = () => (
		<Form.Group as={Col} controlId="formPassword" data-testid="formPassword">
			<InputGroup>
				<div className="col d-flex">
					<div className="col-12 ">
						<Field
							as={FloatingInput}
							name="password"
							placeholder={t('placeholder_password')}
							type={passwordShow ? 'text' : 'password'}
							data-testid="InputPassword"
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
							data-testid="passwordIcon"
						/>
					</div>
				</div>
			</InputGroup>
			<ErrorMessage
				name="password"
				component="div"
				className="warning_message--validation"
				data-testid="error_lastName"
			/>
		</Form.Group>
	);

	const CheckboxRememberMe: FC = () => (
		<div className="d-flex">
			<Form.Check
				type="checkbox"
				id="checkbox_remember"
				className="login_register--checkbox mb-3"
				data-testid="checkbox_remember"
			/>
			<div className="login_register--checkbox">{t('remember_me')}</div>
		</div>
	);

	const ButtonForgotPassword: FC = () => (
		<Form.Label data-testid="ButtonForgotPassword" className="px-3" id="forgot_password">
			<Link to="/restore_password" className="login_register--link pt-2">
				{t('forgot_your_password')}
			</Link>
		</Form.Label>
	);

	const ButtonLogin: FC = () => (
		<Button
			id="button_login"
			data-testid="button_login"
			className="login_register--btn"
			name="submit"
			type="submit"
		>
			{t('login')}
		</Button>
	);

	const LabelOR: FC = () => (
		<div data-testid="LabelOR" className="login_register--divide mt-4">
			<span className="login_register--divide__text">{t('or')}</span>
		</div>
	);

	const LabelDontHaveAccount: FC = () => (
		<p data-testid="LabelDontHaveAccount" className="login_register--signup__text">
			{t('dont_have_account')}
		</p>
	);

	const ButtonRegisterNow: FC = () => (
		<Link to="/register" className="login_register--btn">
			<Button
				id="button_register"
				data-testid="button_register"
				className="login_register--btn"
				type="submit"
			>
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
						<LabelAuthorization />
						<HeaderDescription />
						<InputLogin />
						<InputPassword />
						<div className="d-flex">
							<CheckboxRememberMe />
							<ButtonForgotPassword />
						</div>
						<ButtonLogin />
						<LabelOR />
						<LabelDontHaveAccount />
						<ButtonRegisterNow />
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginPage;
