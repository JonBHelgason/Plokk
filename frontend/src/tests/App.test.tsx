import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // The app should at least render something
    expect(document.body).toBeTruthy();
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
