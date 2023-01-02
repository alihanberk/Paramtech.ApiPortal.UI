import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from "./features/app";
import languageSlice from "./features/language";
import organization from "./features/organization";
import sider from "./features/sider";
import documentation from "./features/documentation";
import currentParameters from "./features/currentParameters";

const reducers = combineReducers({
	appSlice,
	languageSlice,
	organization,
	sider,
	documentation,
	currentParameters
})

export const store = configureStore({
	reducer: {
		app: reducers,
	},
});
