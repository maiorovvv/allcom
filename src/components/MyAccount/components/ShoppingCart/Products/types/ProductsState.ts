import ProductInCart from './ProductInCart';

export default interface ProductState {
	productsInCart: ProductInCart[];
	loading: boolean;
	error?: string;
}
