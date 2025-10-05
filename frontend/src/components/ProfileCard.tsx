import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Profile } from '../api';

dayjs.extend(relativeTime);

interface ProfileCardProps {
  profile?: Profile;
  isLoading?: boolean;
}

export function ProfileCard({ profile, isLoading }: ProfileCardProps) {
  if (isLoading) {
    return (
      <div className="profile-card">
        <p>Hleð prófíl...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-card">
        <p>Engin prófílgögn tiltæk.</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h2>{profile.name}</h2>
      <p className="stat">
        Hreinsanir samtals: <strong>{profile.totalCleanings}</strong>
      </p>
      <p className="stat">
        Pokar samtals: <strong>{profile.totalBags}</strong>
      </p>
      <p className="stat">
        Síðast virk: {profile.lastCleanedAt ? dayjs(profile.lastCleanedAt).fromNow() : 'aldrei'}
      </p>
    </div>
  );
}
