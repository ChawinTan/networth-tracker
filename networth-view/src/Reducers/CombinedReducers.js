import { combineReducers } from "redux";

import saveUserDetailReducer from './UserReducer';

const combinedReducers = combineReducers({
    saveUserDetailReducer
});

export default combinedReducers;