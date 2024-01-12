import ProductInMyAuctions from './ProductInMyAuctions';

export default interface ProductState {
	productsInMyAuctions: ProductInMyAuctions[];
	loading: boolean;
	error?: string;
}
