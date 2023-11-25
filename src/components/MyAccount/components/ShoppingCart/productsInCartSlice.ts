import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from './Products/types/ProductsState';

const initialState: ProductState = {
	productsInCart: [],
	loading: false,
};

export const loadProducts = createAsyncThunk(
	'productsInCart/loadProducts',

	() => api.getAll()
);

export const productsInCartSlice = createSlice({
	name: 'productsInCart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.productsInCart = action.payload;
				state.loading = false;
			})
			.addCase(loadProducts.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default productsInCartSlice.reducer;
