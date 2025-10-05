import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Area, CleaningEvent, Profile } from './api';
import { fetchAreas, fetchEvents, fetchProfile, submitCleaning } from './api';
import { CleaningForm } from './components/CleaningForm.tsx';
import { ProfileCard } from './components/ProfileCard.tsx';
import { Timeline } from './components/Timeline.tsx';

const DEFAULT_USER_ID = 'demo-user';
const DEFAULT_USER_NAME = 'Sigríður Plokkari';

dayjs.extend(relativeTime);

function statusColor(status: Area['status']) {
  switch (status) {
    case 'green':
      return '#22c55e';
    case 'yellow':
      return '#facc15';
    case 'red':
    default:
      return '#ef4444';
  }
}

export default function App() {
  const queryClient = useQueryClient();
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  const areasQuery = useQuery<Area[]>({
    queryKey: ['areas'],
    queryFn: fetchAreas,
    staleTime: 60_000,
  });

  const profileQuery = useQuery<Profile>({
    queryKey: ['profile', DEFAULT_USER_ID],
    queryFn: () => fetchProfile(DEFAULT_USER_ID),
    staleTime: 60_000,
  });

  const eventsQuery = useQuery<CleaningEvent[]>({
    queryKey: ['events'],
    queryFn: () => fetchEvents(5),
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: (payload: { areaId: string; bagsCollected: number; photoUrl?: string; notes?: string }) =>
      submitCleaning(payload.areaId, {
        userId: DEFAULT_USER_ID,
        userName: DEFAULT_USER_NAME,
        bagsCollected: payload.bagsCollected,
        photoUrl: payload.photoUrl,
        notes: payload.notes,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      queryClient.invalidateQueries({ queryKey: ['profile', DEFAULT_USER_ID] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const selectedArea = useMemo(() => {
    if (!areasQuery.data) return null;
    if (selectedAreaId) {
      return areasQuery.data.find((area) => area.id === selectedAreaId) ?? null;
    }
    return areasQuery.data[0] ?? null;
  }, [areasQuery.data, selectedAreaId]);

  const mapCenter = useMemo(() => {
    if (selectedArea) {
      return [selectedArea.center.lat, selectedArea.center.lng] as const;
    }
    return [64.1466, -21.9426] as const;
  }, [selectedArea]);

  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>Plokka MVP</h1>
          <p>Fylgstu með ruslahreinsun í hverfinu og skráðu þín verkefni.</p>
        </div>
        <ProfileCard profile={profileQuery.data} isLoading={profileQuery.isPending} />
      </header>

      <main>
        <section className="map-section">
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom className="map-shell">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {areasQuery.data?.map((area) => (
              <Circle
                key={area.id}
                center={[area.center.lat, area.center.lng]}
                pathOptions={{ color: statusColor(area.status), weight: 2, fillOpacity: 0.35 }}
                radius={area.radiusMeters}
                eventHandlers={{
                  click: () => setSelectedAreaId(area.id),
                }}
              >
                <Popup>
                  <h3>{area.name}</h3>
                  <p>
                    Síðast hreinsað: {area.lastCleanedAt ? dayjs(area.lastCleanedAt).fromNow() : 'aldrei'}
                  </p>
                  <p>Status: {area.status}</p>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
          <aside className="panel">
            <h2>Valið svæði</h2>
            {selectedArea ? (
              <div className="panel-body">
                <h3>{selectedArea.name}</h3>
                <p className={`status status-${selectedArea.status}`}>Staða: {selectedArea.status}</p>
                <p>
                  Síðast hreinsað:{' '}
                  {selectedArea.lastCleanedAt ? dayjs(selectedArea.lastCleanedAt).format('DD.MM.YYYY') : 'Aldrei'}
                </p>
                <CleaningForm
                  isSubmitting={mutation.isPending}
                  onSubmit={(values) => mutation.mutate({ ...values, areaId: selectedArea.id })}
                />
              </div>
            ) : (
              <p>Veldu svæði á kortinu til að sjá nánari upplýsingar.</p>
            )}
          </aside>
        </section>

        <section className="timeline-section">
          <Timeline events={eventsQuery.data} isLoading={eventsQuery.isPending} />
        </section>
      </main>
    </div>
  );
}
