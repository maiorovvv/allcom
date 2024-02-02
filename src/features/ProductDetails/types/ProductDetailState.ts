import { ProductDto } from '../../../types/product/ProductApiResponse';

export interface ProductDetailState {
	product: ProductDto;
	loading: boolean;
	error?: string;
}
