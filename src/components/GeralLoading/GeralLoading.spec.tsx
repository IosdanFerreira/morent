import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import GeralLoading from '.';
import '@testing-library/jest-dom';

describe('Geral Loading', () => {
  it('should render component correctly', () => {
    render(<GeralLoading />);

    const loaderContainer = screen.getByTestId('loader_container');
    expect(loaderContainer).toBeInTheDocument();

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

  });
});