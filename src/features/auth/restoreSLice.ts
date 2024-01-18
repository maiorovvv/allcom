import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import RestoreCredentials from './types/RestoreCredentials';
import RestoreEnterNewPasswordCredentials from './types/RestoreEnterNewPasswordCredentials';
import * as api from './api';

export const restoreUser = createAsyncThunk(
	'auth/restore_password',
	(credentials: RestoreCredentials) => api.restoreUser(credentials)
);

export const restoreSlice = createSlice({
	name: 'restoreUser',
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
export const restoreUserNewPassword = createAsyncThunk(
	'auth/restore_password_new',
	(credentials: RestoreEnterNewPasswordCredentials) => api.restoreUserNewPassword(credentials)
);
export const restoreUserNewPasswordSlice = createSlice({
	name: 'restoreUserNewPassword',
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

export const { logout } = restoreSlice.actions;

export default restoreSlice.reducer;
