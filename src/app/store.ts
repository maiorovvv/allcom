import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userProductsReducer from '../features/user/wishProducts/productsSlice';
import productsReducer from '../features/products/productsSlice';
import userDateReducer from '../components/MyAccount/UserSlice';
import productReducer from '../features/ProductDetails/productDetailsSlice';
import myAuctionsReducer from '../components/MyAccount/components/MyAuctions/myAuctionsSlice';
import homePageReduser from '../features/HomePage/HomePageSlice';

export const store = configureStore({
	reducer: {
		userProducts: userProductsReducer,
		userDate: userDateReducer,
		products: productsReducer,
		product: productReducer,
		myAuctions: myAuctionsReducer,
		homePage: homePageReduser,
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
