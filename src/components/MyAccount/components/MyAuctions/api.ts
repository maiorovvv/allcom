import ProductInCart from './Products/types/ProductInMyAuctions';

export async function getAll(): Promise<ProductInCart[]> {
	const res = await fetch('https://fakestoreapi.com/products');
	return res.json();
}

export async function deleteOneProduct(id: number): Promise<ProductInCart> {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
		method: 'DELETE',
	});
	return res.json();
}
