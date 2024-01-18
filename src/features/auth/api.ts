import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import RestoreCredentials from './types/RestoreCredentials';
import RestoreEnterNewPasswordCredentials from './types/RestoreEnterNewPasswordCredentials';
import User from './types/User';
import NewUser from './types/newUser';
import RestoreUser from './types/RestoreUser';

export async function getCurrentUser({ email, password }: LoginCredentials): Promise<User> {
	const resLogin = await fetch('https://dummyjson.com/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			password,
		}),
	});
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
}: RegisterCredentials): Promise<NewUser> {
	const resRegister = await fetch('https://dummyjson.com/auth/register', {
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

	return resRegister.json();
}

export async function restoreUser({ email }: RestoreCredentials): Promise<RestoreUser> {
	const resRestore = await fetch('https://dummyjson.com/auth/restore', {
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
}: RestoreEnterNewPasswordCredentials): Promise<RestoreUser> {
	const resRestore = await fetch('https://dummyjson.com/auth/restoreMewPassword', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password,
		}),
	});
	return resRestore.json();
}
