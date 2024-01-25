import { FC, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { startOfWeek, addWeeks, setHours, setMinutes } from 'date-fns';

import { ProductValidationSchema, initialValues } from '../../../forms/ProductForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createProduct, resetError } from '../newProductsSlice';
import { selectError, selectLoading } from '../selectors';
import Spinner from '../../../components/Spinner/Spinner';
import ProductFields from '../ProductFields/ProductFields';
import { ProductFormValues } from '../../../types/product/ProductFormValues';
import Button from '../../../components/Button/Button';

const DEFAULT_START_WEEK = 1;
const DEFAULT_PLANNED_END_WEEK = 2;
const MINUTES_START = 0;
const NOON_HOUR = 13;
const MONDAY = 1;
const START_INDEX = 0;
const ISO_DATE_LENGTH = 16;

const AddProductPage: FC = () => {
	const dispatch = useAppDispatch();

	function getNextMondayAtNoonAfterWeeks(weeks: number): string {
		const now = new Date();
		const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: MONDAY });
		const futureMonday = addWeeks(startOfCurrentWeek, weeks);
		const futureMondayAtNoon = setHours(setMinutes(futureMonday, MINUTES_START), NOON_HOUR);

		return futureMondayAtNoon.toISOString().slice(START_INDEX, ISO_DATE_LENGTH);
	}

	const [startAt, setStartAt] = useState<string>(getNextMondayAtNoonAfterWeeks(DEFAULT_START_WEEK));
	const [plannedEndAt, setPlannedEndAt] = useState<string>(
		getNextMondayAtNoonAfterWeeks(DEFAULT_PLANNED_END_WEEK)
	);

	const error = useAppSelector(selectError);
	const loading = useAppSelector(selectLoading);
	const [files, setFiles] = useState<File[]>([]);
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (event.target.files) {
			setFiles(Array.from(event.target.files));
		}
	};

	const navigate = useNavigate();
	const handleSave = async (formValues: ProductFormValues): Promise<void> => {
		console.log({ formValues });
		formValues.files = files;
		const dispatchResult = await dispatch(createProduct(formValues));
		if (createProduct.fulfilled.match(dispatchResult)) {
			dispatch(resetError());
			navigate('/products/product_added_success');
		}
	};

	if (loading) {
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	}

	const dd = files.map((file) => URL.createObjectURL(file));

	return (
		<div>
			<Formik
				initialValues={initialValues(startAt, plannedEndAt)}
				validationSchema={ProductValidationSchema}
				onSubmit={(formValues, { setSubmitting }) => {
					handleSave(formValues);
					setSubmitting(false);
				}}
			>
				{({ handleSubmit, setFieldValue }) => (
					<Form onSubmit={handleSubmit}>
						<ProductFields
							startAt={startAt}
							plannedEndAt={plannedEndAt}
							onFileChange={handleFileChange}
							setStartAt={setStartAt}
							setPlannedEndAt={setPlannedEndAt}
							setFieldValue={setFieldValue}
							urls={dd}
						/>
						<Button btnType={true} text="submit" onClickBtn={() => handleSubmit} />
					</Form>
				)}
			</Formik>
			<div className="warning_message--validation">{error}</div>
		</div>
	);
};

export default AddProductPage;
