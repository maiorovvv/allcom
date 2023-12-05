import ProductInCart from './components/MyAuctions/Products/types/ProductInMyAuctions';
import User from './types/User';

export async function getUserDate(): Promise<User> {
	const res = await fetch('https://fakestoreapi.com/users/2');
	return res.json();
}

export async function removeProductFromMyAuctiones(id: number): Promise<ProductInCart | void> {
	await fetch(`https://fakestoreapi.com/products/${id}`, {
		method: 'DELETE',
	}).then((res) => {
		if (res.ok) {
			return res.json();
			console.log(res);
		} else {
			return alert(`Failed to delete product with id ${id}`);
		}
	});
}
