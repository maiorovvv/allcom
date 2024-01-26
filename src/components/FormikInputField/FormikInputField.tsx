import { FC, memo } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

import FloatingInput from '../FloatingInput';

interface Props {
	id: string;
	name: string;
	placeholder?: string;
	type?: string;
	step?: string;
	className?: string;
	value?: string | number;
}

const FormikInputField: FC<Props> = (props) => {
	const { id, name, placeholder, type = 'text', className, value, step } = props;

	return (
		<Form.Group as={Col} controlId={`form${id}`}>
			<InputGroup>
				<Field
					as={FloatingInput}
					id={id}
					className={className}
					type={type}
					step={step}
					name={name}
					placeholder={placeholder}
					value={value}
				/>
			</InputGroup>
			<ErrorMessage
				id={`error${id}`}
				name={name}
				component="div"
				className="warning_message--validation"
			/>
		</Form.Group>
	);
};

export default memo(FormikInputField);
