import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import ProductState from '../../types/product/ProductState';

const initialState: ProductState = {
	products: [],
	loadingAllProducts: false,
	error: '',
	number: 0,
	totalPages: 0,
	productById: {
		id: 0,
		name: '',
		description: '',
		weight: 0,
		color: '',
		categoryId: 0,
		photoLinks: [],
	},
};

export const loadAllProducts = createAsyncThunk(
	'productsHome/loadProducts',
	(page_number: number) => api.getAllProducts(page_number)
);

export const loadProductsInPoster = createAsyncThunk('productsHome/loadProductsInPoster', () =>
	api.getProductsInPoster()
);

export const HomePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		filterProductById: (state, action) => {
			const productId = action.payload;
			const arrProducts = state.products.map((item) => item.product);
			const res = arrProducts.find((item) => item.id === productId);
			if (res) {
				state.productById = res;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loadAllProducts.fulfilled, (state, action) => {
				state.products = action.payload.content;
				state.loadingAllProducts = false;
				state.totalPages = action.payload.totalPages;
				state.number = action.payload.number;
			})
			.addCase(loadAllProducts.pending, (state) => {
				state.loadingAllProducts = true;
			})
			.addCase(loadAllProducts.rejected, (state) => {
				state.loadingAllProducts = false;
			});
		// .addCase(loadProductsInPoster.fulfilled, (state, action) => {
		// 	// state.productsInPoster = action.payload.products;
		// 	state.loadingProducsInPoster = false;
		// })
		// .addCase(loadProductsInPoster.pending, (state) => {
		// 	state.loadingProducsInPoster = true;
		// })
		// .addCase(loadProductsInPoster.rejected, (state) => {
		// 	state.loadingProducsInPoster = true;
		// });
	},
});

export const { filterProductById } = HomePageSlice.actions;
export default HomePageSlice.reducer;
