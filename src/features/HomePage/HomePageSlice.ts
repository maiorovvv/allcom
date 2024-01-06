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
	loadingOneProduct: false,
	productsInPoster: [],
	loadingProducsInPoster: false,
};

export const loadProducts = createAsyncThunk('productsHome/loadProducts', (skip: number) =>
	api.getAllProducts(skip)
);

export const loadProductById = createAsyncThunk('productsHome/loadProductById', (id: number) =>
	api.getProduct(id)
);

export const loadProductsInPoster = createAsyncThunk('productsHome/loadProductsInPoster', () =>
	api.getProductsInPoster()
);

export const HomePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.products = action.payload.products;
				state.totalItems = action.payload.total;
				state.skip = action.payload.skip;
				state.limit = action.payload.limit;
				state.loadingAllProducts = false;
			})
			.addCase(loadProducts.pending, (state) => {
				state.loadingAllProducts = true;
			})
			.addCase(loadProducts.rejected, (state) => {
				state.loadingAllProducts = false;
			})

			.addCase(loadProductById.fulfilled, (state, action) => {
				state.productById = action.payload;
				state.loadingOneProduct = false;
			})
			.addCase(loadProductById.pending, (state) => {
				state.loadingOneProduct = true;
			})
			.addCase(loadProductById.rejected, (state) => {
				state.loadingOneProduct = true;
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

export default HomePageSlice.reducer;
