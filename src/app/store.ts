import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userProductsReducer from '../features/user/wishProducts/productsSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
	reducer: {
		userProducts: userProductsReducer,
		// counter: counterReducer,
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
