import { ProductData } from './Product';

export default interface ProductState {
	products: ProductData[];
	loadingAllProducts: boolean;
	error?: string;
	productById: ProductData;
	loadingOneProduct: boolean;
	totalItems: number;
	skip: number;
	limit: number;
}
