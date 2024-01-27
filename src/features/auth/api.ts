import apiConfig from '../../apiConfig';
import { store } from '../../app/store';
import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import RestoreCredentials from './types/RestoreCredentials';
import RestoreEnterNewPasswordCredentials from './types/RestoreEnterNewPasswordCredentials';
import User from './types/User';
import UserDTO from './types/UserDTO';

interface ResponseData {
	message?: string;
}
export async function loginUser({ email, password }: LoginCredentials): Promise<UserDTO> {
	const res = await fetch(apiConfig.loginEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			password,
		}),
	});
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

export async function registerNewUser({
	firstName,
	lastName,
	email,
	phoneNumber,
	password,
	companyName,
	position,
	taxNumber,
	postIndex,
	city,
	street,
	houseNumber,
}: RegisterCredentials): Promise<User> {
	const res = await fetch(apiConfig.registerEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			phoneNumber,
			password,
			companyName,
			position,
			taxNumber,
			postIndex,
			city,
			street,
			houseNumber,
		}),
	});

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse?.message;
		throw new Error(message);
	}
	return res.json();
}

export async function logout(): Promise<void> {
	const token = store.getState().auth.token;
	if (token) {
		const res = await fetch(apiConfig.logoutEndpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.status >= 400) {
			const jsonResponse: ResponseData = await res.json();
			const message = jsonResponse?.message;
			throw new Error(message);
		}
		return undefined;
	}
}

export async function restoreUser({ email }: RestoreCredentials): Promise<User> {
	const resRestore = await fetch(apiConfig.restoreEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
		}),
	});
	if (resRestore.status >= 400) {
		const jsonResponse: ResponseData = await resRestore.json();
		const message = jsonResponse?.message;
		throw new Error(message);
	}
	return resRestore.json();
}
export async function restoreUserNewPassword({
	password,
}: RestoreEnterNewPasswordCredentials): Promise<User> {
	const resRestore = await fetch(apiConfig.restoreNewPasswordEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password,
		}),
	});
	if (resRestore.status >= 400) {
		const jsonResponse: ResponseData = await resRestore.json();
		const message = jsonResponse?.message;
		throw new Error(message);
	}
	return resRestore.json();
}
