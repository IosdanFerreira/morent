import React from 'react';
import {render, screen} from '@testing-library/react';
import Hero from './index';
import '@testing-library/jest-dom';

describe('Home Hero', () => {
  it('should Hero render correctly', () => {
    render (<Hero />);

    expect(screen.getByText('Check the news of the promotion')).toBeInTheDocument();
  });

  it('should Hero have title and text', () => {
    render (<Hero />);

    // checking the title of Hero
    expect(screen.getByText(/./, { selector: 'h1' })).toBeInTheDocument();

    // checking the text of Hero
    expect(screen.getByText(/./, { selector: 'p' })).toBeInTheDocument();

  });

  it('should renders the Hero with the image', () => {
    render (<Hero />);

    const heroImage = screen.getByAltText(/Hero image/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', expect.stringContaining('/_next/image'));
  });
});