import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from './';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { Provider, useSelector } from 'react-redux';
import  {faker} from '@faker-js/faker';
import { ProductsProps } from '@/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selectorFn) => selectorFn(store.getState())),
}));

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <CartDrawer />
    </Provider>
  );
};

const mockProducts = [
  {
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
  },
];
const mockCount = 2;
const mockTotalValue = 'R$30,00';

const useSelectorSpy = jest.spyOn(require('react-redux'), 'useSelector');

describe('Cart Drawer', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should cart button render correctly', () => {
    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');
    expect(cartButton).toBeInTheDocument();

  });

  it('should cart button will open the cart drawer when clicked', () => {
    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const cartDrawer = screen.getByText(/Shopping Bag/i);
    expect(cartDrawer).toBeInTheDocument();

  });

  it('Clicking on the close button should close the drawer', () => {
    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');    
    fireEvent.click(cartButton);
    
    const cartDrawer = screen.getByText(/Shopping Bag/i);
    expect(cartDrawer).toBeInTheDocument();

    const closeCartButton = screen.getByTestId('close-icon');
    fireEvent.click(closeCartButton);

    expect(cartDrawer).not.toBeInTheDocument();
  });

  it('should render checkout button', () => {
    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const cartDrawer = screen.getByText(/Shopping Bag/i);
    expect(cartDrawer).toBeInTheDocument();

    const checkoutButton = screen.getByTestId('checkout_button');
    expect(checkoutButton).toBeInTheDocument();
  });

  it(' should correct message appears when there are no products in the cart', () => {
    renderComponent();

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({ products: [] });

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const noProductsMessage = screen.getByText('No products in your cart');
    expect(noProductsMessage).toBeInTheDocument();
  });

  it('should count is displayed correctly based on products in the cart', () => {

    useSelectorSpy.mockReturnValue(mockCount);

    renderComponent();

    const cartCount = screen.getByText(mockCount);
    expect(cartCount).toBeInTheDocument();

  });

  it('should total value is displayed correctly based on products price total in the cart', () => {

    useSelectorSpy.mockReturnValue(mockTotalValue);

    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const productsTotalValue = screen.getByText(mockTotalValue);
    expect(productsTotalValue).toBeInTheDocument();

  });

  it(' should render the products in the cart', () => {
    renderComponent();

    useSelectorSpy.mockReturnValueOnce({ products: mockProducts });

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const productDescribe = screen.getByText(mockProducts[0].title);
    expect(productDescribe).toBeInTheDocument();
  });
});