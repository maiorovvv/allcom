import apiConfig from '../../apiConfig';
import { ProductApiResponse, ProductDto } from '../../types/product/ProductApiResponse';
import { ProductFormValues } from '../../types/product/ProductFormValues';

interface ResponseData {
	message?: string;
}

export async function createProduct(data: ProductFormValues): Promise<ProductDto> {
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

export async function updateProduct(data: ProductFormValues): Promise<ProductDto> {
	const formData = new FormData();
	if (data.id !== undefined) {
		formData.append('id', data.id.toString());
	}
	formData.append('name', data.name);
	formData.append('description', data.description);
	formData.append('weight', data.weight.toString());
	formData.append('color', data.color);
	formData.append('categoryId', data.categoryId.toString());
	if (data.imageLinks !== undefined) {
		data.imageLinks.forEach((link) => {
			formData.append('imageLinks', link);
		});
	}
	if (data.imagesToRemove !== undefined) {
		data.imagesToRemove.forEach((link) => {
			formData.append('imagesToRemove', link);
		});
	}
	formData.append('auction', JSON.stringify(data.auction));
	formData.append('storage', JSON.stringify(data.storage));
	data.images?.forEach((image, index) => {
		formData.append(`images[${index}]`, image);
	});

	const res = await fetch(apiConfig.updateProductEndpoint, {
		method: 'PUT',
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

export async function getAllProducts(
	category_id: number,
	search_query = '',
	page_number = 0
): Promise<ProductApiResponse> {
	let apiUrl = apiConfig.getAllProductEndpoint;
	apiUrl += `?categoryId=${category_id}&searchQuery=${search_query}&page=${page_number}&size=20`;

	const res = await fetch(apiUrl);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}

	const response = await res.json();
	return response;
}

export async function loadProductsOnePerCategory(): Promise<ProductDto[]> {
	const res = await fetch(`${apiConfig.getProductsOnePerCategoryEndpoint}`);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}

export async function getProductById(product_id: number): Promise<ProductDto> {
	const res = await fetch(`${apiConfig.getProductByIdEndpoint}${product_id}`);

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse.message;
		throw new Error(message);
	}
	const response = await res.json();
	return response;
}
