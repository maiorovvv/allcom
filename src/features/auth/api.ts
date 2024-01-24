import apiConfig from '../../apiConfig';
import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import RestoreCredentials from './types/RestoreCredentials';
import RestoreEnterNewPasswordCredentials from './types/RestoreEnterNewPasswordCredentials';
import User from './types/User';
import UserDTO from './types/UserDTO';

export async function getCurrentUser({ email, password }: LoginCredentials): Promise<UserDTO> {
	const resLogin = await fetch(apiConfig.loginEndpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			password,
		}),
	});
	if (resLogin.status >= 400) {
		const { message }: { message: string } = await resLogin.json();
		throw new Error(message);
	}
	return resLogin.json();
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
	const resRegister = await fetch(apiConfig.registerEndpoint, {
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
	interface Error {
		message: string;
		field: string;
		rejectedValue: string;
	}
	if (resRegister.status >= 400) {
		const { errors }: { errors: Error[] } = await resRegister.json();
		errors.forEach((err) => {
			throw new Error(`${err.field} ${err.rejectedValue} ${err.message}`);
		});
	}
	return resRegister.json();
}

export async function logout(): Promise<void> {
	const userToken = localStorage.getItem('token');
	if (userToken) {
		await fetch(apiConfig.logoutEndpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		});
	} else {
		console.warn('Token not found in localStorage');
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
	return resRestore.json();
}
