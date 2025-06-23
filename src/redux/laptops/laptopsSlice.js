import { createSlice } from "@reduxjs/toolkit";
import { deleteFromCart, getCart, getLaptopById, getLaptops, postToCart } from "./actions";

const initialState = {
    laptops: [],
    isLoading: false,
    product: {},
    cart: [],
    isCartLoading: false,
    search: [],
};

const laptopsSlice = createSlice({
    name: "laptops",
    initialState,
    reducers: {
        onChangePhone: (state, action) => {
            state.phone = action.payload;
        },
        onSearch: (state, action) => {
            // Принимаем сразу массив отфильтрованных товаров
            state.search = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getLaptops.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(getLaptops.rejected, state => {
            state.isLoading = false;
        });

        builder.addCase(getLaptops.fulfilled, (state, { payload }) => {
            state.laptops = payload;
            state.isLoading = false;
        });

        builder.addCase(getLaptopById.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(getLaptopById.rejected, state => {
            state.isLoading = false;
        });

        builder.addCase(getLaptopById.fulfilled, (state, { payload }) => {
            state.product = payload;
            state.isLoading = false;
        });

        builder.addCase(getCart.pending, state => {
            state.isCartLoading = true;
        });

        builder.addCase(getCart.rejected, state => {
            state.isCartLoading = false;
        });

        builder.addCase(getCart.fulfilled, (state, { payload }) => {
            state.cart = payload;
            state.isCartLoading = false;
        });

        builder.addCase(postToCart.fulfilled, (state, { payload }) => {
            state.cart = [...state.cart, payload];
        });

        builder.addCase(deleteFromCart.fulfilled, (state, { payload }) => {
            const items = state.cart.filter(item => item.id !== payload);
            state.cart = items;
        });
    },
});

export const { onChangePhone, onSearch } = laptopsSlice.actions;
export default laptopsSlice.reducer;
