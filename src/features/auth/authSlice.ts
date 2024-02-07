import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import * as api from './api';
import AuthState from './types/AuthState';

const initialState: AuthState = {
	isAuthenticated: false,
	user: undefined,
	loading: false,
	error: undefined,
};

export const login = createAsyncThunk('auth/login', async (creditials: LoginCredentials) => {
	const response = api.loginUser(creditials);
	return response;
});

export const register = createAsyncThunk(
	'auth/register',
	async (credentials: RegisterCredentials) => {
		const response = await api.registerNewUser(credentials);
		return response;
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await api.logout();
});

export const authCheck = createAsyncThunk('auth/check', () => api.authCheck());

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutSync: (state) => {
			state.isAuthenticated = false;
			state.user = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					role: action.payload.role,
					email: action.payload.email,
				};
				state.loading = false;
				state.error = undefined;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			})
			.addCase(login.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					role: action.payload.role,
					email: action.payload.email,
				};
				state.loading = false;
				state.error = undefined;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			})
			.addCase(logout.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = undefined;
				state.error = undefined;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			})
			.addCase(authCheck.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(authCheck.fulfilled, (state, action) => {
				state.isAuthenticated = Boolean(action.payload.authenticated);
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					role: action.payload.role,
					email: action.payload.email,
				};
				state.loading = false;
				state.error = undefined;
			})
			.addCase(authCheck.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			});
	},
});

export default authSlice.reducer;
