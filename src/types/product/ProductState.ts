import { ProductDto } from './ProductApiResponse';

export default interface ProductState {
	products: ProductDto[];
	productsOnePerCategory: ProductDto[];
	productById: ProductDto;
	loading: boolean;
	loadingAllProducts: boolean;
	loadingProductById: boolean;
	loadingProductsOnePerCategory: boolean;
	error?: string;
	totalPages: number;
	number: number;
}
