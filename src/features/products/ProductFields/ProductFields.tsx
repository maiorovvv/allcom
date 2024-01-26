import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { FormikErrors } from 'formik';

import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import { ProductFormValues } from '../../../types/product/ProductFormValues';

import styles from './ProductFields.module.scss';
import SwiperModalWindow from '../../HomePage/components/ModalWindow/SwiperModalWindow';
interface PropsInterface {
	startAt: string;
	plannedEndAt: string;
	urls: string[];
	onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	setStartAt: Dispatch<SetStateAction<string>>;
	setPlannedEndAt: Dispatch<SetStateAction<string>>;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean
	) => Promise<void | FormikErrors<ProductFormValues>>;
}
const ProductFields: FC<PropsInterface> = (props) => {
	const { startAt, plannedEndAt, onFileChange, urls, setStartAt, setPlannedEndAt, setFieldValue } =
		props;

	const handleDateTimeChange = (
		event: ChangeEvent<HTMLInputElement>,
		fieldName: string,
		targetSetter: Dispatch<SetStateAction<string>>
	): void => {
		const newValue = event.target.value;
		targetSetter(newValue);
		setFieldValue(fieldName, newValue);
	};

	const renderSwiperSlides = useCallback((): JSX.Element => {
		console.log('AAAAAA');
		// setFieldValue('images', urls);
		return <SwiperModalWindow images={urls} />;
	}, [urls]);
	return (
		<>
			<div className={styles.container}>
				{/* <div className={styles.product_input}> */}
				<div className={styles.product}>
					<h3>Product Info</h3>
					<FormikInputField name="product.name" placeholder="Product Name" id="ProductName" />
					<FormikTextAriaField
						name="product.description"
						placeholder="Description"
						id="description"
						className={styles.textarea}
					/>
					<FormikInputField name="product.weight" placeholder="weight" id="weight" type="number" />
					<FormikInputField name="product.color" placeholder="color" id="color" />
					<FormikInputField
						name="categoryId"
						placeholder="categoryId"
						id="categoryId"
						type="number"
					/>
				</div>
				<div className={styles.auction}>
					<div>
						<h3>Auction Info</h3>
						<FormikInputField
							id="startPrice"
							name="auction.startPrice"
							placeholder="start Price"
							type="number"
						/>
						<div className="d-flex justify-content-around align-items-end">
							<Datepicker
								id="startAt"
								name="auction.startAt"
								label="Start At"
								dateTime={startAt}
								handleDateTimeChange={(event) =>
									handleDateTimeChange(event, 'auction.startAt', setStartAt)
								}
								className={styles.date}
							/>
							<Datepicker
								id="plannedEndAt"
								name="auction.plannedEndAt"
								label="Planned End At"
								dateTime={plannedEndAt}
								handleDateTimeChange={(event) =>
									handleDateTimeChange(event, 'auction.plannedEndAt', setPlannedEndAt)
								}
								className={styles.date}
							/>
						</div>
					</div>
					<div>
						<h3>Storage Info</h3>
						<FormikInputField name="storage.area" id="area" />
						<FormikInputField name="storage.rack" id="rack" type="number" />
						<FormikInputField name="storage.section" id="section" type="number" />
						<FormikInputField name="storage.shelve" id="shelve" type="number" />
					</div>
				</div>
				{/* </div> */}
			</div>
			<input type="file" name="product.images" multiple onChange={onFileChange} />
			<SwiperModalWindow images={urls} />
			{/* {renderSwiperSlides()} */}
		</>
	);
};

export default ProductFields;
