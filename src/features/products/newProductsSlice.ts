import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from '../../types/product/ProductState';
import { ProductFormValues } from '../../types/product/ProductFormValues';

const initialState: ProductState = {
	product: null,
	loading: false,
	error: undefined,
};

export const createProduct = createAsyncThunk('products/createProduct', (data: ProductFormValues) =>
	api.createProduct(data)
);

export const newProductsSlice = createSlice({
	name: 'newProduct',
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
			.addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductFormValues>) => {
				if (action.payload.error) {
					state.error = action.payload.message || 'Unknown error occurred';
					state.product = null;
				} else {
					state.product = action.payload;
					state.error = undefined;
				}
				state.loading = false;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'AAAAA';
			});
	},
});

export const { resetError } = newProductsSlice.actions;

export default newProductsSlice.reducer;
