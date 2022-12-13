import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from "./features/app";
import languageSlice from "./features/language";

const reducers = combineReducers({
	appSlice,
	languageSlice
})

export const store = configureStore({
	reducer: {
		app: reducers,
	},
});
