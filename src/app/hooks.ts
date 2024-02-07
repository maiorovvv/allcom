import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';
import { selectUser } from '../features/auth/selectors';
import { Roles } from '../constants/userRoles';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsAdmin = (): boolean => {
	const user = useAppSelector(selectUser);
	return user?.role === Roles.Admin;
};

export const useIsClient = (): boolean => {
	const user = useAppSelector(selectUser);
	return user?.role === Roles.Client;
};

export const useIsStoreKeeper = (): boolean => {
	const user = useAppSelector(selectUser);
	return user?.role === Roles.StoreKeeper;
};
