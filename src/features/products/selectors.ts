import { RootState } from '../../app/store';

export const selectError = (state: RootState): string | undefined => state.newProduct.error;
export const selectLoading = (state: RootState): boolean => state.newProduct.loading;
