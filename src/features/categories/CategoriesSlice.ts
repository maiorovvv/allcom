import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryState } from './types/CategoriesState';

import * as api from './api';

const initialState: CategoryState = {
	categories: [],
	error: undefined,
};

export const loadAllCategories = createAsyncThunk('categories', () => api.getAllCategories());

export const CategoriesSlice = createSlice({
	name: 'Categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(loadAllCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(loadAllCategories.rejected, (state, action) => {
				state.error = action.error.message || 'Unknown error occurred';
			});
	},
});

export default CategoriesSlice.reducer;
