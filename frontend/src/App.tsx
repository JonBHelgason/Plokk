import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchAreas, fetchProfiles, fetchEvents } from './api';
import { MapView } from './components/MapView';
import { ProfileCard } from './components/ProfileCard';
import { EventsList } from './components/EventsList';
import './App.css';

const queryClient = new QueryClient();

function AppContent() {
  const { data: areas = [], isLoading: areasLoading } = useQuery({
    queryKey: ['areas'],
    queryFn: fetchAreas,
  });

  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfiles,
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  if (areasLoading || profilesLoading || eventsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚮 Plokka App</h1>
      <p>Gerum umhverfishreinsun að skemmtilegum leik</p>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Color-coded Areas Map</h2>
        <MapView areas={areas} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2>Top Profiles</h2>
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        <div>
          <EventsList events={events} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
