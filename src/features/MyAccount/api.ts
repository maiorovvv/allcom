import User, { UsersResponse } from './types/User';

// TODO change after adding new api
export async function getUserDate(): Promise<User> {
	const res = await fetch('https://fakestoreapi.com/users/4');
	return res.json();
}

export async function getUsersWithLimitAndSkip(skip = 0): Promise<UsersResponse> {
	const res = await fetch(`https://dummyjson.com/users?limit=20&skip=${skip}`);
	return res.json();
}

export async function searchUser(name: string): Promise<UsersResponse> {
	const res = await fetch(`https://dummyjson.com/users/search?q=${name}`);
	return res.json();
}
