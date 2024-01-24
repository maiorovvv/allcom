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
	const response = api.getCurrentUser(creditials);
	// Saved Bearer Token in localStorage or in another safe place
	//localStorage.setItem('token', response.token);
	return response;
});

export const register = createAsyncThunk(
	'auth/register',
	async (credentials: RegisterCredentials) => {
		const response = await api.registerNewUser(credentials);
		//localStorage.setItem('token', response.token);
		return response;
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = undefined;
			state.token = undefined;
			//localStorage.removeItem('token');
		},
		// login: (state, action) => {
		// 	state.isAuthenticated = true;
		// 	state.user = action.payload;
		// 	state.token = localStorage.getItem('token');
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload;
				//state.token = localStorage.getItem('token');
			})
			.addCase(login.fulfilled, (state, action) => {
				//console.log('Login Fulfilled:', action.payload);
				state.isAuthenticated = true;
				state.user = {
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					email: action.payload.email,
				};
				state.token = action.payload.token;
				//state.token = localStorage.getItem('token');
			});
	},
});

export const { logout } = authSlice.actions;

// Exporting the combined reducer
export default authSlice.reducer;
