import type { CleanupEvent } from '../types';

interface EventsListProps {
  events: CleanupEvent[];
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div>
      <h2>Recent Cleanups</h2>
      {events.length === 0 ? (
        <p>No recent cleanups</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #eee', borderRadius: '4px' }}>
              <p>Area: {event.areaId}</p>
              <p>User: {event.profileId}</p>
              <p>Points: {event.pointsEarned}</p>
              <p>Date: {new Date(event.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
