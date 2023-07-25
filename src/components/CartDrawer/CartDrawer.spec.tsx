import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from './';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { Provider, useSelector } from 'react-redux';
import  {faker} from '@faker-js/faker';

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
    id: faker.number,
    title: faker.string,
    price: faker.number,
    description: faker.string,
    category: faker.string,
    image: faker.string,
    rating: {
      rate: faker.number,
      count: faker.number
    },
    quantity: faker.string
  }
];

const mockCount = 2;
const mockTotalValue = 'R$30,00';

const useSelectorSpy = jest.spyOn(require('react-redux'), 'useSelector');

describe('Cart Drawer Unit Tests', () => {
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

  it('should render total value in drawer', () => {
    renderComponent();

    const cartButton = screen.getByTestId('btn_cart');
    fireEvent.click(cartButton);

    const cartDrawer = screen.getByText(/Shopping Bag/i);
    expect(cartDrawer).toBeInTheDocument();

    expect(screen.queryByText(/Total:/i, {selector: 'h5'})).toBeInTheDocument();
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
});

describe('Cart Drawer Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
