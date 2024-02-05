import { ChangeEvent, FC, memo } from 'react';
import { FormikProps } from 'formik';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import { ProductFormValues } from '../../../types/product/ProductFormValues';
import SwiperModalWindow from '../../../components/Swiper/MediaSwiper';

import styles from './ProductFields.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import { useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../categories/selectors';
import { getByCurrentLocale } from '../../categories/utilsCategories';
import i18next from 'i18next';

const PARENT_ID_MAIN_CATEGORIES = 0;

export const DECIMAL_STEP = '0.01';

export type CategoryOptions = {
	value: number;
	label: string;
};

export type AreaOptions = {
	value: string;
	label: string;
};

export interface PropsInterface {
	loadingImage?: boolean;
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
		loadingImage,
	} = props;

	const { t } = useTranslation('product_fields');

	const locale = i18next.language;

	const mainCategories = useAppSelector(selectCategories).filter(
		(item) => item.parentId !== PARENT_ID_MAIN_CATEGORIES
	);

	const selectOptionsCategory: CategoryOptions[] = [
		...(mainCategories?.map((category) => ({
			value: category.id,
			label: `${category[getByCurrentLocale(locale)]}`,
		})) || []),
	];

	const filterOptions = (selectedValue: number): CategoryOptions[] => {
		return selectOptionsCategory.filter(({ value }) => value === selectedValue);
	};

	const selectOptionsArea: AreaOptions[] = [
		{ value: 'R', label: t('RIGHT') },
		{ value: 'L', label: t('LEFT') },
	];

	const addProductButton = (
		<div className="d-flex justify-content-center pt-3">
			<button
				type="submit"
				name="submit"
				className={styles.container_btn}
				data-testid="add_product-button"
			>
				{t('add_product')}
			</button>
		</div>
	);

	const shelf = (
		<FormikInputField
			name="storage.shelf"
			id="shelf"
			type="number"
			value={values.storage.shelf}
			data-testid="shelf"
		/>
	);

	const section = (
		<FormikInputField
			name="storage.section"
			id="section"
			type="number"
			value={values.storage.section}
			data-testid="section"
		/>
	);

	const rack = (
		<FormikInputField
			name="storage.rack"
			id="rack"
			type="number"
			value={values.storage.rack}
			data-testid="rack"
		/>
	);

	const areaSelect = (
		<Select
			id="area"
			data-testid="area_select"
			defaultValue={selectOptionsArea[0]}
			value={selectOptionsArea.filter(({ value }) => value === values.storage.area)}
			name="storage.area"
			options={selectOptionsArea}
			onChange={(option) => setFieldValue('storage.area', option ? option.value : null)}
			theme={(theme) => ({
				...theme,
				spacing: {
					...theme.spacing,
					controlHeight: 48,
				},
			})}
		/>
	);
	const areaInput = (
		<div>
			<label htmlFor="area">{t('side')}</label>
			<div className={styles.input}>{areaSelect}</div>
		</div>
	);

	const rackInput = (
		<div>
			<label htmlFor="rack">{t('rack')}</label>
			<div className={styles.input}>{rack}</div>
		</div>
	);

	const sectionInput = (
		<div>
			<label htmlFor="section">{t('vertical_section')}</label>
			<div className={styles.input}>{section}</div>
		</div>
	);

	const shelfInput = (
		<div>
			<label htmlFor="shelf">{t('horizontal_shelf')}</label>
			<div>{shelf}</div>
		</div>
	);
	const storage = (
		<div className={styles.sub_container}>
			<div className="login_register--divide">
				<span className="login_register--divide__text text-uppercase">{t('storage_info')}</span>
			</div>
			<div className="row">
				<div className="col">{areaInput}</div>
			</div>
			<div className="row">
				<div className="col">{rackInput}</div>
			</div>
			<div className="row">
				<div className="col">{sectionInput}</div>
			</div>
			<div className="row">
				<div className="col">{shelfInput}</div>
			</div>
		</div>
	);

	const endAt = (
		<Datepicker
			id="plannedEndAt"
			name="auction.plannedEndAt"
			label={t('planned_end_at')}
			value={values.auction.plannedEndAt}
			handleChange={handleChange}
			data-testid="auction.plannedEndAt"
		/>
	);

	const startAt = (
		<Datepicker
			id="startAt"
			name="auction.startAt"
			label={t('start_at')}
			value={values.auction.startAt}
			handleChange={handleChange}
			data-testid="auction.startAt"
		/>
	);

	const startPrice = (
		<FormikInputField
			id="startPrice"
			name="auction.startPrice"
			placeholder={t('start_price')}
			type="number"
			//value={values.auction.startPrice}
			data-testid="startPrice"
		/>
	);

	const auction = (
		<div className={styles.sub_container}>
			<div className="login_register--divide mb-5">
				<span className="login_register--divide__text text-uppercase">{t('auction_info')}</span>
			</div>
			<div className={styles.auction}>
				{startPrice}
				{startAt}
				{endAt}
			</div>
		</div>
	);

	const categorySelect = (
		<Select
			placeholder={t('category')}
			defaultValue={selectOptionsCategory}
			value={filterOptions(values.categoryId)}
			name="categoryId"
			options={selectOptionsCategory}
			onChange={(option) => setFieldValue('categoryId', option ? option.value : null)}
			data-testid="categoryId_select"
			className={styles.category}
		/>
	);

	const weightANDcolor = (
		<div className="row">
			<div className="col pe-2">
				<FormikInputField
					name="weight"
					placeholder={t('weight')}
					id="weight"
					type="number"
					step={DECIMAL_STEP}
					value={values.weight}
					data-testid="weight_select"
				/>
			</div>
			<div className="col ps-2">
				<FormikInputField
					name="color"
					placeholder={t('color')}
					id="color"
					value={values.color}
					data-testid="color_select"
				/>
			</div>
		</div>
	);

	const descriptionProduct = (
		<FormikTextAriaField
			name="description"
			placeholder={t('description')}
			id="description"
			className={styles.description}
			value={values.description}
			data-testid="description"
		/>
	);

	const nameProduct = (
		<FormikInputField
			name="name"
			placeholder={t('name')}
			id="productName"
			value={values.name}
			data-testid="productName"
		/>
	);

	const product = (
		<div className={` ${styles.sub_container}`}>
			<div className="login_register--divide mb-4">
				<span className="login_register--divide__text text-uppercase">{t('product_info')}</span>
			</div>
			<div>
				{nameProduct}
				{descriptionProduct}
				{weightANDcolor}
				{categorySelect}
			</div>
		</div>
	);

	const photoInputContainer = (
		<div className={styles.sub_container}>
			<div className="login_register--divide mb-5">
				<span className="login_register--divide__text text-uppercase">{t('product_photo')}</span>
			</div>
			<input
				className={`form-control ${styles.file_form}`}
				name="images"
				type="file"
				id="formFileMultiple"
				multiple
				onChange={onFileChange}
				data-testid="images"
			/>
			{loadingImage ? (
				<div
					className="d-flex align-items-center justify-content-center"
					data-testid="loadingImage"
				>
					<Spinner data-testid="Spinner" />
				</div>
			) : (
				<SwiperModalWindow
					images={linkList}
					onDelete={onDeleteImage}
					data-testid="SwiperModalWindow"
				/>
			)}
			{resizingError && <div className="warning_message--validation mt-2 p-2">{resizingError}</div>}
			{addProductButton}
		</div>
	);
	return (
		<div className={`pb-4 ${styles.container}`}>
			<div className={`row ${styles.row}`}>
				<div className="col-md-4 pb-3">{product}</div>
				<div className="col-md-4 col-sm-6 pb-3">{storage}</div>
				<div className="col-md-4 col-sm-6 pb-3">{auction}</div>
			</div>
			{photoInputContainer}
		</div>
	);
};

export default memo(ProductFields);
