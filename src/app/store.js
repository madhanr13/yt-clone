import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

const reducer = combineReducers({
    userInfo: userReducer            
})

export const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})