import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

interface Props {
	id: string;
	name: string;
	placeholder: string;
	type?: string;
	rows?: number;
	className?: string;
	value?: string;
}

const FormikTextAriaField: FC<Props> = (props) => {
	const { id, name, rows = 5, placeholder, type = 'text', className = '', value } = props;

	return (
		<Form.Group className={className} controlId={`form${id}`}>
			<Field
				as="textarea"
				rows={rows}
				id={id}
				className={`${className} form-control`}
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
