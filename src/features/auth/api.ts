import apiConfig from '../../apiConfig';
import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import RestoreCredentials from './types/RestoreCredentials';
import RestoreEnterNewPasswordCredentials from './types/RestoreEnterNewPasswordCredentials';
import UserShortDTO from './types/UserShortDTO';

interface ResponseData {
	message?: string;
}
export async function loginUser({ email, password }: LoginCredentials): Promise<UserShortDTO> {
	const res = await fetch(apiConfig.loginEndpoint, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},

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
}: RegisterCredentials): Promise<UserShortDTO> {
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
	const res = await fetch(apiConfig.logoutEndpoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse?.message;
		throw new Error(message);
	}
	return undefined;
}

export async function restoreUser({ email }: RestoreCredentials): Promise<UserShortDTO> {
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
}: RestoreEnterNewPasswordCredentials): Promise<UserShortDTO> {
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

export async function authCheck(): Promise<UserShortDTO> {
	const res = await fetch(apiConfig.authCheckEndpoint, {
		headers: { 'Content-Type': 'application/json' },
	});

	if (res.status >= 400) {
		const jsonResponse: ResponseData = await res.json();
		const message = jsonResponse?.message;
		throw new Error(message);
	}
	return res.json();
}
