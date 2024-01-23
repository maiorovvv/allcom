import { AuctionFormValues } from '../auction/AuctionFormValues';
import { StorageFormValues } from '../storage/StorageFormValues';

export interface ProductFormValues {
	product: {
		name: string;
		description: string;
		weight: number;
		color: string;
		categoryId: number;
		buyPrice: number;
		images: string[];
	};
	auction: AuctionFormValues;
	storage: StorageFormValues;
	files: File[];
}
