// validationLoginRules.tsx

import * as Yup from 'yup';

type TFunction = (key: string) => string;

export const validateEmail = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.email.required'))
		.test('email-validation', t('validation.email.invalid'), function (value) {
			const errors = [];
			if (!/^[\w_.-]{3,63}@[a-z0-9]{1,63}\.[a-z]{2,63}$/i.test(value ?? '')) {
				errors.push(new Yup.ValidationError(t('validation.email.invalid'), value ?? '', 'email'));
			}
			const dotCount = (value ?? '').match(/\./g)?.length ?? 0;
			if (dotCount == 0) {
				errors.push(new Yup.ValidationError(t('validation.email.error.dot'), value ?? '', 'email'));
			}
			const dotTwiceCount = (value?.split('@')[1] ?? '').match(/\./g)?.length ?? 0;
			if (dotTwiceCount >= 2) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.dot.twice'), value ?? '', 'email')
				);
			}
			if (!/^[^\s@]{3,}@/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.user'), value ?? '', 'email')
				);
			}
			if (!/^[\w_.-]+@/i.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.user.invalid'), value ?? '', 'email')
				);
			}
			const atCount = (value ?? '').match(/@/g)?.length ?? 0;
			if (atCount == 0) {
				errors.push(new Yup.ValidationError(t('validation.email.error.at'), value ?? '', 'email'));
			}
			const atTwiceCount = (value ?? '').match(/@/g)?.length ?? 0;
			if (atTwiceCount > 1) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.at.twice'), value ?? '', 'email')
				);
			}

			if (
				!/@[a-z0-9_.-]{1,63}\./i.test(value ?? '') ||
				!/@[a-z0-9_.-]{1,63}\.[a-z]{2,63}/i.test(value ?? '') ||
				!/@[a-z0-9]*\./i.test(value ?? '')
			) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.domain'), value ?? '', 'email')
				);
			}
			if (!/@[a-z0-9]+[a-z0-9_.-]*\./i.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.at.domain'), value ?? '', 'email')
				);
			}
			const spaceBarCharCount = (value ?? '').match(/\s/g)?.length ?? 0;
			if (spaceBarCharCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.spacebar'), value ?? '', 'email')
				);
			}
			const specCharCount = (value ?? '').match(/[,:;"`|№!#%$%^&*()=+{}[/?~^<>]/g)?.length ?? 0;
			if (specCharCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.spec.characters'), value ?? '', 'email')
				);
			}
			if (
				!/^[a-z0-9._\-,;:`"№!@#%$%*()=+{}[?~^&<>]+@[a-z0-9,;:`"№!#%@$%*()=+{}[?~^&<>]+\.[a-z0-9,;:`"№!#%@$%*()=+{}[?~^&<>]+$/gi.test(
					value ?? ''
				)
			) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.en.lang'), value ?? '', 'email')
				);
			}

			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'email'
				);
				throw validationError;
			}
			return true;
		});
};

export const validatePassword = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.password.required'))
		.test('password-validation', t('validation.password.invalid'), function (value) {
			const errors = [];
			if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,256}$/.test(
					value ?? ''
				)
			) {
				errors.push(
					new Yup.ValidationError(t('validation.password.invalid'), value ?? '', 'password')
				);
			}
			if ((value ?? '').length < 8) {
				errors.push(
					new Yup.ValidationError(t('validation.password.error.length'), value ?? '', 'password')
				);
			}
			if (!/[A-Z]/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.password.error.uppercase'), value ?? '', 'password')
				);
			}
			if (!/[a-z]/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.password.error.lowercase'), value ?? '', 'password')
				);
			}
			if (!/[0-9]/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.password.error.numeric'), value ?? '', 'password')
				);
			}
			if (!/[!@#$%^&*]/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(
						t('validation.password.error.spec.characters'),
						value ?? '',
						'password'
					)
				);
			}
			if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.password.error.en.lang'), value ?? '', 'password')
				);
			}

			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'password'
				);
				throw validationError;
			}
			return true;
		});
};
