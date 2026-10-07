import { ProductDto } from './../../types/user/UserApiResponse';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as api from './api';
import ProductState from '../../types/product/ProductState';
import { ProductFormValues } from '../../types/product/ProductFormValues';

interface LoadProductsParams {
	category_id?: number;
	search_query?: string;
	page_number?: number;
}

const initialState: ProductState = {
	products: [],
	productsOnePerCategory: [],
	productById: {
		id: 0,
		name: '',
		description: '',
		weight: 0,
		color: '',
		categoryId: 0,
		state: '',
		imageLinks: [],
		lastCreatedAuction: {
			id: 0,
			startPrice: 0,
			startAt: '',
			currentPlannedEndAt: '',
			createdAt: '',
			lastBetAmount: 0,
			state: '',
		},
		storage: {
			id: 0,
			area: '',
			rack: 0,
			section: 0,
			shelf: 0,
			productId: 0,
		},
	},
	number: 0,
	totalPages: 0,
	loading: false,
	loadingAllProducts: false,
	loadingProductById: false,
	loadingProductsOnePerCategory: false,
	error: undefined,
};

export const createProduct = createAsyncThunk('products/createProduct', (data: ProductFormValues) =>
	api.createProduct(data)
);

export const updateProduct = createAsyncThunk('products/updateProduct', (data: ProductFormValues) =>
	api.updateProduct(data)
);

export const loadAllProducts = createAsyncThunk(
	'productsHome/loadProducts',
	({ category_id = 0, search_query, page_number }: LoadProductsParams) =>
		api.getAllProducts(category_id, search_query, page_number)
);

export const loadProductById = createAsyncThunk(
	'product/loadProduct',

	(product_id: number) => api.getProductById(product_id)
);

export const loadProductsOnePerCategory = createAsyncThunk(
	'product/loadProductsOnePerCategory',

	() => api.loadProductsOnePerCategory()
);

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = undefined;
		},
		filterProductById: (state, action) => {
			const productId = action.payload;
			const res = state.products.find((item) => item.id === productId);
			if (res) {
				state.productById = res;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state: { loading: boolean }) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductDto>) => {
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
			})

			.addCase(updateProduct.pending, (state) => {
				state.loadingProductById = true;
			})
			.addCase(updateProduct.fulfilled, (state, action: PayloadAction<ProductDto>) => {
				if (action.payload.error) {
					state.error = action.payload.error || 'Unknown error occurred';
					state.products = [];
				} else {
					state.products.push(action.payload);
					state.error = undefined;
				}
				state.loadingProductById = false;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loadingProductById = false;
				state.error = action.error.message || 'Unknown error occurred';
			})

			.addCase(loadAllProducts.fulfilled, (state, action) => {
				state.products = action.payload.content;
				state.totalPages = action.payload.totalPages;
				state.number = action.payload.number;
				state.loadingAllProducts = false;
				state.error = undefined;
			})
			.addCase(loadAllProducts.pending, (state) => {
				state.loadingAllProducts = true;
			})
			.addCase(loadAllProducts.rejected, (state, action) => {
				state.loadingAllProducts = false;
				state.error = action.error.message || 'Unknown error occurred';
			})

			.addCase(loadProductsOnePerCategory.fulfilled, (state, action) => {
				state.productsOnePerCategory = action.payload;
				state.loadingProductsOnePerCategory = false;
				state.error = undefined;
			})
			.addCase(loadProductsOnePerCategory.pending, (state) => {
				state.loadingProductsOnePerCategory = true;
			})
			.addCase(loadProductsOnePerCategory.rejected, (state, action) => {
				state.loadingProductsOnePerCategory = false;
				state.error = action.error.message || 'Unknown error occurred';
			})

			.addCase(loadProductById.pending, (state) => {
				state.loadingProductById = true;
			})
			.addCase(loadProductById.fulfilled, (state, action) => {
				state.productById = action.payload;
				state.loadingProductById = false;
				state.error = undefined;
			})
			.addCase(loadProductById.rejected, (state, action) => {
				state.loadingProductById = false;
				state.error = action.error.message || 'Unknown error occurred';
			});
	},
});

export const { resetError, filterProductById } = productsSlice.actions;

export default productsSlice.reducer;
