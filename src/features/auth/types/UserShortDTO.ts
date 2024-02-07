export default interface UserShortDTO {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	authenticated?: boolean;
}
