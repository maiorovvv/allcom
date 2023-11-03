import Product from './Products/types/Product';

export async function getAll(): Promise<Product[]> {
	const res = await fetch('https://fakestoreapi.com/products');
	return res.json();
}
