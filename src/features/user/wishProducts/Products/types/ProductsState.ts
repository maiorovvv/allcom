import Product from './Product';

export default interface ProductState {
	products: Product[];
	loading: boolean;
	error?: string;
}
