import { ProductDto } from '../../../types/product/ProductApiResponse';

export default interface HomePageState {
	products: ProductDto[];
	loadingAllProducts: boolean;
	error?: string;
	productById: ProductDto;
	number: number;
	totalPages: number;
	// productsInPoster: ProductInfo[];
	// loadingProducsInPoster: boolean;
}
