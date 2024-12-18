

import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loadersSlice";
import userReducer from "./userSlice"

export const store = configureStore({
    reducer : {
        loader : loaderReducer,
        user : userReducer
    }
})

