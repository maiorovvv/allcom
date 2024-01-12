import User from './types/User';

// TODO change after adding new api
export async function getUserDate(): Promise<User> {
	const res = await fetch('https://fakestoreapi.com/users/4');
	return res.json();
}
