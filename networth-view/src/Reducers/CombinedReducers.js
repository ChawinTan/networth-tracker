import { combineReducers } from "redux";

import networthReducer from './NetworthReducer';

const combinedReducers = combineReducers({
    networthReducer
});

export default combinedReducers;