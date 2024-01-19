import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/UserState';

const initialState: UserState = {
	user: null,
	loading: false,
	users: [],
	loadingAllUsers: false,
	limit: 0,
	skip: 0,
	totalUsers: 0,
	error: '',
};

export const loadUser = createAsyncThunk('user/loadUser', () => api.getUserDate());

export const loadLimitedUsers = createAsyncThunk('user/loadLimitedUsers', (skip: number) =>
	api.getUsersWithLimitAndSkip(skip)
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
				state.users = action.payload.users;
				state.limit = action.payload.limit;
				state.skip = action.payload.skip;
				state.totalUsers = action.payload.total;
				state.loadingAllUsers = false;
			})
			.addCase(loadLimitedUsers.rejected, (state, action) => {
				state.loadingAllUsers = false;
				state.error = action.error.message;
			})
			.addCase(getFoundUser.fulfilled, (state, action) => {
				state.users = action.payload.users;
				state.limit = action.payload.limit;
				state.skip = action.payload.skip;
				state.totalUsers = action.payload.total;
			})
			.addCase(getFoundUser.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadDefaultUsers.fulfilled, (state, action) => {
				state.users = action.payload.users;
				state.limit = action.payload.limit;
				state.skip = action.payload.skip;
				state.totalUsers = action.payload.total;
			})
			.addCase(loadDefaultUsers.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
