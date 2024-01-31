import apiConfig from '../../apiConfig';
import { ProductApiResponse } from '../../types/product/ProductApiResponse';
import { ProductResponseDto } from '../../types/product/ProductResponseDto';

export async function getAllProducts(page_number: number): Promise<ProductApiResponse> {
	const res = await fetch(`${apiConfig.getAllProductEndpoint}?page=${page_number}&size=20`);
	return res.json();
}

export async function getProductsInPoster(): Promise<ProductResponseDto> {
	const res = await fetch('https://dummyjson.com/products');
	return res.json();
}
