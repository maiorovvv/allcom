export default interface User {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	phone: number;
	email: string;
	password: string;
	address: {
		city: string;
		street: string;
		number: string;
		address: string;
	};
	status: boolean;
}

export interface UsersResponse {
	users: User[];
	limit: number;
	total: number;
	skip: number;
}
