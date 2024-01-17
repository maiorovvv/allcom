import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import User from './types/User';
import NewUser from './types/newUser';

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
