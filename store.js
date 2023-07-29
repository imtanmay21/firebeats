import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./src/reducers/UserReducer/UserReducer";
import { ProductReducer } from "./src/reducers/ProductReducer/ProductReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    UserReducer,
    ProductReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})