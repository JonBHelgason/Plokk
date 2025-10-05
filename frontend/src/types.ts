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
  lastCleaned?: string;
  cleanedBy?: string;
}

export interface Profile {
  id: string;
  username: string;
  points: number;
  cleanupCount: number;
  joinDate: string;
}

export interface CleanupEvent {
  id: string;
  areaId: string;
  profileId: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  pointsEarned: number;
}
