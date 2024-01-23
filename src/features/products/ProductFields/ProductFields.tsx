import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { FormikErrors } from 'formik';

import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import { ProductFormValues } from '../../../types/product/ProductFormValues';

import styles from './ProductFields.module.css';
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
			<div className="container row">
				<div className="col-6">
					<h2>Product Info</h2>
					<FormikInputField name="product.name" placeholder="Product Name" id="ProductName" />
					<FormikTextAriaField
						label="description"
						name="product.description"
						placeholder="Description"
						id="description"
						className={styles.description}
					/>
					<FormikInputField name="product.weight" placeholder="weight" id="weight" type="number" />
					<FormikInputField name="product.color" placeholder="color" id="color" />
					<FormikInputField
						name="categoryId"
						placeholder="categoryId"
						id="categoryId"
						type="number"
					/>
					<FormikInputField
						name="product.buyPrice"
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
								handleDateTimeChange(event, 'auction.startAt', setStartAt)
							}
						/>
						<Datepicker
							id="plannedEndAt"
							name="auction.plannedEndAt"
							label="Planned End At"
							dateTime={plannedEndAt}
							handleDateTimeChange={(event) =>
								handleDateTimeChange(event, 'auction.plannedEndAt', setPlannedEndAt)
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
			<input type="file" name="product.images" multiple onChange={onFileChange} />
			<SwiperModalWindow images={urls} />
			{/* {renderSwiperSlides()} */}
		</>
	);
};

export default ProductFields;
