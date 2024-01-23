import { ProductFormValues } from './ProductFormValues';

export default interface ProductState {
	product: ProductFormValues | null;
	loading: boolean;
	error?: string;
}
