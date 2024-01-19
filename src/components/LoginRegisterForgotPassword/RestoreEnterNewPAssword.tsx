import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/icomoon/eye';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Yup from 'yup';
import * as PropTypes from 'prop-types';

import { useAppDispatch } from '../../app/hooks';
import { restoreUserNewPassword } from '../../features/auth/restoreSLice';
import { validatePassword, validatePasswordConfirm } from './validationRules';
import FloatingInput from '../FloatingInput';

const COUNTDOWN_START = 10;
const COUNTDOWN_END = 0;
const COUNTDOWN_DELAY = 1;
const COUNTDOWN_ONE_SECOND_IS = 1000;
const USER_EMAIL_FOR_RESTORE_PASSWORD = 'emailToRestorePassword@gmail.com';

const RestoreEnterNewPAssword: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);
	const [passwordIcon, setPasswordIcon] = useState(eye);
	const [passwordConfirmIcon, setPasswordConfirmIcon] = useState(eye);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [countdown, setCountdown] = useState(COUNTDOWN_START);
	const navigate = useNavigate();
	const validationSchema = Yup.object({
		password: validatePassword(t),
		passwordConfirm: validatePasswordConfirm(t),
	});

	const handleCreateNewPassword = (formValues: { password: string }): void => {
		appDispatch(restoreUserNewPassword(formValues))
			.then((res) => {
				const payload = res.payload as { message: string };
				if (payload.message) {
					console.error(payload.message);
				}
			})
			.catch(() => {});
	};
	const handlePasswordToggle = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setPasswordShow(!passwordShow);
		setPasswordIcon(passwordShow ? eye : eyeBlocked);
	};
	useEffect(() => {
		if (formSubmitted) {
			const redirectTimeout = setTimeout(() => {
				if (countdown > COUNTDOWN_END) {
					setCountdown(countdown - COUNTDOWN_DELAY);
				} else {
					navigate('/login');
					setCountdown(COUNTDOWN_END);
				}
			}, COUNTDOWN_ONE_SECOND_IS);

			return () => {
				clearTimeout(redirectTimeout);
			};
		}
	}, [countdown, formSubmitted, navigate]);

	const handlePasswordConfirmToggle = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setPasswordConfirmShow(!passwordConfirmShow);
		setPasswordConfirmIcon(passwordConfirmShow ? eye : eyeBlocked);
	};
	const newPasswordFormHeader = (
		<div className="login_register--divide">
			<span className="login_register--divide__text">
				{t('restore_password_create_new_header')}
			</span>
		</div>
	);
	const newPasswordFormDesc = (
		<p
			className="login_register--header"
			dangerouslySetInnerHTML={{
				__html: t('restore_password_create_new_desc').replace(/\n/g, '<br>'),
			}}
		></p>
	);
	const CustomFormField: React.FC<CustomFormFieldProps> = ({ id, type, placeholder }) => (
		<Form.Group as={Col} id={`form${id}`}>
			<InputGroup>
				<Field as={FloatingInput} id={id} name={id} type={type} placeholder={placeholder} />
			</InputGroup>
			<ErrorMessage name={id} component="div" className="warning_message--validation" />
		</Form.Group>
	);

	CustomFormField.propTypes = {
		id: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
	};

	type CustomFormFieldProps = {
		id: string;
		type: string;
		placeholder: string;
	};

	const emailDisabled = (
		<div className="floating_input form-floating ">
			<input
				className="floating_input--field_disabled form-control "
				id="email"
				type="email"
				value={USER_EMAIL_FOR_RESTORE_PASSWORD}
				disabled
			></input>
		</div>
	);

	const password = (
		<InputGroup>
			<div className="col d-flex">
				<div className="col-12">
					<CustomFormField id="password" type="password" placeholder={t('placeholder_password')} />
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
	);

	const passwordConfirm = (
		<InputGroup>
			<div className="col d-flex">
				<div className="col-12">
					<CustomFormField
						id="passwordConfirm"
						type={passwordConfirmShow ? 'text' : 'password'}
						placeholder={t('placeholder_confirm_password')}
					/>
				</div>
				<div className="col">
					<Icon
						icon={passwordConfirmIcon}
						size={24}
						onClick={(event) => {
							handlePasswordConfirmToggle(event);
						}}
						className="floating_input--icon_eye_password"
					/>
				</div>
			</div>
		</InputGroup>
	);

	const countdownTimer = (
		<span
			className="login_register--flex_gray pt-4"
			dangerouslySetInnerHTML={{
				__html: t('redirect_message_new_password', { seconds: countdown }).replace(/\n/g, '<br>'),
			}}
		></span>
	);

	const buttonRestore = (
		<Button
			id="button_restore"
			className="login_register--btn mt-3 pt-0"
			name="submit"
			type="submit"
		>
			{t('restore_password_create_new_button')}
		</Button>
	);

	const initialValues = {
		password: '',
		passwordConfirm: '',
	};

	return (
		<div className="login_register--restore_password_wait">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(formValues, { setSubmitting }) => {
					handleCreateNewPassword(formValues);
					setSubmitting(false);
					setFormSubmitted(true);
				}}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						{newPasswordFormHeader}
						{newPasswordFormDesc}
						{emailDisabled}
						{password}
						{passwordConfirm}
						{buttonRestore}
						{formSubmitted && countdownTimer}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RestoreEnterNewPAssword;
