import { ChangeEvent, FC, memo } from 'react';
import { FormikProps } from 'formik';
import Select from 'react-select';

import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import { ProductFormValues } from '../../../types/product/ProductFormValues';
import SwiperModalWindow from '../../../components/SwiperModalWindow/SwiperModalWindow';

import { useTranslation } from 'react-i18next';

import styles from './ProductFields.module.css';

const DECIMAL_STEP = '0.01';

type Options = {
	value: number;
	label: string;
};

interface PropsInterface {
	onDeleteImage: (index: number) => void;
	onFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
	linkList: string[];
	values: ProductFormValues;
	handleChange: FormikProps<ProductFormValues>['handleChange'];
	setFieldValue: FormikProps<ProductFormValues>['setFieldValue'];
	resizingError: string | undefined;
}
const ProductFields: FC<PropsInterface> = (props) => {
	const {
		linkList,
		values,
		handleChange,
		onDeleteImage,
		onFileChange,
		setFieldValue,
		resizingError,
	} = props;

	const { t } = useTranslation('categories');

	const selectOptions: Options[] = [
		{ value: 1, label: t('category_1') },
		{ value: 2, label: t('category_2') },
		{ value: 3, label: t('category_3') },
		{ value: 4, label: t('category_4') },
		{ value: 5, label: t('category_5') },
		{ value: 6, label: t('category_6') },
		{ value: 7, label: t('category_7') },
		{ value: 8, label: t('category_8') },
		{ value: 9, label: t('category_9') },
	];

	const filterOptions = (selectedValue: number): Options[] => {
		return selectOptions.filter(({ value }) => value === selectedValue);
	};

	return (
		<>
			<div className="container row">
				<input type="file" name="product.images" multiple onChange={onFileChange} />
				<SwiperModalWindow images={linkList} onDelete={onDeleteImage} />
				{resizingError && <div className="warning_message--validation">{resizingError}</div>}
				<div className="col-6">
					<h2>Product Info</h2>
					<FormikInputField
						name="product.name"
						placeholder="name"
						id="productName"
						value={values.product.name}
					/>
					<FormikTextAriaField
						label="description"
						name="product.description"
						placeholder="Description"
						id="description"
						className={styles.description}
						value={values.product.description}
					/>
					<FormikInputField
						name="product.weight"
						placeholder="weight"
						id="weight"
						type="number"
						step={DECIMAL_STEP}
						value={values.product.weight}
					/>
					<FormikInputField
						name="product.color"
						placeholder="color"
						id="color"
						value={values.product.color}
					/>
					<Select
						defaultValue={selectOptions.find(
							(option) => option.value === values.product.categoryId
						)}
						value={filterOptions(values.product.categoryId)}
						name="product.categoryId"
						options={selectOptions}
						onChange={(option) => setFieldValue('product.categoryId', option ? option.value : null)}
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
							value={values.auction.startPrice}
						/>
						<Datepicker
							id="startAt"
							name="auction.startAt"
							label="Start At"
							value={values.auction.startAt}
							handleChange={handleChange}
						/>
						<Datepicker
							id="plannedEndAt"
							name="auction.plannedEndAt"
							label="Planned End At"
							value={values.auction.plannedEndAt}
							handleChange={handleChange}
						/>
					</div>
					<div>
						<h2>Storage Info</h2>
						<FormikInputField name="storage.area" id="area" value={values.storage.area} />
						<FormikInputField
							name="storage.rack"
							id="rack"
							type="number"
							value={values.storage.rack}
						/>
						<FormikInputField
							name="storage.section"
							id="section"
							type="number"
							value={values.storage.section}
						/>
						<FormikInputField
							name="storage.shelve"
							id="shelve"
							type="number"
							value={values.storage.shelve}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(ProductFields);
