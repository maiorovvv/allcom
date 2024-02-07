import UserDto, { UserApiResponse, UsersResponse } from './types/User';
import apiConfig from '../../apiConfig';

export async function getUserProfile(): Promise<UserDto> {
	const res = await fetch(apiConfig.getUserProfileEndpoint, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return res.json();
}

export async function getUsersWithLimitAndSkip(limit = 20, skip = 0): Promise<UserApiResponse> {
	const res = await fetch(`${apiConfig.getAllUsersEndpoint}?limit=${limit}&skip=${skip}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return res.json();
}

export async function searchUser(email: string): Promise<UsersResponse> {
	const res = await fetch(`${apiConfig.findUserByEmailEndpoint}/${email}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return res.json();
}
