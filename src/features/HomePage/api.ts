import { ProductResponse, ProductData } from '../../types/Product';

export async function getAllProducts(skip: number): Promise<ProductResponse> {
	const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
	return res.json();
}

export async function getProduct(id: number): Promise<ProductData> {
	const res = await fetch(`https://dummyjson.com/products/${id}`);
	return res.json();
}

export async function getProductInPoster(): Promise<ProductResponse> {
	const res = await fetch('https://dummyjson.com/products');
	return res.json();
}
