import { AuctionFormValues } from '../auction/AuctionFormValues';
import { StorageFormValues } from '../storage/StorageFormValues';

export interface ProductFormValues {
	id?: number;
	name: string;
	description: string;
	weight: number;
	color: string;
	categoryId: number;
	imageLinks?: string[];
	imagesToRemove?: string[];
	auction: AuctionFormValues;
	storage: StorageFormValues;
	images?: File[];
}
