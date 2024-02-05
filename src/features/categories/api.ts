import apiConfig from '../../apiConfig';
import { CategoriesDto } from './types/CategoriesDto';

interface ResponseData {
	message?: string;
}

export async function getAllCategoriesByParent(parent_id = 0): Promise<CategoriesDto[]> {
	const res = await fetch(`${apiConfig.getAllCategoriesByParentEndpoint}${parent_id}`);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}

export async function getAllCategories(): Promise<CategoriesDto[]> {
	const res = await fetch(apiConfig.getAllCategoriesEndpoint);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}
