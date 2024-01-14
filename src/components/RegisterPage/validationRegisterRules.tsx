// validationRegisterRules.tsx
import * as Yup from 'yup';

type TFunction = (key: string) => string;

export const validateFirstName = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.firstName.required'))
		.test('firstName-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/^[a-zA-Z]{2,30}$/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'firstName')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'firstName')
				);
			}
			const letterCount = (value ?? '').match(/[a-z]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(
					new Yup.ValidationError(t('validation.error.length'), value ?? '', 'firstName')
				);
			}
			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'lastName')
				);
			}
			const nonEnLetterCOunt = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (nonEnLetterCOunt >= 1) {
				errors.push(new Yup.ValidationError(t('validation.error.digit'), value ?? '', 'firstName'));
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'firstName'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateLastName = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.lastName.required'))
		.test('lastName-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/^[a-zA-Z]{2,30}$/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'lastName')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'lastName')
				);
			}
			const letterCount = (value ?? '').match(/[a-z]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(new Yup.ValidationError(t('validation.error.length'), value ?? '', 'lastName'));
			}
			const digitCount = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (digitCount >= 1) {
				errors.push(new Yup.ValidationError(t('validation.error.digit'), value ?? '', 'lastName'));
			}

			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'lastName')
				);
			}

			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'lastName'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateEmail = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.email.required'))
		.test('email-validation', t('validation.email.invalid'), function (value) {
			const errors = [];
			if (!/^[\w_+.-]{3,63}@[a-z0-9]{1,63}\.[a-z]{2,63}$/i.test(value ?? '')) {
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
			if (!/^[\w_+.-]+@/i.test(value ?? '')) {
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
			const specCharCount = (value ?? '').match(/[,:;"`|№!#%$%^&*()={}[/?~^<>]/g)?.length ?? 0;
			if (specCharCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.email.error.spec.characters'), value ?? '', 'email')
				);
			}
			if (
				!/^[a-z0-9._\-,;+:`"№!@#%$%*()={}[?~^&<>]+@[a-z0-9,;:`"№!#%@$%*()=+{}[?~^&<>]+\.[a-z0-9,;:`"№!#%@$%*()=+{}[?~^&<>]+$/gi.test(
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

export const validatePhoneNumber = (t: TFunction): Yup.StringSchema => {
	return Yup.string()
		.required(t('validation.phoneNumber.required'))
		.test('phoneNumber-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			const specChar = (value ?? '').match(/[,;:"№!#%@$%*()={}[?~^&<>]/g)?.length ?? 0;
			const letterCount = (value ?? '').match(/[a-zа-яыё]/gi)?.length ?? 0;
			const digitCount = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (
				!/^[\d+-]{10,12}$/.test(value ?? '') ||
				letterCount > 0 ||
				digitCount < 10 ||
				digitCount > 12
			) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'phoneNumber')
				);
			}
			if (specChar >= 1 && !/[+-]/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(
						t('validation.error.spec.char.phoneNumber'),
						value ?? '',
						'phoneNumber'
					)
				);
			}
			if (letterCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.letters'), value ?? '', 'phoneNumber')
				);
			}
			if (digitCount < 10 || digitCount > 12) {
				errors.push(
					new Yup.ValidationError(
						t('validation.error.digit.length.phone'),
						value ?? '',
						'phoneNumber'
					)
				);
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'phoneNumber'
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

export const validatePasswordConfirm = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.password.confirm.required'))
		.test('passwordConfirm-validation', t('validation.password.confirm.invalid'), function (value) {
			const passwordErrors = [];
			if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,256}$/.test(
					value ?? ''
				)
			) {
				passwordErrors.push(
					new Yup.ValidationError(t('validation.password.invalid'), value ?? '', 'passwordConfirm')
				);
			}
			if ((value ?? '').length < 8) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.length'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}
			if (!/[A-Z]/.test(value ?? '')) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.uppercase'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}
			if (!/[a-z]/.test(value ?? '')) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.lowercase'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}
			if (!/[0-9]/.test(value ?? '')) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.numeric'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}
			if (!/[!@#$%^&*]/.test(value ?? '')) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.spec.characters'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}
			if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(value ?? '')) {
				passwordErrors.push(
					new Yup.ValidationError(
						t('validation.password.error.en.lang'),
						value ?? '',
						'passwordConfirm'
					)
				);
			}

			// Проверка на совпадение паролей
			const password = (this.parent as { password: string })?.password;
			if (passwordErrors.length === 0 && value !== password) {
				throw new Yup.ValidationError(
					t('validation.passwords.do.not.match'),
					value ?? '',
					'passwordConfirm'
				);
			}

			if (passwordErrors.length > 0) {
				const validationError = new Yup.ValidationError(
					passwordErrors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'passwordConfirm'
				);
				throw validationError;
			}

			return true;
		});
};

export const validateCompanyName = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.companyName.required'))
		.test('companyName-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/[a-z0-9,;:`"№!#%@$%*()={}[?~^&< >]{2,30}$/gi.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'companyName')
				);
			}
			const letterCount = (value ?? '').match(/[a-z0-9,;:`"№!#%@$%*()={}[?~^&< >]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(
					new Yup.ValidationError(t('validation.error.length'), value ?? '', 'companyName')
				);
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'companyName'
				);
				throw validationError;
			}
			return true;
		});
};

export const validatePosition = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.position.required'))
		.test('position-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/[a-z0-9 ]{2,30}$/gi.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'position')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'position')
				);
			}
			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'position')
				);
			}
			const letterCount = (value ?? '').match(/[a-z0-9,;:`"№!#%@$%*()={}[?~^&< >]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(new Yup.ValidationError(t('validation.error.length'), value ?? '', 'position'));
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'position'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateTaxNumber = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.taxNumber.required'))
		.test('taxNumber-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/^[0-9]{9,20}$/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'taxNumber')
				);
			}
			const digitCount = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (digitCount < 9) {
				errors.push(
					new Yup.ValidationError(
						t('validation.error.digit.length.taxNumber'),
						value ?? '',
						'taxNumber'
					)
				);
			}
			const letterCount = (value ?? '').match(/[a-zа-яыё]/gi)?.length ?? 0;
			if (letterCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.letters'), value ?? '', 'taxNumber')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'taxNumber')
				);
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'taxNumber'
				);
				throw validationError;
			}
			return true;
		});
};

export const validatePostIndex = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.postIndex.required'))
		.test('postIndex-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/^[0-9]{5}$/.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'postIndex')
				);
			}
			const digitCount = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (digitCount != 5) {
				errors.push(
					new Yup.ValidationError(
						t('validation.error.digit.length.postIndex'),
						value ?? '',
						'postIndex'
					)
				);
			}
			const letterCount = (value ?? '').match(/[a-zа-яыё]/gi)?.length ?? 0;
			if (letterCount >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.letters'), value ?? '', 'postIndex')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'postIndex')
				);
			}

			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'postIndex'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateCity = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.city.required'))
		.test('city-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/[a-z ]{2,30}$/gi.test(value ?? '')) {
				errors.push(new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'city'));
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'city'));
			}
			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'city')
				);
			}
			const letterCount = (value ?? '').match(/[a-z0-9,;:`"№!#%@$%*()={}[?~^&< >]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(new Yup.ValidationError(t('validation.error.length'), value ?? '', 'city'));
			}
			const digitCount = (value ?? '').match(/[0-9]/gi)?.length ?? 0;
			if (digitCount >= 1) {
				errors.push(new Yup.ValidationError(t('validation.error.digit'), value ?? '', 'city'));
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'city'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateStreet = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.street.required'))
		.test('street-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/[a-z0-9-_. ]{2,30}$/gi.test(value ?? '')) {
				errors.push(new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'street'));
			}
			const specChar = (value ?? '').match(/[,;:`"№!#%@$%*()=+{}[?~^&<>/]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'street')
				);
			}
			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'street')
				);
			}
			const letterCount = (value ?? '').match(/[a-z0-9,;:`"№!#%@$%*()={}[?~^&< >]/gi)?.length ?? 0;
			if (letterCount < 2) {
				errors.push(new Yup.ValidationError(t('validation.error.length'), value ?? '', 'street'));
			}

			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'street'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateHouseNumber = (t: TFunction): Yup.StringSchema<string> => {
	return Yup.string()
		.required(t('validation.houseNumber.required'))
		.test('houseNumber-validation', t('validation.invalid.error'), function (value) {
			const errors = [];
			if (!/[a-z0-9-_./#№ ]{1,30}$/gi.test(value ?? '')) {
				errors.push(
					new Yup.ValidationError(t('validation.invalid.error'), value ?? '', 'houseNumber')
				);
			}
			const specChar = (value ?? '').match(/[,;:`"!%@$%*()=+{}[?~^&<>]/g)?.length ?? 0;
			if (specChar >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.spec.char'), value ?? '', 'houseNumber')
				);
			}
			const notENlang = (value ?? '').match(/[а-яыё]/gi)?.length ?? 0;
			if (notENlang >= 1) {
				errors.push(
					new Yup.ValidationError(t('validation.error.not.en.lang'), value ?? '', 'houseNumber')
				);
			}
			if (errors.length > 0) {
				const validationError = new Yup.ValidationError(
					errors.map((error) => `${error.message}`).join(', '),
					value ?? '',
					'houseNumber'
				);
				throw validationError;
			}
			return true;
		});
};

export const validateReadTerms = (t: TFunction): Yup.BooleanSchema<boolean | undefined> => {
	return Yup.boolean().oneOf([true], t('validation.readTerms.required'));
};
