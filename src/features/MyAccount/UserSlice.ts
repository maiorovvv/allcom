import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/UserState';
import { UserFormValues } from './types/UserFormValues';

interface LoadUsersParams {
	limit?: number;
	skip?: number;
}

interface StatusUserParams {
	user_id: number;
	status: boolean;
}

interface UpdateUserParams {
	user_id: number;
	data: UserFormValues;
}

const initialState: UserState = {
	user: {
		id: -1,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		companyName: '',
		position: '',
		taxNumber: '',
		role: '',
		address: {
			postIndex: '',
			city: '',
			street: '',
			houseNumber: '',
		},
		checked: false,
		blocked: false,
		error: '',
	},
	users: [],
	loading: false,
	loadingUpdateUserById: false,
	loadingAllUsers: false,
	totalPages: 0,
	number: 0,
	error: '',
};

export const loadUser = createAsyncThunk('user/loadUser', () => api.getUserProfile());

export const loadUserById = createAsyncThunk('user/loadUserById', (user_id: number) =>
	api.getUserById(user_id)
);

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
	({ user_id, status }: StatusUserParams) => api.changeBlockedStatus(user_id, status)
);

export const updateUserById = createAsyncThunk(
	'user/updateUser',
	({ user_id, data }: UpdateUserParams) => api.updateUser(user_id, data)
);

export const getFoundUser = createAsyncThunk('user/foundUser', (name: string) =>
	api.searchUser(name)
);

export const userSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		findUserById: (state, action) => {
			const userId = action.payload;
			const userFound = state.users.find((user) => user.id === userId);
			if (userFound) {
				state.user = userFound;
			}
		},
	},
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
				state.loadingAllUsers = false;

				if (userIndex !== -1) {
					const updatedUser = { ...state.users[userIndex], checked };
					state.users[userIndex] = updatedUser;
				}

				// const updatedUser = { ...state.users[4], checked };
				// state.users[4] = updatedUser;
			})
			.addCase(changeCheckedStatus.rejected, (state, action) => {
				state.error = action.error.message;
				state.loadingAllUsers = false;
			})
			.addCase(changeCheckedStatus.pending, (state) => {
				state.loadingAllUsers = true;
			})

			.addCase(changeBlockedStatus.fulfilled, (state, action) => {
				const { id, blocked } = action.payload;
				const userIndex = state.users.findIndex((user) => user.id === id);
				state.loadingAllUsers = false;

				if (userIndex !== -1) {
					const updatedUser = { ...state.users[userIndex], blocked };
					state.users[userIndex] = updatedUser;
				}
				// const updatedUser = { ...state.users[3], blocked: state.users[3].blocked ? false : true };
				// state.users[3] = updatedUser;
			})
			.addCase(changeBlockedStatus.rejected, (state, action) => {
				state.error = action.error.message;
				state.loadingAllUsers = false;
			})
			.addCase(changeBlockedStatus.pending, (state) => {
				state.loadingAllUsers = true;
			})

			.addCase(updateUserById.pending, (state) => {
				state.loadingUpdateUserById = true;
			})
			.addCase(updateUserById.fulfilled, (state, action) => {
				if (action.payload.error) {
					state.error = action.payload.error || 'Unknown error occurred';
				} else {
					const user = action.payload;
					state.users = state.users.map((u) => (u.id === user.id ? user : u));

					state.loadingUpdateUserById = false;
				}
			})
			.addCase(updateUserById.rejected, (state, action) => {
				state.loadingUpdateUserById = false;
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

export const { findUserById } = userSlice.actions;
export default userSlice.reducer;
