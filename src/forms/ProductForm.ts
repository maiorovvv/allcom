import * as yup from 'yup';
import { REQUIRED } from './errorsText';
import { ProductFormValues } from '../types/product/ProductFormValues';

export const AuctionValidationSchema = yup.object().shape({
	startAt: yup.string().required(REQUIRED),
	plannedEndAt: yup.string().required(REQUIRED),
	startPrice: yup.number().integer().min(0).required(REQUIRED),
});

export const StorageValidationSchema = yup.object().shape({
	area: yup.string(),
	rack: yup.number().integer().min(0),
	section: yup.number().integer().min(0),
	shelve: yup.number().integer().min(0),
});

export const ProductInfoValidationSchema = yup.object().shape({
	name: yup.string().required(REQUIRED),
	description: yup.string().required(REQUIRED),
	weight: yup.number().integer().min(0).required(REQUIRED),
	color: yup.string().required(REQUIRED),
	categoryId: yup.number().integer().min(0).integer().required(REQUIRED),
	buyPrice: yup.number().integer().min(0).required(REQUIRED),
});

export const ProductValidationSchema = yup.object().shape({
	product: ProductInfoValidationSchema,
	storage: StorageValidationSchema,
	auction: AuctionValidationSchema,
});

export const initialValues = (startAt: string, plannedEndAt: string): ProductFormValues => ({
	product: {
		name: '',
		description: '',
		weight: 0,
		color: '-',
		categoryId: 0,
		buyPrice: 0,
		images: [],
	},
	storage: {
		area: '-',
		rack: 0,
		section: 0,
		shelve: 0,
	},
	auction: {
		startAt,
		plannedEndAt,
		startPrice: 1,
	},
	files: [],
});
