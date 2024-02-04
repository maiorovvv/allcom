import apiConfig from '../../apiConfig';
import { ProductApiResponse } from '../../types/product/ProductApiResponse';
import { ProductResponseDto } from '../../types/product/ProductResponseDto';

interface ResponseData {
	message?: string;
}

export async function getAllProducts(
	category_id: number | null,
	search_query: string | null,
	page_number: number | null
): Promise<ProductApiResponse> {
	let apiUrl = apiConfig.getAllProductEndpoint;

	if (category_id) {
		apiUrl += `categoryId=${category_id}`;
		if (search_query) {
			apiUrl += `&searchQuery=${search_query}`;
		}
	}

	if (search_query) {
		apiUrl += `searchQuery=${search_query}`;
		if (page_number) {
			apiUrl += `&page=${page_number}`;
		}
	}

	if (page_number) {
		apiUrl += `page=${page_number}`;
	}

	const res = await fetch(apiUrl);
	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}

export async function getProductsInPoster(): Promise<ProductResponseDto> {
	const res = await fetch('https://dummyjson.com/products');
	return res.json();
}
