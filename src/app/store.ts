import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userProductsReducer from '../features/user/wishProducts/productsSlice';
import productsReducer from '../features/products/productsSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
	reducer: {
		userProducts: userProductsReducer,
		products: productsReducer,
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
