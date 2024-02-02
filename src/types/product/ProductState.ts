import { ContentProduct, ProductDto } from './ProductApiResponse';

export default interface ProductState {
	products: ContentProduct[];
	loadingAllProducts: boolean;
	error?: string;
	productById: ProductDto;
	number: number;
	totalPages: number;
	// loading: boolean;
	// productsInPoster: ProductInfo[];
	// loadingProducsInPoster: boolean;
}
