import Product from './ProductDetails';

export default interface ProductDetailState {
	product: Product;
	loading: boolean;
	error?: string;
}
