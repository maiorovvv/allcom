import { FC, ChangeEvent } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

import styles from './datepicker.module.scss';

interface Props {
	id: string;
	name: string;
	label: string;
	dateTime: string;
	handleDateTimeChange: (event: ChangeEvent<HTMLInputElement>) => void;
	rows?: number;
	className?: string;
}

const Datepicker: FC<Props> = (props) => {
	const { id, name, label, dateTime, handleDateTimeChange, className = '' } = props;

	return (
		<Form.Group className={styles.container} controlId={`form${id}`}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				name={name}
				type="datetime-local"
				value={dateTime}
				onChange={handleDateTimeChange}
				className={styles.date}
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

export default Datepicker;
