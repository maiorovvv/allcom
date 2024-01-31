import { ProductInfo } from '../product/ProductInfo';
import { StorageFormValues } from '../storage/StorageFormValues';

export interface ContentItem {
	product: ProductInfo;
	storage: StorageFormValues;
}
