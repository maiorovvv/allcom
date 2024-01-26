import { FC, memo } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage, FormikProps } from 'formik';
import { ProductFormValues } from '../../types/product/ProductFormValues';

interface Props {
	id: string;
	name: string;
	label: string;
	value: string;
	handleChange: FormikProps<ProductFormValues>['handleChange'];
	rows?: number;
	className?: string;
}

const Datepicker: FC<Props> = (props) => {
	const { id, name, label, value, handleChange, className = '' } = props;

	return (
		<Form.Group className={className} controlId={`form${id}`}>
			<Form.Label>{label}</Form.Label>
			<Form.Control name={name} type="datetime-local" value={value} onChange={handleChange} />
			<ErrorMessage
				id={`error${id}`}
				name={name}
				component="div"
				className="warning_message--validation"
			/>
		</Form.Group>
	);
};

export default memo(Datepicker);
