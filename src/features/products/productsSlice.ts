import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from '../../types/product/ProductState';
import { ProductFormValues } from '../../types/product/ProductFormValues';
import { ProductResponseDto } from '../../types/product/ProductResponseDto';

const initialState: ProductState = {
	products: [],
	loading: false,
	error: undefined,
};

export const createProduct = createAsyncThunk('products/createProduct', (data: ProductFormValues) =>
	api.createProduct(data)
);

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductResponseDto>) => {
				if (action.payload.error) {
					state.error = action.payload.error || 'Unknown error occurred';
					state.products = [];
				} else {
					state.products.push(action.payload);
					state.error = undefined;
				}
				state.loading = false;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Unknown error occurred';
			});
	},
});

export const { resetError } = productsSlice.actions;

export default productsSlice.reducer;
