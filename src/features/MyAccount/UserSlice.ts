import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/UserState';

interface LoadUsersParams {
	limit?: number;
	skip?: number;
}

const initialState: UserState = {
	user: undefined,
	users: [],
	loadingAllUsers: false,
	totalPages: 0,
	number: 0,
	loading: false,
	error: '',
};

export const loadUser = createAsyncThunk('user/loadUser', () => api.getUserProfile());

export const loadLimitedUsers = createAsyncThunk(
	'user/loadLimitedUsers',
	({ limit, skip }: LoadUsersParams) => api.getUsersWithLimitAndSkip(limit, skip)
);

export const loadDefaultUsers = createAsyncThunk('user/loadDefaultUser', () =>
	api.getUsersWithLimitAndSkip()
);

export const getFoundUser = createAsyncThunk('user/foundUser', (name: string) =>
	api.searchUser(name)
);

export const userSlice = createSlice({
	name: 'userDate',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(loadLimitedUsers.pending, (state) => {
				state.loadingAllUsers = true;
			})
			.addCase(loadLimitedUsers.fulfilled, (state, action) => {
				state.users = action.payload.content;
				state.totalPages = action.payload.totalPages;
				state.number = action.payload.number;
				state.loadingAllUsers = false;
			})
			.addCase(loadLimitedUsers.rejected, (state, action) => {
				state.loadingAllUsers = false;
				state.error = action.error.message;
			})
			.addCase(getFoundUser.fulfilled, (state, action) => {
				state.users = action.payload.users;
			})
			.addCase(getFoundUser.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadDefaultUsers.fulfilled, (state, action) => {
				state.users = action.payload.users;
			})
			.addCase(loadDefaultUsers.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
