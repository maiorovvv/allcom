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
	startPrice?: number,
	auctionId?: number,
	id?: number,
	name?: string,
	description?: string,
	weight?: number,
	color?: string,
	categoryId?: number,
	imageLinks?: string[],
	storageId?: number,
	area?: string,
	rack?: number,
	section?: number,
	shelf?: number
): ProductFormValues => ({
	id: id || undefined,
	name: name || '',
	description: description || '',
	weight: weight || 0,
	color: color || '-',
	categoryId: categoryId || 1,
	imageLinks: imageLinks || [],
	imagesToRemove: [],
	storage: {
		area: area || 'R',
		rack: rack || 0,
		section: section || 0,
		shelf: shelf || 0,
		id: storageId || undefined,
	},
	auction: {
		startAt,
		plannedEndAt,
		startPrice: startPrice || 1,
		id: auctionId || undefined,
	},
	images: [],
});
