import UserDto from './User';

export default interface UserState {
	user?: UserDto;
	users: UserDto[];
	error?: string;
	loading?: boolean;
	loadingAllUsers: boolean;
	totalPages: number;
	number: number;
}
