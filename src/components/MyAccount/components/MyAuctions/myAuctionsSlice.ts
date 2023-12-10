import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from './Products/types/ProductsState';

const initialState: ProductState = {
	productsInMyAuctions: [],
	loading: false,
};

export const loadProducts = createAsyncThunk(
	'productsInCart/loadProducts',

	() => api.getAll()
);

export const deleteProduct = createAsyncThunk('products/deleteOneProduct', (id: number) =>
	api.deleteOneProduct(id)
);

export const myAuctionstSlice = createSlice({
	name: 'myAuctions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.productsInMyAuctions = action.payload;
				state.loading = false;
			})
			.addCase(loadProducts.rejected, (state) => {
				state.loading = false;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const res = action.payload.id;
				state.productsInMyAuctions = state.productsInMyAuctions.filter(
					(product) => product.id !== res
				);
			});
	},
});

export default myAuctionstSlice.reducer;
