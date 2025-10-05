import type { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>{profile.username}</h3>
      <p>Points: {profile.points}</p>
      <p>Cleanups: {profile.cleanupCount}</p>
      <p>Member since: {new Date(profile.joinDate).toLocaleDateString()}</p>
    </div>
  );
}
