import { ProductResponse, ProductData } from '../../types/Product';

export async function getAllProducts(skip: number): Promise<ProductData[]> {
	const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
	const data: ProductResponse = await res.json();
	return data.products;
}

export async function getProduct(id: number): Promise<ProductData> {
	const res = await fetch(`https://dummyjson.com/products/${id}`);
	return res.json();
}
