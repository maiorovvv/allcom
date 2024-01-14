// LoginPage.tsx
import { FC, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/icomoon/eye';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { validateEmail, validatePassword } from './validationLoginRules';
import FloatingInput from '../FloatingInput';

const LoginPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordIcon, setPasswordIcon] = useState(eye);
	const [message] = useState<string>('');
	const handleLogin = (formValues: { email: string; password: string }): void => {
		appDispatch(login(formValues))
			.then((res) => {
				const payload = res.payload as { message: string };
				if (payload.message) {
					// Дальнейшие действия после успешной регистрации
				}
			})
			.catch(() => {
				// Обработка ошибки при регистрации
			});
	};
	const validationSchema = Yup.object({
		email: validateEmail(t),
		password: validatePassword(t),
	});

	const labelAuthorization = (
		<h2 className="login__account--header__title h3 d-flex justify-content-center align-items-center">
			{t('login')}
		</h2>
	);

	const headerDescription = (
		<p className="login__account--header__desc d-flex justify-content-center align-items-center">
			{t('header_desc')}
		</p>
	);
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
					className="login__account--input"
					type="email"
					name="email"
					placeholder={t('placeholder_email')}
				/>
			</InputGroup>
			<ErrorMessage name="email" component="div" className="text-danger" />
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
							className={`${!passwordShow ? 'icon_EYE_withError' : 'icon_EYE_notError'}`}
						/>
					</div>
				</div>
			</InputGroup>
			<ErrorMessage name="password" component="div" className="text-danger" />
		</Form.Group>
	);

	const checkboxRememberMe = (
		<div className="login__account--remember text-black position__relative d-flex justify-content-left d-flex ">
			<Form.Check
				type="checkbox"
				id="checkbox_remember"
				className="checkout__checkbox--label login__remember--label pt-1"
			/>
			<div className="pt-2 pe-2">{t('remember_me')}</div>
		</div>
	);
	const buttonForgotPassword = (
		<Link to="/restore_password">
			<Button className="login__account--forgot" type="button" id="button_restore_password">
				{t('forgot_your_password')}
			</Button>
		</Link>
	);

	const buttonLogin = (
		<Button
			id="button_login"
			className="login__account--btn primary__btn"
			name="submit"
			type="submit"
		>
			{t('login')}
		</Button>
	);
	const labelOR = (
		<div className="login__account--divide mt-4">
			<span className="login__account--divide__text text-black">{t('or')}</span>
		</div>
	);

	const labelDontHaveAccount = (
		<p className="login__account--signup__text ">{t('dont_have_account')}</p>
	);
	const buttonRegisterNow = (
		<div className="d-flex flex-column">
			<Link to="/register">
				<Button className="login__account--btn primary__btn" type="submit">
					{t('sign_up_now')}
				</Button>
			</Link>
		</div>
	);
	return (
		<div className="login__section section--padding">
			<div className="container">
				<div className="login__section--inner">
					<div className="login__account">
						<div className="login__account--header">
							{labelAuthorization}
							{headerDescription}
						</div>
						<div className="login__account--inner">
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
										<span>{message}</span>
										{inputLogin}
										{inputPassword}
										<div className="login__account--remember__forgot mb-15 d-flex justify-content-between align-items-center">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
