import type { Area, Profile, CleanupEvent } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchAreas(): Promise<Area[]> {
  const response = await fetch(`${API_BASE_URL}/areas`);
  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }
  return response.json();
}

export async function fetchProfiles(): Promise<Profile[]> {
  const response = await fetch(`${API_BASE_URL}/profiles`);
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
}

export async function fetchEvents(): Promise<CleanupEvent[]> {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export async function createCleanupEvent(
  areaId: string,
  profileId: string,
  location: { lat: number; lng: number }
): Promise<CleanupEvent> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ areaId, profileId, location }),
  });

  if (!response.ok) {
    throw new Error('Failed to create cleanup event');
  }

  return response.json();
}
