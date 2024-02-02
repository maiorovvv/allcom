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
	shelf: yup.number().integer().min(0),
});

export const ProductValidationSchema = yup.object().shape({
	name: yup.string().required(REQUIRED),
	description: yup.string().required(REQUIRED),
	weight: yup.number().min(0).required(REQUIRED),
	color: yup.string().required(REQUIRED),
	categoryId: yup.number().integer().min(0).integer().required(REQUIRED),
	storage: StorageValidationSchema,
	auction: AuctionValidationSchema,
});

export const initialValues = (
	startAt: string,
	plannedEndAt: string,
	id?: number
): ProductFormValues => ({
	id: id || undefined,
	name: '',
	description: '',
	weight: 0,
	color: '-',
	categoryId: 1,
	imageLinks: [],
	imagesToRemove: [],
	storage: {
		area: 'R',
		rack: 0,
		section: 0,
		shelf: 0,
	},
	auction: {
		startAt,
		plannedEndAt,
		startPrice: 1,
	},
	images: [],
});
