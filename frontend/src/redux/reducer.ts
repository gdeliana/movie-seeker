import { combineReducers } from "@reduxjs/toolkit";
import {reducer as authenticationReducer} from "../features/LoginFeature/store/authentication.slice";
import {reducer as searchReducer} from "../features/SearchFeature/store/search.slice";
export default combineReducers({
	authentication: authenticationReducer,
	search: searchReducer
});