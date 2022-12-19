import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from "./features/app";
import languageSlice from "./features/language";
import organization from "./features/organization";
import sider from "./features/sider";

const reducers = combineReducers({
	appSlice,
	languageSlice,
	organization,
	sider
})

export const store = configureStore({
	reducer: {
		app: reducers,
	},
});
