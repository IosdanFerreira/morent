import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import CartProduct from '.';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import { decreaseProductToCart, increaseProductToCart, removeProductsToCart } from '@/redux/cart/slice';

import * as reactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const productMock = {
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
  }
};

const renderComponent = () => {
  return (
    render (
      <Provider store={store}>
        <CartProduct product={productMock} />
      </Provider>
    )
  );
};

describe('Cart Product', () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  it('should render the product information correctly', () => {
    renderComponent();

    expect(screen.getByText(productMock.title, {selector: 'p'})).toBeInTheDocument();
    expect(screen.getByText(productMock.quantity, {selector: 'span'})).toBeInTheDocument();
    expect(screen.getByText('R$ 159,90', {selector: 'small'})).toBeInTheDocument();
  });

  it('should render the product image correctly', () => {
    renderComponent();

    const figureElement = screen.getByRole('figure');
    expect(figureElement).toBeInTheDocument();

    const productImage = screen.getByAltText(productMock.title);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', expect.stringContaining('/_next/image'));

    const fillAttribute = productImage.getAttribute('fill');
    expect(fillAttribute).toBeDefined();

    const sizeAttribute = productImage.getAttribute('sizes');
    expect(sizeAttribute).toBeDefined();
    expect(sizeAttribute).toBe('(max-width: 768px) 50vw');
  });

  it('should render the decrease button and run decrease function from cart', async () => {

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);


    renderComponent();

    const decreaseButton = screen.getByTestId('btn_descrease_product_to_cart');
    expect(decreaseButton).toBeInTheDocument();

    let productQuantity = screen.getByTestId('product_quantity');
    expect(Number(productQuantity.textContent)).toBe(2);

    fireEvent.click(decreaseButton);

    expect(mockDispatch).toHaveBeenCalledWith(decreaseProductToCart(productMock));
  });

  it('should render the increase button and run increase function from cart', async () => {

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);

    renderComponent();

    const increaseButton = screen.getByTestId('btn_increase_product_to_cart');
    expect(increaseButton).toBeInTheDocument();

    fireEvent.click(increaseButton);

    expect(mockDispatch).toHaveBeenCalledWith(increaseProductToCart(productMock));
  });

  it('should render the remover button and run remove function from cart', async () => {

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);

    renderComponent();

    const removeButton = screen.getByTestId('btn_remove_product_to_cart');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeProductsToCart(productMock));
  });
});