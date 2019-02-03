import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import combinedReducers from './Reducers/CombinedReducers';

export default createStore(
    combinedReducers,
    {},
    applyMiddleware(createLogger(), thunk)
);