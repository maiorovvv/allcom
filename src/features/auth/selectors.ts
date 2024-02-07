import { RootState } from '../../app/store';
import UserShortDTO from './types/UserShortDTO';

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectUser = (state: RootState): UserShortDTO | undefined => state.auth.user;
export const selectLoading = (state: RootState): boolean => state.auth.loading;
export const selectError = (state: RootState): string | undefined => state.auth.error;
