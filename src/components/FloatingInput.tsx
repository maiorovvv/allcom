// FloatingInput.tsx
import { FC, useEffect, useState } from 'react';
import { useFormikContext, Field } from 'formik';

type FloatingInputProps = {
	id: string;
	name: string;
	placeholder: string;
	type: string;
};

const FloatingInput: FC<FloatingInputProps> = ({ id, name, placeholder, type }) => {
	const formik = useFormikContext();
	const [isValidationTriggered, setIsValidationTriggered] = useState(false);
	const isInvalid =
		formik.errors[name as keyof typeof formik.errors] &&
		formik.touched[name as keyof typeof formik.touched];
	const isValid = !isInvalid && isValidationTriggered;

	useEffect(() => {
		if (isInvalid) {
			setIsValidationTriggered(true);
		}
	}, [isInvalid]);

	const handleBlur = (): void => {
		formik.setFieldTouched(name, true);
	};

	return (
		<div
			style={{ justifyTracks: 'center', marginBottom: `1rem`, paddingTop: `2rem` }}
			className={`form-floating pt-1 ${isInvalid ? 'placeholder-filled' : 'placeholder-empty'}`}
		>
			<Field
				type={type}
				className={`form-control ${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`}
				id={id}
				name={name}
				style={{ height: `4.8rem`, paddingTop: `33px`, fontSize: `20px`, paddingBottom: `15px` }}
				placeholder={placeholder}
				onFocus={handleBlur}
				onBlur={handleBlur}
			/>

			<label
				htmlFor={id}
				style={{
					paddingTop: `11px`,
					backgroundColor: `transparent`,
					fontSize: `17px`,
					justifyContent: 'center',
				}}
			>
				{placeholder}
			</label>
		</div>
	);
};

export default FloatingInput;
