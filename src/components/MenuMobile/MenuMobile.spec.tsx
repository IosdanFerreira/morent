import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MenuMobile from '.';
import '@testing-library/jest-dom';
import store from '@/redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selectorFn) => selectorFn(store.getState())),
}));

const renderComponent = () => {
  return (
    render(
      <MenuMobile />
    )
  );
};

describe('Menu Mobile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
      
  it('should render open menu button', () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    expect(buttonOpenMenu).toBeInTheDocument();

  });

  it('should when open menu button is clicked, the drawer will open', () => {
    renderComponent();

    expect(screen.queryByText(/Menu/i)).not.toBeInTheDocument();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    expect(screen.getByText(/Menu/i)).toBeInTheDocument();

  });
  it('should when close menu button is clicked, the drawer will close', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const menuDrawer = screen.getByText(/Menu/i);
    expect(menuDrawer).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-icon');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(menuDrawer).not.toBeInTheDocument();
  });

  it('should link will close the drawer when clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const liLink = screen.getAllByTestId('li_link_list');
    expect(liLink.length).toEqual(5);

    fireEvent.click(liLink[0]);

    const menuDrawer = screen.queryByText(/Menu/i);
    expect(menuDrawer).toBe(null);
    
  });

  it('should redirect to the home page when "Home" is clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    
  });

  it('should redirect to the Electronics page when "Electronics" is clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const electronicsLink = screen.getByText('Electronics');
    expect(electronicsLink).toBeInTheDocument();
    expect(electronicsLink).toHaveAttribute('href', '/category/electronics');
    
  });

  it('should redirect to the Jewelery page when "Jewelery" is clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const jeweleryLink = screen.getByText('Jewelery');
    expect(jeweleryLink).toBeInTheDocument();
    expect(jeweleryLink).toHaveAttribute('href', '/category/jewelery');
    
  });

  it('should redirect to the Mens Clothing page when "Mens Clothing" is clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const mensClothingLink = screen.getByText('Men\'s Clothing');
    expect(mensClothingLink).toBeInTheDocument();
    expect(mensClothingLink).toHaveAttribute('href', '/category/men\'s%20clothing');
    
  });

  it('should redirect to the Women\'s Clothing page when "Women\'s Clothing" is clicked', async () => {
    renderComponent();

    const buttonOpenMenu = screen.getByTestId('btn_open_menu');
    fireEvent.click(buttonOpenMenu);

    const womensClothingLink = screen.getByText('Women\'s Clothing');
    expect(womensClothingLink).toBeInTheDocument();
    expect(womensClothingLink).toHaveAttribute('href', '/category/women\'s%20clothing');
    
  });
});