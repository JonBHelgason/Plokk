import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';

export type AreaStatus = 'green' | 'yellow' | 'red';

export interface Area {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radiusMeters: number;
  lastCleanedAt: string | null;
}

export interface CleaningEvent {
  id: string;
  areaId: string;
  userName: string;
  userId: string;
  startedAt: string;
  completedAt: string;
  photoUrl?: string;
  bagsCollected: number;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  totalCleanings: number;
  totalBags: number;
  lastCleanedAt: string | null;
}

const CLEAN_THRESHOLDS = {
  greenDays: 7,
  yellowDays: 21,
};

const areas: Area[] = [
  {
    id: 'isl-rvk-001',
    name: 'Austurvöllur',
    center: { lat: 64.147529, lng: -21.939986 },
    radiusMeters: 220,
    lastCleanedAt: dayjs().subtract(2, 'day').toISOString(),
  },
  {
    id: 'isl-rvk-002',
    name: 'Tjörnin Norður',
    center: { lat: 64.143091, lng: -21.940744 },
    radiusMeters: 300,
    lastCleanedAt: dayjs().subtract(10, 'day').toISOString(),
  },
  {
    id: 'isl-rvk-003',
    name: 'Laugardalur Leiksvæði',
    center: { lat: 64.141374, lng: -21.884275 },
    radiusMeters: 260,
    lastCleanedAt: dayjs().subtract(28, 'day').toISOString(),
  },
  {
    id: 'isl-rvk-004',
    name: 'Grótta',
    center: { lat: 64.159305, lng: -22.012623 },
    radiusMeters: 350,
    lastCleanedAt: null,
  },
];

const profiles = new Map<string, UserProfile>([
  [
    'demo-user',
    {
      id: 'demo-user',
      name: 'Sigríður Plokkari',
      totalCleanings: 3,
      totalBags: 7,
      lastCleanedAt: dayjs().subtract(4, 'day').toISOString(),
    },
  ],
]);

const cleaningEvents: CleaningEvent[] = [
  {
    id: randomUUID(),
    areaId: 'isl-rvk-001',
    userName: 'Sigríður Plokkari',
    userId: 'demo-user',
    startedAt: dayjs().subtract(2, 'day').subtract(45, 'minute').toISOString(),
    completedAt: dayjs().subtract(2, 'day').toISOString(),
    photoUrl: 'https://via.placeholder.com/240x240.png?text=Plokka',
    bagsCollected: 2,
  },
];

export function listAreas() {
  return areas.map((area) => ({
    ...area,
    status: getStatus(area.lastCleanedAt),
    daysSinceLastCleaned: area.lastCleanedAt
      ? dayjs().diff(dayjs(area.lastCleanedAt), 'day')
      : null,
  }));
}

export function getAreaById(areaId: string) {
  return areas.find((area) => area.id === areaId) ?? null;
}

export function getStatus(lastCleanedAt: string | null): AreaStatus {
  if (!lastCleanedAt) return 'red';
  const days = dayjs().diff(dayjs(lastCleanedAt), 'day');
  if (days <= CLEAN_THRESHOLDS.greenDays) return 'green';
  if (days <= CLEAN_THRESHOLDS.yellowDays) return 'yellow';
  return 'red';
}

export function recordCleaning({
  areaId,
  userId,
  userName,
  bagsCollected,
  photoUrl,
  notes,
}: {
  areaId: string;
  userId: string;
  userName: string;
  bagsCollected: number;
  photoUrl?: string;
  notes?: string;
}) {
  const area = getAreaById(areaId);
  if (!area) {
    throw new Error('Area not found');
  }

  const completedAt = dayjs().toISOString();
  area.lastCleanedAt = completedAt;

  const profile = profiles.get(userId) ?? {
    id: userId,
    name: userName,
    totalCleanings: 0,
    totalBags: 0,
    lastCleanedAt: null,
  };

  profile.totalCleanings += 1;
  profile.totalBags += bagsCollected;
  profile.lastCleanedAt = completedAt;

  profiles.set(userId, profile);

  const event: CleaningEvent = {
    id: randomUUID(),
    areaId,
    userId,
    userName,
    startedAt: dayjs().subtract(45, 'minute').toISOString(),
    completedAt,
    photoUrl,
    bagsCollected,
    notes,
  };

  cleaningEvents.unshift(event);

  return {
    area: {
      ...area,
      status: getStatus(area.lastCleanedAt),
    },
    profile,
    event,
  };
}

export function getProfile(userId: string) {
  const profile = profiles.get(userId);
  if (!profile) {
    return {
      id: userId,
      name: 'Nýr notandi',
      totalCleanings: 0,
      totalBags: 0,
      lastCleanedAt: null,
    } satisfies UserProfile;
  }
  return profile;
}

export function listRecentEvents(limit = 10) {
  return cleaningEvents.slice(0, limit);
}
