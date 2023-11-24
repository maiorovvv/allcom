import ProductDetails from './types/ProductDetails';

export async function getAll(): Promise<ProductDetails> {
	const res = await fetch('https://dummyjson.com/products/1');
	return res.json();
}
