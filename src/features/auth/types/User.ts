export default interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	token?: string; //TODO delete token
}
