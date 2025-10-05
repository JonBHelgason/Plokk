const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export type AreaStatus = 'green' | 'yellow' | 'red';

export interface Area {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radiusMeters: number;
  lastCleanedAt: string | null;
  status: AreaStatus;
  daysSinceLastCleaned: number | null;
}

export interface CleaningEvent {
  id: string;
  areaId: string;
  userName: string;
  userId: string;
  completedAt: string;
  photoUrl?: string;
  bagsCollected: number;
  notes?: string;
}

export interface Profile {
  id: string;
  name: string;
  totalCleanings: number;
  totalBags: number;
  lastCleanedAt: string | null;
}

export async function fetchAreas(): Promise<Area[]> {
  const response = await fetch(`${API_BASE}/areas`);
  if (!response.ok) {
    throw new Error('Tókst ekki að ná í svæði');
  }
  return response.json();
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const response = await fetch(`${API_BASE}/profiles/${userId}`);
  if (!response.ok) {
    throw new Error('Tókst ekki að ná í prófíl');
  }
  return response.json();
}

export async function fetchEvents(limit = 5): Promise<CleaningEvent[]> {
  const response = await fetch(`${API_BASE}/events?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Tókst ekki að ná í nýleg verkefni');
  }
  return response.json();
}

export async function submitCleaning(
  areaId: string,
  data: {
    userId: string;
    userName: string;
    bagsCollected: number;
    photoUrl?: string;
    notes?: string;
  },
) {
  const response = await fetch(`${API_BASE}/areas/${areaId}/clean`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Tókst ekki að skrá hreinsun');
  }
  return response.json();
}
