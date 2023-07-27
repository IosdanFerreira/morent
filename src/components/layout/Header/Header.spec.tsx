import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Header from '.';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selectorFn) => selectorFn(store.getState())),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/',
    push: jest.fn(),
    query: {},
  })),
}));

const renderComponent = () => {
  return(
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  );
};

describe('Header', () => {
  it('should render Header correctly', () => {
    renderComponent();

    expect(screen.getByText('Morent', {selector: 'h2'})).toBeInTheDocument();
  });

  it('should render logo correctly', () => {
    renderComponent();

    expect(screen.getByTestId('logo_container')).toBeInTheDocument();

    const logoImage = screen.getByTestId('logo_image');
    expect(logoImage).toBeInTheDocument();
  });
  
  it('should render form correctly', () => {
    renderComponent();

    const inputElement = screen.getByPlaceholderText('What do you want?');
    const buttonElement = screen.getByTestId('btn_form_search');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should inout change the value correctly', () => {
    
    act(() => {
      renderComponent();
    });

    const inputElement = screen.getByPlaceholderText('What do you want?') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Test value' } });
    });

    expect(inputElement.value).toBe('Test value');
  });
  it('should redirect to the home page when "Home" is clicked', async () => {
    renderComponent();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    
  });

  it('should redirect to the Electronics page when "Electronics" is clicked', async () => {
    renderComponent();

    const electronicsLink = screen.getByText('Electronics');
    expect(electronicsLink).toBeInTheDocument();
    expect(electronicsLink).toHaveAttribute('href', '/category/electronics');
    
  });

  it('should redirect to the Jewelery page when "Jewelery" is clicked', async () => {
    renderComponent();

    const jeweleryLink = screen.getByText('Jewelery');
    expect(jeweleryLink).toBeInTheDocument();
    expect(jeweleryLink).toHaveAttribute('href', '/category/jewelery');
    
  });

  it('should redirect to the Mens Clothing page when "Mens Clothing" is clicked', async () => {
    renderComponent();

    const mensClothingLink = screen.getByText('Men\'s Clothing');
    expect(mensClothingLink).toBeInTheDocument();
    expect(mensClothingLink).toHaveAttribute('href', '/category/men\'s%20clothing');
    
  });

  it('should redirect to the Women\'s Clothing page when "Women\'s Clothing" is clicked', async () => {
    renderComponent();

    const womensClothingLink = screen.getByText('Women\'s Clothing');
    expect(womensClothingLink).toBeInTheDocument();
    expect(womensClothingLink).toHaveAttribute('href', '/category/women\'s%20clothing');
    
  });

  it('should redirect to the Favorites page when favorites link is clicked', async () => {
    renderComponent();

    const favoritesLink = screen.getByTestId('link_favorites');
    expect(favoritesLink).toBeInTheDocument();

    expect(favoritesLink).toHaveAttribute('href', '/favorites');
    
  });
});