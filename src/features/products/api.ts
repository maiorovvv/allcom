import { ProductFormValues } from '../../types/product/ProductFormValues';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export async function createProduct(data: ProductFormValues): Promise<ProductFormValues> {
	console.log({ data });
	const formData = new FormData();
	formData.append('product', JSON.stringify(data.product));
	formData.append('auction', JSON.stringify(data.auction));
	formData.append('storage', JSON.stringify(data.storage));
	data.files.forEach((file, index) => {
		formData.append(`files[${index}]`, file);
	});

	console.log(formData);

	const res = await fetch(API_BASE_URL + 'api/products/add', {
		method: 'POST',
		// headers: { 'Content-Type': 'application/json' },
		body: formData,
	});

	if (res.status >= 400) {
		const { message } = await res.json();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		throw new Error(message || '');
	}

	console.log({ res });
	const response = await res.json();
	console.log({ response });
	return response;
}
