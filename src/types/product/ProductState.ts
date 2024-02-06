import { ProductDto } from './ProductApiResponse';

export default interface ProductState {
	products: ProductDto[];
	productById: ProductDto;
	loading: boolean;
	loadingAllProducts: boolean;
	loadingProductById: boolean;
	error?: string;
	totalPages: number;
	number: number;
}
