import { ProductInfo } from './ProductInfo';

export default interface ProductState {
	products: ProductInfo[];
	loading: boolean;
	error?: string;
}
