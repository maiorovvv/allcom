import { FC, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { startOfWeek, addWeeks, setHours, setMinutes } from 'date-fns';

import { ProductValidationSchema, initialValues } from '../../../forms/ProductForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createProduct, resetError } from '../newProductsSlice';
import { selectError, selectLoading } from '../selectors';
import Spinner from '../../../components/Spinner/Spinner';
import ProductFields from '../ProductFields/ProductFields';
import { ProductFormValues } from '../../../types/product/ProductFormValues';

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
						{/* <div className="container row">
							<div className="col-6">
								<h2>Product Info</h2>
								<FormikInputField name="name" placeholder="Product Name" id="ProductName" />
								<FormikTextAriaField
									label="description"
									name="description"
									placeholder="Description"
									id="description"
									className={styles.description}
								/>
								<FormikInputField name="weight" placeholder="weight" id="weight" type="number" />
								<FormikInputField name="color" placeholder="color" id="color" />
								<FormikInputField
									name="categoryId"
									placeholder="categoryId"
									id="categoryId"
									type="number"
								/>
								<FormikInputField
									name="buyPrice"
									placeholder="buyPrice"
									id="buyPrice"
									type="number"
								/>
							</div>
							<div className="col-6">
								<div>
									<h2>Auction Info</h2>
									<FormikInputField
										id="startPrice"
										name="auction.startPrice"
										placeholder="start Price"
										type="number"
									/>
									<Datepicker
										id="startAt"
										name="auction.startAt"
										label="Start At"
										dateTime={startAt}
										handleDateTimeChange={(event) =>
											handleDateTimeChange(event, 'auction.startAt', setStartAt, setFieldValue)
										}
									/>
									<Datepicker
										id="plannedEndAt"
										name="auction.plannedEndAt"
										label="Planned End At"
										dateTime={plannedEndAt}
										handleDateTimeChange={(event) =>
											handleDateTimeChange(
												event,
												'auction.plannedEndAt',
												setPlannedEndAt,
												setFieldValue
											)
										}
									/>
								</div>
								<div>
									<h2>Storage Info</h2>
									<FormikInputField name="storage.area" id="area" />
									<FormikInputField name="storage.rack" id="rack" type="number" />
									<FormikInputField name="storage.section" id="section" type="number" />
									<FormikInputField name="storage.shelve" id="shelve" type="number" />
								</div>
							</div>
						</div>
						<input type="file" multiple onChange={handleFileChange} />
						{renderSwiperSlides()} */}

						<Button name="submit" type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
			<div className="warning_message--validation">{error}</div>
		</div>
	);
};

export default AddProductPage;
