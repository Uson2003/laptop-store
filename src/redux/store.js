import { configureStore } from "@reduxjs/toolkit";

import laptopsReducer from "./laptops/laptopsSlice";

export const store = configureStore({
    reducer: {
        laptops: laptopsReducer,
    },
});
