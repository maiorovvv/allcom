import { AuctionFormValues } from '../auction/AuctionFormValues';
import { StorageFormValues } from '../storage/StorageFormValues';

export interface ProductResponseDto {
	product: {
		id: number;
		name: string;
		description: string;
		weight: number;
		color: string;
		categoryId: number;
		images: string[];
		imagesToDelete: string[];
	};
	auction: AuctionFormValues;
	storage: StorageFormValues;
	error?: string;
}
