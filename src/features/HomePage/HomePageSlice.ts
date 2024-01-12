import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import ProductState from './types/ProductsState';

const initialState: ProductState = {
	products: [],
	productById: {
		id: 0,
		title: '',
		description: '',
		price: 0,
		brand: '',
		category: '',
		thumbnail: '',
		images: [],
		time: 0,
		color: '',
		weight: '',
	},
	totalItems: 0,
	skip: 0,
	limit: 0,
	loadingAllProducts: false,
	productsInPoster: [],
	loadingProducsInPoster: false,
};

export const loadAllProducts = createAsyncThunk('productsHome/loadProducts', (skip: number) =>
	api.getAllProducts(skip)
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
			const res = state.products.find((product) => product.id === productId);

			if (res) {
				state.productById = res;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loadAllProducts.fulfilled, (state, action) => {
				state.products = action.payload.products;
				state.totalItems = action.payload.total;
				state.skip = action.payload.skip;
				state.limit = action.payload.limit;
				state.loadingAllProducts = false;
			})
			.addCase(loadAllProducts.pending, (state) => {
				state.loadingAllProducts = true;
			})
			.addCase(loadAllProducts.rejected, (state) => {
				state.loadingAllProducts = false;
			})
			.addCase(loadProductsInPoster.fulfilled, (state, action) => {
				state.productsInPoster = action.payload.products;
				state.loadingProducsInPoster = false;
			})
			.addCase(loadProductsInPoster.pending, (state) => {
				state.loadingProducsInPoster = true;
			})
			.addCase(loadProductsInPoster.rejected, (state) => {
				state.loadingProducsInPoster = true;
			});
	},
});

export const { filterProductById } = HomePageSlice.actions;
export default HomePageSlice.reducer;
