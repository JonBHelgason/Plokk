import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="map">{children}</div>,
  TileLayer: () => null,
  Circle: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  Popup: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('./api', () => ({
  fetchAreas: vi.fn().mockResolvedValue([
    {
      id: 'area-1',
      name: 'Testsvæði',
      center: { lat: 64.1, lng: -21.9 },
      radiusMeters: 200,
      lastCleanedAt: new Date().toISOString(),
      status: 'green',
      daysSinceLastCleaned: 1,
    },
  ]),
  fetchProfile: vi.fn().mockResolvedValue({
    id: 'user-1',
    name: 'Notandi',
    totalCleanings: 2,
    totalBags: 5,
    lastCleanedAt: new Date().toISOString(),
  }),
  fetchEvents: vi.fn().mockResolvedValue([]),
  submitCleaning: vi.fn().mockResolvedValue({}),
}));

describe('App', () => {
  it('sýnir grunnupplýsingar og hleður kort', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Plokka MVP/)).toBeInTheDocument();
    const areaTitles = await screen.findAllByText(/Testsvæði/);
    expect(areaTitles.length).toBeGreaterThan(0);
  });
});
