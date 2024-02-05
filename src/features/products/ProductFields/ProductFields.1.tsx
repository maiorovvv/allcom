import { FC } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import Spinner from '../../../components/Spinner/Spinner';
import { PropsInterface, CategoryOptions, AreaOptions, DECIMAL_STEP } from './ProductFields';
import MediaSwiper from '../../../components/Swiper/MediaSwiper';

import styles from './ProductFields.module.scss';

export const ProductFields: FC<PropsInterface> = (props) => {
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

	const selectOptionsCategory: CategoryOptions[] = [
		{ value: 1, label: t('categories:category_1') },
		{ value: 2, label: t('categories:category_2') },
		{ value: 3, label: t('categories:category_3') },
		{ value: 4, label: t('categories:category_4') },
		{ value: 5, label: t('categories:category_5') },
		{ value: 6, label: t('categories:category_6') },
		{ value: 7, label: t('categories:category_7') },
		{ value: 8, label: t('categories:category_8') },
		{ value: 9, label: t('categories:category_9') },
	];

	const filterOptions = (selectedValue: number): CategoryOptions[] => {
		return selectOptionsCategory.filter(({ value }) => value === selectedValue);
	};

	const selectOptionsArea: AreaOptions[] = [
		{ value: 'R', label: t('RIGHT') },
		{ value: 'L', label: t('LEFT') },
	];

	const addProductButton = (
		<button type="submit" name="submit" className={styles.btn} data-testid="add_product-button">
			{t('add_product')}
		</button>
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
	const storageInfoLabel = <h3 className="mb-3">{t('storage_info')}</h3>;
	const storageContainer = (
		<div className={styles.product_info__storage}>
			{storageInfoLabel}
			<div className={styles.product_info__storage__item}>
				{areaSelect}
				{rack}
				{section}
				{shelf}
				{addProductButton}
			</div>
		</div>
	);
	const plannedEndAt = (
		<Datepicker
			id="plannedEndAt"
			name="auction.plannedEndAt"
			label={t('planned_end_at')}
			value={values.auction.plannedEndAt}
			handleChange={handleChange}
			data-testid="plannedEndAt"
		/>
	);
	const startAt = (
		<Datepicker
			id="startAt"
			name="auction.startAt"
			label={t('start_at')}
			value={values.auction.startAt}
			handleChange={handleChange}
			data-testid="startAt"
		/>
	);
	const startPrice = (
		<FormikInputField
			id="startPrice"
			name="auction.startPrice"
			placeholder={t('start_price')}
			type="number"
			value={values.auction.startPrice}
			data-testid="startPrice"
		/>
	);
	const auctionInfoLabel = <h3 className="mb-3">{t('auction_info')}</h3>;
	const auctionInfoContainer = (
		<div className={styles.product_info__auction}>
			{auctionInfoLabel}
			<div className={styles.datepicker}>
				{startPrice}
				{startAt}
				{plannedEndAt}
			</div>
		</div>
	);
	const categorySelect = (
		<Select
			defaultValue={selectOptionsCategory}
			value={filterOptions(values.categoryId)}
			name="categoryId"
			options={selectOptionsCategory}
			onChange={(option) => setFieldValue('categoryId', option ? option.value : null)}
			data-testid="categoryId_select"
		/>
	);
	const weightANDcolor = (
		<div className="d-flex">
			<FormikInputField
				name="weight"
				placeholder={t('weight')}
				id="weight"
				type="number"
				step={DECIMAL_STEP}
				value={values.weight}
				data-testid="weight_select"
			/>
			<FormikInputField
				name="color"
				placeholder={t('color')}
				id="color"
				value={values.color}
				data-testid="color_select"
			/>
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
	const productInfoLabel = <h3 className="mb-3">{t('product_info')}</h3>;
	const productInfo = (
		<div className={styles.product_info__details}>
			{productInfoLabel}
			{nameProduct}
			{descriptionProduct}
			{weightANDcolor}
			{categorySelect}
		</div>
	);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.add_img}>
					<h3>{t('product_photo')}</h3>
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
							className="d-flex align-items-center justify-content-center h-100"
							data-testid="loadingImage"
						>
							<Spinner data-testid="Spinner" />
						</div>
					) : (
						<>
							<MediaSwiper
								images={linkList}
								onDelete={onDeleteImage}
								data-testid="SwiperModalWindow"
							/>
						</>
					)}
					{resizingError && <div className="warning_message--validation">{resizingError}</div>}
				</div>
				<div className={styles.product_info}>
					{productInfo}
					{auctionInfoContainer}
					{storageContainer}
				</div>
			</div>
		</>
	);
};
