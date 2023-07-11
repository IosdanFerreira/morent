import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsProps } from '@/types';

const initialState = {
  favoritesProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductsToFavorites: (state: any, action: PayloadAction<ProductsProps>) => {
      const { id } = action.payload;
      const productInFavorites = state.favoritesProducts.find((product: ProductsProps) => product.id === id);

      if (productInFavorites) {
        state.favoritesProducts = state.favoritesProducts.filter((product: ProductsProps) => product.id !== id);
      } else {
        state.favoritesProducts.push({ ...action.payload });
      }
    },
  },
});

export const {
  addProductsToFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
