import { createStore, applyMiddleware } from "redux";
// import {browserHistory} from 'react-router' import {routerMiddleware} from
// 'react-router-redux'
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
