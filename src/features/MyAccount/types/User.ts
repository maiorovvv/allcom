export default interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	companyName: string;
	position: string;
	taxNumber: string;
	index: string;
	city: string;
	street: string;
	houseNumber: string;
	blocked: boolean;
}

export interface UsersResponse {
	users: User[];
	limit: number;
	total: number;
	skip: number;
}
