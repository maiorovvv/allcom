// src/features/auth/authSlice.ts
import * as api from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginCredentials from './types/LoginCredentials';

export const login = createAsyncThunk('auth/login', (creditials: LoginCredentials) =>
	api.getCurrentUser(creditials)
);
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		user: null,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
