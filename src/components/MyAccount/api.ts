import User from './types/User';

export async function getUserDate(): Promise<User> {
	const res = await fetch('https://fakestoreapi.com/users/2');
	return res.json();
}
