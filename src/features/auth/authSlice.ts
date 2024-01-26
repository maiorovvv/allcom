import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import LoginCredentials from './types/LoginCredentials';
import RegisterCredentials from './types/RegisterCredentials';
import * as api from './api';
import AuthState from './types/AuthState';

const initialState: AuthState = {
	isAuthenticated: false,
	user: undefined,
	token: undefined,
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

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutSync: (state) => {
			state.isAuthenticated = false;
			state.user = undefined;
			state.token = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					email: action.payload.email,
				};
				state.token = action.payload.token;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					email: action.payload.email,
				};
				state.token = action.payload.token;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = undefined;
				state.token = undefined;
			});
	},
});

export default authSlice.reducer;
