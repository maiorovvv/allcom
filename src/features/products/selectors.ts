import { RootState } from '../../app/store';
import { ProductDto } from '../../types/product/ProductApiResponse';

export const selectError = (state: RootState): string | undefined => state.products.error;
export const selectLoading = (state: RootState): boolean => state.products.loading;

export const selectProducts = (state: RootState): ProductDto[] => state.products.products;
export const selectLoadingAllProducts = (state: RootState): boolean =>
	state.products.loadingAllProducts;
export const selectTotalPages = (state: RootState): number => state.products.totalPages;
export const selectNumberPage = (state: RootState): number => state.products.number;

export const selectLoadingProductById = (state: RootState): boolean =>
	state.products.loadingProductById;
export const selectProductById = (state: RootState): ProductDto => state.products.productById;

export const selectProductsOnePerCategory = (state: RootState): ProductDto[] =>
	state.products.productsOnePerCategory;
export const selectLoadingProductsOnePerCategory = (state: RootState): boolean =>
	state.products.loadingProductsOnePerCategory;
