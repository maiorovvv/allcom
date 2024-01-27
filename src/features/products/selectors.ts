import { RootState } from '../../app/store';

export const selectError = (state: RootState): string | undefined => state.products.error;
export const selectLoading = (state: RootState): boolean => state.products.loading;
