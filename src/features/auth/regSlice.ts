import * as api from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RegisterCredentials from './types/RegisterCredentials';

export const register = createAsyncThunk('auth/register', (credentials: RegisterCredentials) =>
	api.registerNewUser(credentials)
);
export const regSlice = createSlice({
	name: 'reg',
	initialState: {
		isAuthenticated: false,
		newUser: null,
	},
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.newUser = null;
		},
		register: (state, action) => {
			state.isAuthenticated = false;
			state.newUser = action.payload;
		},
	},
});

export const { logout } = regSlice.actions;

export default regSlice.reducer;
