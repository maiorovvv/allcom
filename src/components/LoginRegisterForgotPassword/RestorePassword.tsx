import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../app/hooks';
import { restoreUser } from '../../features/auth/restoreSLice';
import { validateEmail } from './validationRules';
import FloatingInput from '../FloatingInput';

const RestorePasswordPage: FC = (): JSX.Element => {
	const { t } = useTranslation('LoginRegisterPage');
	const appDispatch = useAppDispatch();
	const validationSchema = Yup.object({
		email: validateEmail(t),
	});
	const navigate = useNavigate();

	const handleRestore = (formValues: { email: string }): void => {
		appDispatch(restoreUser(formValues))
			.then((res) => {
				const payload = res.payload as { message: string };
				if (payload.message) {
					navigate('/restore_password_wait');
				}
			})
			.catch(() => {});
	};

	const restoreFormLabel = (
		<div className="login_register--divide">
			<span className="login_register--divide__text">{t('restore_password_wait_header')}</span>
		</div>
	);
	const headerDescription = (
		<p className="login_register--header">{t('restore_form_label_desc')}</p>
	);
	const inputLogin = (
		<Form.Group as={Col} controlId="formEmail">
			<InputGroup>
				<Field
					as={FloatingInput}
					type="email"
					name="email"
					placeholder={t('restore_placeholder_email')}
				/>
			</InputGroup>
			<ErrorMessage name="email" component="div" className="warning_message--validation" />
		</Form.Group>
	);

	const buttonRestore = (
		<Button
			id="button_restore"
			className="login_register--btn mt-3 pt-0"
			name="submit"
			type="submit"
		>
			{t('restore_request')}
		</Button>
	);
	return (
		<div className="login_register--restore_password_wait">
			<Formik
				initialValues={{ email: '' }}
				validationSchema={validationSchema}
				onSubmit={(formValues, { setSubmitting }) => {
					handleRestore(formValues);
					setSubmitting(false);
				}}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						{restoreFormLabel}
						{headerDescription}
						{inputLogin}
						{buttonRestore}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RestorePasswordPage;
