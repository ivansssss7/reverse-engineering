import { configureStore } from "@reduxjs/toolkit";
import AuthService from "./services/authService";
import brandService from "./services/brandService";
import modelService from "./services/modelService";
import productService from "./services/productService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";

const Store = configureStore({
    reducer:{
        [AuthService.reducerPath]: AuthService.reducer,
        [brandService.reducerPath]: brandService.reducer,
        [modelService.reducerPath]: modelService.reducer,
        [productService.reducerPath]: productService.reducer,
        "authReducer": authReducer,
        "globalReducer": globalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthService.middleware)
            .concat(brandService.middleware)
            .concat(modelService.middleware)
            .concat(productService.middleware)
});

export default Store;
