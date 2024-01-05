import { ProductsInPoster } from '../components/Poster/types/ProductsInPoster';
import { ProductData } from '../../../types/Product';

export default interface ProductState {
	products: ProductData[];
	loadingAllProducts: boolean;
	error?: string;
	productById: ProductData;
	loadingOneProduct: boolean;
	totalItems: number;
	skip: number;
	limit: number;
	productsInPoster: ProductsInPoster[];
	loadingProducsInPoster: boolean;
}
