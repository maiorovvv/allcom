import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userProductsReducer from '../features/user/wishProducts/productsSlice';
import userDataReducer from '../features/MyAccount/UserSlice';
import productsReducer from '../features/products/productsSlice';
import myAuctionsReducer from '../features/MyAccount/components/MyAuctions/myAuctionsSlice';
import authReducer from '../features/auth/authSlice';
import CategoriesReducer from '../features/categories/CategoriesSlice';

export const store = configureStore({
	reducer: {
		userProducts: userProductsReducer,
		userData: userDataReducer,
		products: productsReducer,
		myAuctions: myAuctionsReducer,
		auth: authReducer,
		categories: CategoriesReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
