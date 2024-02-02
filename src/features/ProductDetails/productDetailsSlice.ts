import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import { ProductDetailState } from './types/ProductDetailState';

const initialState: ProductDetailState = {
	product: {
		id: 0,
		name: '',
		description: '',
		weight: 0,
		color: '',
		categoryId: 0,
		photoLinks: [],
	},
	loading: false,
	error: undefined,
};

export const loadProduct = createAsyncThunk(
	'product/loadProduct',

	(product_id: number) => api.getProduct(product_id)
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
				state.product = action.payload.product;
				state.loading = false;
				console.log(state.product);
			})
			.addCase(loadProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			});
	},
});

export default productsSlice.reducer;
