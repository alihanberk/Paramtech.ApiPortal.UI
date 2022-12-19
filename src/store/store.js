import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from "./features/app";
import languageSlice from "./features/language";
import organization from "./features/organization";

const reducers = combineReducers({
	appSlice,
	languageSlice,
	organization
})

export const store = configureStore({
	reducer: {
		app: reducers,
	},
});
