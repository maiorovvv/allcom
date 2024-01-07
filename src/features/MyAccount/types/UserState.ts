import User from './User';

export default interface UserState {
	user: User | null;
	error?: string;
	loading?: boolean;
}
