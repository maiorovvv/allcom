import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

interface Props {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	type?: string;
	rows?: number;
	className?: string;
	value?: string;
}

const FormikTextAriaField: FC<Props> = (props) => {
	const { id, name, label, rows = 3, placeholder, type = 'text', className = '', value } = props;

	return (
		<Form.Group className={className} controlId={`form${id}`}>
			<Form.Label>{label}</Form.Label>
			<Field
				as="textarea"
				rows={rows}
				id={id}
				className={className}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
			/>
			<ErrorMessage
				id={`error${id}`}
				name={name}
				component="div"
				className="warning_message--validation"
			/>
		</Form.Group>
	);
};

export default FormikTextAriaField;
