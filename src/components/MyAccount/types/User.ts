export default interface User {
	id: number;
	name: {
		firstname: string;
		lastname: string;
	};
	username: string;
	email: string;
	password: string;
	address: {
		city: string;
		street: string;
		number: string;
	};
}
