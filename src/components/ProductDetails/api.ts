import ProductDetails from './types/ProductDetails';

export async function getAll(): Promise<ProductDetails> {
	const res = await fetch('https://dummyjson.com/products/1');
	//const res = await fetch('https://api.escuelajs.co/api/v1/products/4');
	return res.json();
}
