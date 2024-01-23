import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userProductsReducer from '../features/user/wishProducts/productsSlice';
import userDateReducer from '../features/MyAccount/UserSlice';
import productReducer from '../features/ProductDetails/productDetailsSlice';
import newProductReducer from '../features/products/newProductsSlice';
import myAuctionsReducer from '../features/MyAccount/components/MyAuctions/myAuctionsSlice';
import homePageReduser from '../features/HomePage/HomePageSlice';
import authReducer from '../features/auth/authSlice';
import regReducer from '../features/auth/regSlice';

export const store = configureStore({
	reducer: {
		userProducts: userProductsReducer,
		userDate: userDateReducer,
		product: productReducer,
		newProduct: newProductReducer,
		myAuctions: myAuctionsReducer,
		homePage: homePageReduser,
		auth: authReducer,
		reg: regReducer,
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
