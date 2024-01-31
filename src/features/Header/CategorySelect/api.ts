import apiConfig from '../../../apiConfig';
import ResponseCategoryDto from './types/ResponseCategoryDto';

interface ResponseData {
	message?: string;
}

export async function getAllCategoryByParent(parent_id = 0): Promise<ResponseCategoryDto[]> {
	const res = await fetch(`${apiConfig.getAllCategoriesByParentEndpoint}${parent_id}`);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}
