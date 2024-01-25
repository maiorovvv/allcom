import { ProductFormValues } from '../../types/product/ProductFormValues';
import { ProductInfo } from '../../types/product/ProductInfo';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

interface ResponseData {
	message?: string;
}

export async function createProduct(data: ProductFormValues): Promise<ProductInfo> {
	const formData = new FormData();
	formData.append('product', JSON.stringify(data.product));
	formData.append('auction', JSON.stringify(data.auction));
	formData.append('storage', JSON.stringify(data.storage));
	data.images.forEach((image, index) => {
		formData.append(`images[${index}]`, image);
	});

	const res = await fetch(API_BASE_URL + 'api/products/add', {
		method: 'POST',
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
