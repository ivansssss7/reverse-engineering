import {configureStore} from "@reduxjs/toolkit";
import AuthService from "./services/authService";
import authReducer from "./reducers/authReducer";
const Store = configureStore({
    reducer:{
        [AuthService.reducerPath]:AuthService.reducer,
        "authReducer":authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthService.middleware)
});

export default Store;