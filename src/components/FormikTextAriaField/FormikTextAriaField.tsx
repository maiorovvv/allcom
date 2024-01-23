import { FC, ReactNode } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

interface Props {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	type?: string;
	// children?: ReactNode;
	rows?: number;
	className?: string;
}

const FormikTextAriaField: FC<Props> = (props) => {
	const { id, name, label, rows = 3, placeholder, type = 'text', className = '' } = props;

	return (
		<Form.Group className={className} controlId={`form${id}`}>
			<Form.Label>{label}</Form.Label>
			{/* <Form.Control as="textarea" rows={rows} style={{ fontSize: '20px' }}> */}
			{/* <Field
					as={textarea}
					id={id}
					className={className}
					type={type}
					name={name}
					placeholder={placeholder}
				/> */}
			<Field
				as="textarea"
				rows={rows}
				id={id}
				className={className}
				type={type}
				name={name}
				placeholder={placeholder}
			/>
			{/* </Form.Control> */}
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
