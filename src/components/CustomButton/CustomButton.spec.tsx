import React from 'react';
import {render, screen} from '@testing-library/react';
import CustomButton from '.';
import '@testing-library/jest-dom';

describe('Custom button', () => {
  it('should CustomButton render correctly with title', () => {
    render (<CustomButton title='SEE MORE' />);

    expect(screen.getByText(/SEE MORE/i)).toBeInTheDocument();
  });
});