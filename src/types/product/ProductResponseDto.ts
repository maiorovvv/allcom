import { AuctionFormValues } from '../auction/AuctionFormValues';
import { StorageFormValues } from '../storage/StorageFormValues';
import { ProductInfo } from './ProductInfo';

export interface ProductResponseDto {
	content: {
		product: ProductInfo;
		storage: Storage;
	}[];
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	first: boolean;
	numberOfElements: number;
	empty: boolean;

	auction: AuctionFormValues;
	storage: StorageFormValues;
	error?: string;
}

// export interface ProductResponseDto {
// 	product: {
// 		id: number;
// 		name: string;
// 		description: string;
// 		weight: number;
// 		color: string;
// 		categoryId: number;
// 		images: string[];
// 		imagesToDelete: string[];
// 	};
// 	auction: AuctionFormValues;
// 	storage: StorageFormValues;
// 	error?: string;
// }
