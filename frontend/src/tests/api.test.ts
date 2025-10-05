import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAreas, fetchProfiles, fetchEvents } from '../api';

// Mock fetch globally
global.fetch = vi.fn();

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAreas returns areas data', async () => {
    const mockAreas = [{ id: 'area1', name: 'Test Area', status: 'clean' }];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAreas,
    });

    const areas = await fetchAreas();
    expect(areas).toEqual(mockAreas);
  });

  it('fetchProfiles returns profiles data', async () => {
    const mockProfiles = [{ id: 'profile1', username: 'TestUser', points: 100 }];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfiles,
    });

    const profiles = await fetchProfiles();
    expect(profiles).toEqual(mockProfiles);
  });

  it('fetchEvents returns events data', async () => {
    const mockEvents = [{ id: 'event1', areaId: 'area1', pointsEarned: 50 }];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });

    const events = await fetchEvents();
    expect(events).toEqual(mockEvents);
  });
});
