import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ProductCard from '.';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';

import { formattedPriceInBRL } from '@/utils/formattedPriceInBRL';
import { addProductsToFavorites } from '@/redux/favorites/slice';
import { addProductsToCart } from '@/redux/cart/slice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selectorFn) => selectorFn(store.getState())),
  useDispatch: jest.fn(),
}));

const mockProducts ={
  id: 1,
  title: 'Mens Casual Slim Fit',
  category:'men\'s clothing',
  description: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
  image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  price: 15.99,
  quantity: 2,
  rating: {
    count: 430,
    rate: 2.1
  },
};

const renderComponent = () => {
  return (
    render(
      <Provider store={store}>
        <ProductCard product={mockProducts} />
      </Provider>
    )
  );
};

describe('Product Card', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should render component whit correctly information an tags', () => {
    renderComponent();

    expect(screen.getByText(mockProducts.title, {selector: 'p'})).toBeInTheDocument();
    expect(screen.getByText(mockProducts.category, {selector: 'small'})).toBeInTheDocument();
    expect(screen.getByText('R$ 79,95')).toBeInTheDocument();
  });

  it('should render add cart button correctly and run dispatch "handleAddProductToCart"', () => {

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);

    renderComponent();

    const addButtonCart = screen.getByTestId('btn_add_to_Cart');
    expect(addButtonCart).toBeInTheDocument();
    
    fireEvent.click(addButtonCart);

    expect(mockDispatch).toHaveBeenCalledWith(addProductsToCart(mockProducts));

  });

  it('should render add favorites button correctly and run dispatch function "handleAddProductToFavorites"', () => {

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);

    renderComponent();

    const addFavoritesButtonCart = screen.getByTestId('btn_add_to_favorites');
    expect(addFavoritesButtonCart).toBeInTheDocument();
    
    fireEvent.click(addFavoritesButtonCart);

    expect(mockDispatch).toHaveBeenCalledWith(addProductsToFavorites(mockProducts));

  });

  it('should redirect to single product page with correctly url', () => {

    renderComponent();

    const linkSingleProduct = screen.getByTestId('link_single_product');
    expect(linkSingleProduct).toBeInTheDocument();
    expect(linkSingleProduct).toHaveAttribute('href', `/single-product/${mockProducts.id}`);

  });

  it('should render the image to the single product correctly', () => {

    renderComponent();

    const figureContainer = screen.getByTestId('image_container');
    expect(figureContainer).toBeInTheDocument();

    const productImage = screen.getByTestId('product_image');
    expect(productImage).toHaveAttribute('src', expect.stringContaining('/_next/image'));
    expect(productImage).toHaveAttribute('alt', mockProducts.title);
    expect(productImage).toHaveAttribute('sizes', '(max-width: 768px) 50vw');
    

    const fillAttribute = productImage.getAttribute('fill');
    expect(fillAttribute).toBeDefined();

  });
});