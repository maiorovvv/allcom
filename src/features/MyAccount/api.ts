import User, { UsersResponse } from './types/User';
import apiConfig from '../../apiConfig';
import { store } from '../../app/store';

// TODO change after adding new api
export async function getUserDate(): Promise<User> {
	//TODO if token is empty
	const res = await fetch(apiConfig.getUserProfileEndpoint, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${store.getState().auth.token || ''}`,
		},
	});
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
