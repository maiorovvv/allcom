import apiConfig from '../../apiConfig';
import { ProductFormValues } from '../../types/product/ProductFormValues';
import { ProductResponseDto } from '../../types/product/ProductResponseDto';

interface ResponseData {
	message?: string;
}

export async function createProduct(data: ProductFormValues): Promise<ProductResponseDto> {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('description', data.description);
	formData.append('weight', data.weight.toString());
	formData.append('color', data.color);
	formData.append('categoryId', data.categoryId.toString());
	formData.append('auction', JSON.stringify(data.auction));
	formData.append('storage', JSON.stringify(data.storage));
	data.images?.forEach((image, index) => {
		formData.append(`images[${index}]`, image);
	});

	const res = await fetch(apiConfig.addProductEndpoint, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
		body: formData,
	});

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}
