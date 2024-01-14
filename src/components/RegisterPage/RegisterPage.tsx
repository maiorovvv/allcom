// RegisterPage.tsx
import { FC, useState, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/icomoon/eye';

import { useAppDispatch } from '../../app/hooks';
import { register } from '../../features/auth/regSlice';
import FloatingInput from '../FloatingInput';
import {
	validateFirstName,
	validateLastName,
	validateEmail,
	validatePhoneNumber,
	validatePassword,
	validatePasswordConfirm,
	validateCompanyName,
	validatePosition,
	validateTaxNumber,
	validatePostIndex,
	validateCity,
	validateStreet,
	validateHouseNumber,
	validateReadTerms,
} from './validationRegisterRules';

const RegisterPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const [toolboxEnabled, setToolboxEnabled] = useState<boolean>(false);
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);
	const [passwordIcon, setPasswordIcon] = useState(eye);
	const [passwordConfirmIcon, setPasswordConfirmIcon] = useState(eye);
	const validationSchema = Yup.object({
		firstName: validateFirstName(t),
		lastName: validateLastName(t),
		email: validateEmail(t),
		phoneNumber: validatePhoneNumber(t),
		password: validatePassword(t),
		passwordConfirm: validatePasswordConfirm(t),
		readTerms: validateReadTerms(t),
		...(toolboxEnabled
			? {
					companyName: validateCompanyName(t),
					position: validatePosition(t),
					taxNumber: validateTaxNumber(t),
					postIndex: validatePostIndex(t),
					city: validateCity(t),
					street: validateStreet(t),
					houseNumber: validateHouseNumber(t),
			  }
			: {}),
	});

	const handleRegister = (formValues: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		password: string;
		companyName: string;
		position: string;
		taxNumber: string;
		postIndex: string;
		city: string;
		street: string;
		houseNumber: string;
	}): void => {
		appDispatch(register(formValues))
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
	const handlePasswordToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setPasswordShow(!passwordShow);
		setPasswordIcon(passwordShow ? eye : eyeBlocked);
	};

	const handlePasswordConfirmToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setPasswordConfirmShow(!passwordConfirmShow);
		setPasswordConfirmIcon(passwordConfirmShow ? eye : eyeBlocked);
	};

	const USER_LABEL = (
		<div className="mt-4">
			<div className="login__account--divide position__relative d-flex justify-content-center">
				<span className="login__account--divide__text text-black">{t('user_line')}</span>
			</div>
		</div>
	);
	const firstName = (
		<Form.Group as={Col} id="formUsername">
			{USER_LABEL}
			<InputGroup>
				<Field as={FloatingInput} id="firstName" name="firstName" placeholder={t('username')} />
			</InputGroup>
			<ErrorMessage name="firstName" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const lastName = (
		<Form.Group as={Col} id="formLastName">
			<InputGroup>
				<Field as={FloatingInput} id="lastName" name="lastName" placeholder={t('last_name')} />
			</InputGroup>
			<ErrorMessage name="lastName" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const email = (
		<Form.Group as={Col} id="formEmailRegister">
			<InputGroup>
				<Field as={FloatingInput} id="email" name="email" placeholder={t('placeholder_email')} />
			</InputGroup>
			<ErrorMessage name="email" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const phoneNumber = (
		<div>
			<Form.Group as={Col} id="formPhoneNumber">
				<InputGroup>
					<Field
						as={FloatingInput}
						id="phoneNumber"
						name="phoneNumber"
						placeholder={t('phone_number_placeholder')}
					/>
				</InputGroup>
				<ErrorMessage name="phoneNumber" component="div" className="validation_warning__message" />
			</Form.Group>
		</div>
	);
	const password = (
		<Form.Group noValidate as={Col} id="formPasswordRegister">
			<InputGroup>
				<div className="col d-flex">
					<div className="col-12 ">
						<Field
							as={FloatingInput}
							id="password"
							name="password"
							type={passwordShow ? 'text' : 'password'}
							placeholder={t('placeholder_password')}
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
			<ErrorMessage name="password" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const passwordConfirm = (
		<Form.Group as={Col} id="formPasswordConfirm">
			<InputGroup>
				<div className="col d-flex">
					<div className="col-12 ">
						<Field
							as={FloatingInput}
							id="passwordConfirm"
							name="passwordConfirm"
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
							className={`${!passwordConfirmShow ? 'icon_EYE_withError' : 'icon_EYE_notError'}`}
						/>
					</div>
				</div>
			</InputGroup>
			<ErrorMessage
				name="passwordConfirm"
				component="div"
				className="validation_warning__message"
			/>
		</Form.Group>
	);
	const toolboxClientFirma = (
		<Form.Group as={Col} id="accountTypeSwitch">
			<div className="d-flex justify-content-center align-items-center">
				<Form.Label
					className={`login__register--header__title px-2 ${
						!toolboxEnabled ? 'active_toolbox_client' : ''
					}`}
				>
					{t('client_private')}
				</Form.Label>
				<Form.Check
					type="switch"
					className="ms-1 d-flex justify-content-center align-items-center pb-2"
					checked={toolboxEnabled}
					onChange={(e) => {
						setToolboxEnabled(e.target.checked);
					}}
				/>
				<Form.Label
					className={`login__register--header__title px-2  ${
						toolboxEnabled ? 'active_toolbox_client' : ''
					}`}
				>
					{t('client_firma')}
				</Form.Label>
			</div>
		</Form.Group>
	);
	const headerTitle = (
		<div className="login__register--header">
			<h2 className="login__register--header__title h3 d-flex justify-content-center align-items-center">
				{t('create_account')}
			</h2>
			<p className="login__register--header__desc d-flex justify-content-center align-items-center">
				{t('register_here_text')}
			</p>
		</div>
	);
	const COMPANY_LABEL = (
		<div className="mt-5">
			<div className="login__account--divide position__relative d-flex justify-content-center">
				<span className="login__account--divide__text text-black">{t('company_line')}</span>
			</div>
		</div>
	);
	const companyName = (
		<Form.Group as={Col} id="formCompanyName">
			{COMPANY_LABEL}
			<InputGroup>
				<Field
					as={FloatingInput}
					id="companyName"
					name="companyName"
					placeholder={t('company_name_placeholder')}
				/>
			</InputGroup>
			<ErrorMessage name="companyName" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const companyPosition = (
		<Form.Group as={Col} id="formPosition">
			<InputGroup>
				<Field
					as={FloatingInput}
					type="position"
					name="position"
					placeholder={t('position_placeholder')}
				/>
			</InputGroup>
			<ErrorMessage name="position" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const taxNumber = (
		<Form.Group as={Col} id="formTaxNumber">
			<InputGroup>
				<Field
					as={FloatingInput}
					type="taxNumber"
					name="taxNumber"
					placeholder={t('taxNumber_placeholder')}
				/>
			</InputGroup>
			<ErrorMessage name="taxNumber" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const postIndex = (
		<Form.Group as={Col} id="formIndex">
			<InputGroup>
				<Field
					as={FloatingInput}
					type="postIndex"
					name="postIndex"
					placeholder={t('postIndex_placeholder')}
				/>
			</InputGroup>
			<ErrorMessage name="postIndex" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const city = (
		<Form.Group as={Col} id="formCity">
			<InputGroup>
				<Field as={FloatingInput} type="city" name="city" placeholder={t('city_placeholder')} />
			</InputGroup>
			<ErrorMessage name="city" component="div" className="validation_warning__message" />
		</Form.Group>
	);
	const address = (
		<div className="col d-flex ">
			<div className="col-9 pe-2 ">
				<Form.Group as={Col} id="formStreet">
					<InputGroup>
						<Field
							as={FloatingInput}
							type="street"
							name="street"
							placeholder={t('address_street_placeholder')}
						/>
					</InputGroup>
					<ErrorMessage name="street" component="div" className="validation_warning__message" />
				</Form.Group>
			</div>
			<div className="col-3">
				<Form.Group as={Col} id="formHome">
					<InputGroup>
						<Field
							as={FloatingInput}
							type="houseNumber"
							name="houseNumber"
							className="houseNumber"
							placeholder={t('address_building_number_placeholder')}
						/>
					</InputGroup>
				</Form.Group>
				<ErrorMessage name="houseNumber" component="div" className="validation_warning__message" />
			</div>
		</div>
	);
	const checkBoxReadTerms = (
		<div className="d-flex justify-content-center items-center">
			<Form.Group
				as={Col}
				id="formReadTerms"
				className="d-flex items-center justify-content-center row "
			>
				<div className="login__account--remember position__relative d-flex justify-content-left col ">
					<Field
						name="readTerms"
						type="checkbox"
						id="checkbox_read_terms"
						className="checkout__checkbox--input"
						form="novalidate"
					/>
					<div className="read__terms--label-container col ">
						<Form.Label
							className="checkout__checkbox--label read__terms--label"
							htmlFor="checkbox_read_terms"
						>
							<Link to="https://www.google.com" target="_blank">
								{t('i_have_read_text')}
							</Link>
						</Form.Label>
					</div>
				</div>
				<div>
					<ErrorMessage name="readTerms" component="div" className="validation_warning__message" />
				</div>
			</Form.Group>
		</div>
	);
	const buttonRegisterNewUser = (
		<div>
			<Button
				id="button_register"
				className="login__account--btn primary__btn mb-4 mt-5"
				name="submit"
				type="submit"
			>
				{t('submit_register')}
			</Button>
		</div>
	);
	const alreadyHaveAccountText = (
		<p className="position__relative items-center flex justify-content-center">
			{t('have_account')}
		</p>
	);
	const buttonLogin = (
		<Link to="/login" className="d-flex flex-column items-center pt-3">
			<Button id="button_login" name="login" className="login__account--btn primary__btn mb-5">
				{t('login')}
			</Button>
		</Link>
	);
	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		password: '',
		passwordConfirm: '',
		readTerms: false,
		companyName: '',
		position: '',
		taxNumber: '',
		postIndex: '',
		city: '',
		street: '',
		houseNumber: '',
	};
	return (
		<div className="login__section  section--padding">
			<div className="container">
				<div className="login__section--inner">
					{headerTitle}
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(formValues, { setSubmitting }) => {
							handleRegister(formValues);
							setSubmitting(false);
						}}
					>
						{({ handleSubmit }) => (
							<Form onSubmit={handleSubmit}>
								{toolboxClientFirma}
								<div className="row justify-content-center align-items-center">
									{/* ******************************** USER ************************* */}
									<div className="col-sm-6 col-md-5 col-xl-4" id="container_client">
										{firstName}
										{lastName}
										{email}
										{phoneNumber}
										{password}
										{passwordConfirm}
									</div>
									{/* ******************************** COMPANY ******************************** */}
									{toolboxEnabled && (
										<div className="col-sm-6 col-md-5 col-xl-4 mb-4" id="container_firma">
											{companyName}
											{companyPosition}
											{taxNumber}
											{postIndex}
											{city}
											{address}
										</div>
									)}
									{/* ======================== BUTTONS ======================== */}
									<div className="col-sm-6 col-md-5 col-xl-4 row flex items-center justify-content-center align-items-center">
										<div id="buttons_container" className="row">
											{buttonRegisterNewUser}
											{checkBoxReadTerms}
											{alreadyHaveAccountText}
											{buttonLogin}
										</div>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
