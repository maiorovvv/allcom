import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from './Products/types/ProductsState';

const initialState: ProductState = {
	products: [],
	loading: false,
};

export const loadProducts = createAsyncThunk(
	'products/loadProducts',

	() => api.getAll()
);

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.loading = false;
			})
			.addCase(loadProducts.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default productsSlice.reducer;
