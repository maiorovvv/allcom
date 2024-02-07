import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/icomoon/eye';
import * as Yup from 'yup';
import * as PropTypes from 'prop-types';

import { useAppDispatch } from '../../app/hooks';
import { register } from '../../features/auth/authSlice';
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
} from './validationRules';

const RegisterPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
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
					console.error(payload.message);
				} else {
					navigate('user/my_account/greetings');
				}
			})
			.catch(() => {});
	};

	const handlePasswordToggle = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setPasswordShow(!passwordShow);
		setPasswordIcon(passwordShow ? eye : eyeBlocked);
	};

	const handlePasswordConfirmToggle = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setPasswordConfirmShow(!passwordConfirmShow);
		setPasswordConfirmIcon(passwordConfirmShow ? eye : eyeBlocked);
	};

	const CustomFormField: React.FC<CustomFormFieldProps> = ({ id, type = 'text', placeholder }) => {
		const fieldType = type === 'password' ? 'password' : 'text';
		const inputTestId = `input_${id}`;
		const errorMessageTestId = `error_${id}`;

		return (
			<Form.Group as={Col} id={`form${id}`}>
				<InputGroup>
					<Field
						as={FloatingInput}
						id={id}
						name={id}
						type={fieldType}
						placeholder={placeholder}
						data-testid={inputTestId}
					/>
				</InputGroup>
				<ErrorMessage
					name={id}
					component="div"
					className="warning_message--validation"
					data-testid={errorMessageTestId}
				/>
			</Form.Group>
		);
	};

	CustomFormField.propTypes = {
		id: PropTypes.string.isRequired,
		type: PropTypes.string,
		placeholder: PropTypes.string.isRequired,
	};

	type CustomFormFieldProps = {
		id: string;
		type?: string;
		placeholder: string;
	};

	const labelUser = (
		<div className="login_register--divide">
			<span className="login_register--divide__text" data-testid="labelUser_text">
				{t('user_line')}
			</span>
		</div>
	);

	const firstName = (
		<CustomFormField id="firstName" data-testid="firstName" placeholder={t('first_name')} />
	);
	const lastName = (
		<CustomFormField id="lastName" data-testid="lastName" placeholder={t('last_name')} />
	);
	const email = (
		<CustomFormField id="email" data-testid="email" placeholder={t('placeholder_email')} />
	);
	const phoneNumber = (
		<CustomFormField
			id="phoneNumber"
			data-testid="phoneNumber"
			placeholder={t('phone_number_placeholder')}
		/>
	);
	const password = (
		<InputGroup>
			<div className="col d-flex">
				<div className="col-12">
					<CustomFormField
						id="password"
						data-testid="password"
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
						className="floating_input--icon_eye_password"
						data-testid="password_icon"
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
						data-testid="passwordConfirm"
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
						data-testid="passwordConfirm_icon"
					/>
				</div>
			</div>
		</InputGroup>
	);

	const toolboxClientFirma = (
		<Form.Group as={Col} id="account_type_switch">
			<div className="d-flex justify-content-center">
				<Form.Label
					id="checkbox_client_firma"
					data-testid="checkbox_client_firma"
					className={` ${!toolboxEnabled ? 'login_register--toolbox_client' : ''}`}
				>
					{t('client_private')}
				</Form.Label>
				<Form.Check
					type="switch"
					data-testid="checkbox_client_firma_switch"
					className="m-1 d-flex justify-content-center"
					checked={toolboxEnabled}
					onChange={(e) => {
						setToolboxEnabled(e.target.checked);
					}}
				/>
				<Form.Label className={` ${toolboxEnabled ? 'login_register--toolbox_client' : ''}`}>
					{t('client_firma')}
				</Form.Label>
			</div>
		</Form.Group>
	);

	const headerTitle = (
		<div className="login__register--header mb-3">
			<p className="h3 login_register--header" data-testid="headerTitle_create_account">
				{t('create_account')}
			</p>
			<p className="login_register--header" data-testid="headerTitle_register_here_text">
				{t('register_here_text')}
			</p>
		</div>
	);

	const labelCompany = (
		<div className="login_register--divide">
			<span className="login_register--divide__text" data-testid="labelCompany">
				{t('company_line')}
			</span>
		</div>
	);

	const companyName = (
		<CustomFormField
			id="companyName"
			data-testid="companyName"
			placeholder={t('company_name_placeholder')}
		/>
	);
	const companyPosition = (
		<CustomFormField
			id="position"
			data-testid="companyPosition"
			placeholder={t('position_placeholder')}
		/>
	);
	const taxNumber = (
		<CustomFormField
			id="taxNumber"
			data-testid="taxNumber"
			placeholder={t('taxNumber_placeholder')}
		/>
	);
	const postIndex = (
		<CustomFormField
			id="postIndex"
			data-testid="postIndex"
			placeholder={t('postIndex_placeholder')}
		/>
	);
	const city = <CustomFormField id="city" data-testid="city" placeholder={t('city_placeholder')} />;
	const address = (
		<div className="col d-flex">
			<div className="col-9 pe-2">
				<CustomFormField
					id="street"
					data-testid="street"
					placeholder={t('address_street_placeholder')}
				/>
			</div>
			<div className="col-3">
				<CustomFormField
					id="houseNumber"
					data-testid="houseNumber"
					placeholder={t('address_building_number_placeholder')}
				/>
			</div>
		</div>
	);

	const checkBoxReadTerms = (
		<Form.Group as={Col} id="formReadTerms">
			<div className="login_register--header ">
				<Field
					name="readTerms"
					type="checkbox"
					id="checkbox_read_terms"
					form="novalidate"
					data-testid="checkbox_read_terms"
				/>
				<Form.Label className="login_register--checkbox" htmlFor="checkbox_read_terms">
					<Link
						to="/privacy_policy"
						target="_blank"
						className="login_register--link"
						data-testid="checkbox_read_terms_link"
					>
						{t('i_have_read_text')}
					</Link>
				</Form.Label>
			</div>
			<ErrorMessage name="readTerms" component="div" className="warning_message--validation" />
		</Form.Group>
	);

	const buttonRegisterNewUser = (
		<div>
			<Button
				id="button_register"
				data-testid="button_register"
				className="login_register--btn mb-3"
				name="submit"
				type="submit"
			>
				{t('submit_register')}
			</Button>
		</div>
	);

	const alreadyHaveAccountText = <p className="login_register--header">{t('have_account')}</p>;

	const buttonLogin = (
		<Link to="/login" className="pt-3">
			<Button
				id="button_login"
				data-testid="button_login"
				name="login"
				className="login_register--btn"
			>
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
		<div className="container login_register_general">
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
						{headerTitle}
						{toolboxClientFirma}
						<div id="container_client-firma" className="login_register--container_client-firma row">
							<div id="container_client" className="login_register--container_client">
								{labelUser}
								{firstName}
								{lastName}
								{email}
								{phoneNumber}
								{password}
								{passwordConfirm}
							</div>
							{toolboxEnabled && (
								<div id="container_firma" className="login_register--container_firma col">
									{labelCompany}
									{companyName}
									{companyPosition}
									{taxNumber}
									{postIndex}
									{city}
									{address}
								</div>
							)}
							<div id="container_buttons" className="login_register--container_buttons row">
								{buttonRegisterNewUser}
								{checkBoxReadTerms}
								{alreadyHaveAccountText}
								{buttonLogin}
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterPage;
