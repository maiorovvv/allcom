import { FC, ChangeEvent, useState, useMemo } from 'react';
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
import resizeAndCompressImage from '../../../components/utils/imageResizer';

const DEFAULT_START_WEEK = 1;
const DEFAULT_PLANNED_END_WEEK = 2;
const MINUTES_START = 0;
const NOON_HOUR = 13;
const MONDAY = 1;
const START_INDEX = 0;
const ISO_DATE_LENGTH = 16;

const AddProductPage: FC = () => {
	console.log('AAAAADDDDDSSSЕЕЕЕЕ');
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
	const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
	const loading = useAppSelector(selectLoading);
	const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
	const [files, setFiles] = useState<File[]>([]);

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (event.target.files) {
			setIsFileLoading(true);
			const newFileList = Array.from(event.target.files);
			const allFiles = [...files];

			for (const newFile of newFileList) {
				if (!allFiles.some((file) => file.name === newFile.name && file.size === newFile.size)) {
					try {
						const resizedFile = await resizeAndCompressImage({
							file: newFile,
							maxWidth: 1600,
							maxHeight: 1200,
							maxSizeMB: 1,
						});
						allFiles.push(resizedFile);
					} catch (e) {
						if (e instanceof Error) {
							setErrorMessage(`Error resizing file ${newFile.name}: ${e.message}`);
						} else {
							setErrorMessage(`Error resizing file ${newFile.name}`);
						}
					}
				}
			}

			setFiles(allFiles);
			setIsFileLoading(false);
		}
	};

	const formInitialValues = useMemo(() => {
		return initialValues(startAt, plannedEndAt);
	}, []);

	const navigate = useNavigate();
	const handleSave = async (
		formValues: ProductFormValues,
		setValues: (formValues: ProductFormValues) => void
	): Promise<void> => {
		console.log({ formValues });
		formValues.images = files;
		const dispatchResult = await dispatch(createProduct(formValues));
		if (createProduct.fulfilled.match(dispatchResult)) {
			dispatch(resetError());
			navigate('/products/product_added_success');
		}
	};

	const linkList = files.map((file) => URL.createObjectURL(file));
	const handleDeleteImage = (index: number): void => {
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		setFiles(updatedFiles);
	};

	return (
		<div>
			<Formik
				initialValues={formInitialValues}
				validationSchema={ProductValidationSchema}
				enableReinitialize={true}
				onSubmit={(formValues, { setSubmitting, setValues }) => {
					handleSave(formValues, setValues).finally(() => setSubmitting(false));
				}}
			>
				{({ handleSubmit, values, handleChange, setFieldValue }) => (
					<Form onSubmit={handleSubmit}>
						<ProductFields
							onFileChange={handleFileChange}
							linkList={linkList}
							values={values}
							handleChange={handleChange}
							onDeleteImage={handleDeleteImage}
							setFieldValue={setFieldValue}
						/>
						<Button name="submit" type="submit" disabled={loading}>
							{loading || isFileLoading ? (
								<div className="text-center">
									<Spinner />
								</div>
							) : (
								'Submit'
							)}
						</Button>
					</Form>
				)}
			</Formik>
			<div className="warning_message--validation">{error}</div>
		</div>
	);
};

export default AddProductPage;
