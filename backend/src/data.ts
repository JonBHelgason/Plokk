// In-memory data store for MVP
export interface Area {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  status: 'clean' | 'moderate' | 'dirty';
  lastCleaned?: Date;
  cleanedBy?: string;
}

export interface Profile {
  id: string;
  username: string;
  points: number;
  cleanupCount: number;
  joinDate: Date;
}

export interface CleanupEvent {
  id: string;
  areaId: string;
  profileId: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  pointsEarned: number;
}

// In-memory storage
const areas: Area[] = [
  {
    id: 'area1',
    name: 'Downtown Park',
    bounds: { north: 64.15, south: 64.14, east: -21.93, west: -21.95 },
    status: 'dirty',
  },
  {
    id: 'area2',
    name: 'Beach Front',
    bounds: { north: 64.13, south: 64.12, east: -21.91, west: -21.93 },
    status: 'moderate',
    lastCleaned: new Date('2025-10-01'),
  },
  {
    id: 'area3',
    name: 'City Center',
    bounds: { north: 64.16, south: 64.15, east: -21.92, west: -21.94 },
    status: 'clean',
    lastCleaned: new Date('2025-10-04'),
  },
];

const profiles: Profile[] = [
  {
    id: 'profile1',
    username: 'EcoWarrior',
    points: 150,
    cleanupCount: 5,
    joinDate: new Date('2025-09-01'),
  },
  {
    id: 'profile2',
    username: 'CleanFreak',
    points: 200,
    cleanupCount: 8,
    joinDate: new Date('2025-08-15'),
  },
];

const events: CleanupEvent[] = [
  {
    id: 'event1',
    areaId: 'area2',
    profileId: 'profile2',
    timestamp: new Date('2025-10-01'),
    location: { lat: 64.125, lng: -21.92 },
    pointsEarned: 50,
  },
  {
    id: 'event2',
    areaId: 'area3',
    profileId: 'profile1',
    timestamp: new Date('2025-10-04'),
    location: { lat: 64.155, lng: -21.93 },
    pointsEarned: 30,
  },
];

export function getAreas(): Area[] {
  return areas;
}

export function getArea(id: string): Area | undefined {
  return areas.find((a) => a.id === id);
}

export function getProfiles(): Profile[] {
  return profiles;
}

export function getProfile(id: string): Profile | undefined {
  return profiles.find((p) => p.id === id);
}

export function getEvents(): CleanupEvent[] {
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function createCleanupEvent(
  areaId: string,
  profileId: string,
  location: { lat: number; lng: number }
): CleanupEvent | null {
  const area = getArea(areaId);
  const profile = getProfile(profileId);

  if (!area || !profile) {
    return null;
  }

  // Calculate points based on area size and status
  let points = 30;
  if (area.status === 'dirty') points = 50;
  else if (area.status === 'moderate') points = 40;

  const event: CleanupEvent = {
    id: `event${events.length + 1}`,
    areaId,
    profileId,
    timestamp: new Date(),
    location,
    pointsEarned: points,
  };

  events.push(event);

  // Update area status
  area.status = 'clean';
  area.lastCleaned = new Date();
  area.cleanedBy = profile.username;

  // Update profile
  profile.points += points;
  profile.cleanupCount += 1;

  return event;
}
