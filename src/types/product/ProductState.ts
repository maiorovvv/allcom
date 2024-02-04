import { ProductDto } from './ProductApiResponse';

export default interface ProductState {
	products: ProductDto[];
	loadingAllProducts: boolean;
	error?: string;
	productById: ProductDto;
	number: number;
	totalPages: number;
	// loading: boolean;
	// productsInPoster: ProductInfo[];
	// loadingProducsInPoster: boolean;
}
