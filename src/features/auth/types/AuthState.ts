import UserShortDTO from './UserShortDTO';
export default interface AuthState {
	isAuthenticated: boolean;
	user?: UserShortDTO;
	loading: boolean;
	error?: string;
}
