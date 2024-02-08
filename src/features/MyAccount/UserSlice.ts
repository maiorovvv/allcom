import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/UserState';

interface LoadUsersParams {
	limit?: number;
	skip?: number;
}

interface StatusUserParams {
	user_id: number;
	status: boolean;
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

export const loadAllUsers = createAsyncThunk(
	'user/loadAllUsers',
	({ limit, skip }: LoadUsersParams) => api.getAllUsers(limit, skip)
);

export const changeCheckedStatus = createAsyncThunk(
	'user/changeCheckedStatus',
	({ user_id, status }: StatusUserParams) => api.changeCheckedStatus(user_id, status)
);

export const changeBlockedStatus = createAsyncThunk(
	'user/changeBlockedStatus',
	({ user_id, status }: StatusUserParams) => api.changeCheckedStatus(user_id, status)
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
			.addCase(loadAllUsers.pending, (state) => {
				state.loadingAllUsers = true;
			})
			.addCase(loadAllUsers.fulfilled, (state, action) => {
				state.users = action.payload.content;
				state.totalPages = action.payload.totalPages;
				state.number = action.payload.number;
				state.loadingAllUsers = false;
			})
			.addCase(loadAllUsers.rejected, (state, action) => {
				state.loadingAllUsers = false;
				state.error = action.error.message;
			})

			.addCase(changeCheckedStatus.fulfilled, (state, action) => {
				const { id, checked } = action.payload;
				const userIndex = state.users.findIndex((user) => user.id === id);

				if (userIndex !== -1) {
					const updatedUser = { ...state.users[userIndex], checked };
					state.users[userIndex] = updatedUser;
				}

				// const updatedUser = { ...state.users[4], checked };
				// state.users[4] = updatedUser;
			})
			.addCase(changeCheckedStatus.rejected, (state, action) => {
				state.error = action.error.message;
			})

			.addCase(changeBlockedStatus.fulfilled, (state, action) => {
				const { id, blocked } = action.payload;
				const userIndex = state.users.findIndex((user) => user.id === id);

				if (userIndex !== -1) {
					const updatedUser = { ...state.users[userIndex], blocked };
					state.users[userIndex] = updatedUser;
				}
				// const updatedUser = { ...state.users[3], blocked: state.users[3].blocked ? false : true };
				// state.users[3] = updatedUser;
			})
			.addCase(changeBlockedStatus.rejected, (state, action) => {
				state.error = action.error.message;
			})

			.addCase(getFoundUser.fulfilled, (state, action) => {
				state.users = action.payload.users;
			})
			.addCase(getFoundUser.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
