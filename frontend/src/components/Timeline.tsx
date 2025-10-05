import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { CleaningEvent } from '../api';

dayjs.extend(relativeTime);

interface TimelineProps {
  events?: CleaningEvent[];
  isLoading?: boolean;
}

export function Timeline({ events, isLoading }: TimelineProps) {
  if (isLoading) {
    return (
      <section className="timeline">
        <h2>Nýleg verkefni</h2>
        <p>Hleð gögnum...</p>
      </section>
    );
  }

  if (!events?.length) {
    return (
      <section className="timeline">
        <h2>Nýleg verkefni</h2>
        <p>Engin verkefni skráð ennþá.</p>
      </section>
    );
  }

  return (
    <section className="timeline">
      <h2>Nýleg verkefni</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>
              <strong>{event.userName}</strong> hreinsaði svæði {event.areaId}
            </div>
            <small>
              {dayjs(event.completedAt).fromNow()} · Pokar: {event.bagsCollected}
              {event.photoUrl ? ' · 📸' : ''}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
