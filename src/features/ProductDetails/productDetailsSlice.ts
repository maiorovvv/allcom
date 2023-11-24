import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from './types/ProductDetailState';
import ProductDetails from './types/ProductDetails';

const initialState: ProductState = {
	product: {} as ProductDetails,
	loading: false,
};

export const loadProduct = createAsyncThunk(
	'product/loadProduct',

	() => api.getAll()
);

export const productsSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadProduct.fulfilled, (state, action) => {
				state.product = action.payload;
				state.loading = false;
			})
			.addCase(loadProduct.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default productsSlice.reducer;
