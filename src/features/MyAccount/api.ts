import User, { UsersResponse } from './types/User';
import apiConfig from '../../apiConfig';
import { store } from '../../app/store';

// TODO change after adding new api
export async function getUserProfile(): Promise<User | null> {
	const token = store.getState().auth.token;

	if (!token) {
		return null;
	}

	const res = await fetch(apiConfig.getUserProfileEndpoint, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token || ''}`,
		},
	});

	return res.json();
}

export async function getUsersWithLimitAndSkip(skip = 0): Promise<UsersResponse> {
	const token = store.getState().auth.token;

	const res = await fetch(`${apiConfig.getAllUsersEndpoint}?limit=20&skip=${skip}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token || ''}`,
		},
	});
	return res.json();
}

export async function searchUser(email: string): Promise<UsersResponse> {
	const token = store.getState().auth.token;

	const res = await fetch(`${apiConfig.findUserByEmailEndpoint}/${email}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token || ''}`,
		},
	});
	return res.json();
}
