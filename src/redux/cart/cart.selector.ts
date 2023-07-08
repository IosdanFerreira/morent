import { ProductsProps } from '@/types';

export const selectTotalValueInCart = (rootReducer: any) => {

  const reducerProducts = rootReducer.cartReducer.products;

  return reducerProducts.reduce((acc:any, curr: any) => acc + ((curr.price * 5) * Number(curr.quantity)), 0);
};

export const selectProductsCountInCart = (rootReducer: any) => {

  const reducerProducts = rootReducer.cartReducer.products;

  return reducerProducts.reduce((acc: any, curr: any) => acc + curr.quantity, 0);
};