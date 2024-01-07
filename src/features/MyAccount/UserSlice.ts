import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/UserState';

const initialState: UserState = {
	user: null,
	loading: false,
};

export const loadUser = createAsyncThunk('user/loadUser', () => api.getUserDate());

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
			.addCase(loadUser.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
