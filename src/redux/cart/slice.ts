import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductsProps } from '@/types';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductsToCart: (state: any, action: PayloadAction<ProductsProps>) => {
      const { id } = action.payload;
      const productInCart = state.products.find((product: ProductsProps) => product.id === id);

      if (productInCart) {
        productInCart.quantity++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },

    removeProductsToCart: (state: any, action: PayloadAction<ProductsProps>) => {
      const { id } = action.payload;
      state.products = state.products.filter((product: ProductsProps) => product.id !== id);
    },

    increaseProductToCart: (state: any, action: PayloadAction<ProductsProps>) => {
      const { id } = action.payload;
      const product = state.products.find((product: ProductsProps) => product.id === id);

      if (product) {
        product.quantity++;
      }
    },

    decreaseProductToCart: (state: any, action: PayloadAction<ProductsProps>) => {
      const { id } = action.payload;
      const product = state.products.find((product: ProductsProps) => product.id === id);

      if (product && product.quantity > 1) {
        product.quantity--;
      }
    },
  },
});

export const {
  addProductsToCart,
  removeProductsToCart,
  increaseProductToCart,
  decreaseProductToCart
} = cartSlice.actions;

export default cartSlice.reducer;
