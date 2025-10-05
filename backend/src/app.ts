import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import {
  getAreas,
  getArea,
  getProfiles,
  getProfile,
  getEvents,
  createCleanupEvent,
} from './data';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  // Get all areas
  app.get('/areas', (_req: Request, res: Response) => {
    const areas = getAreas();
    res.json(areas);
  });

  // Get single area
  app.get('/areas/:id', (req: Request, res: Response) => {
    const area = getArea(req.params.id);
    if (!area) {
      res.status(404).json({ error: 'Area not found' });
      return;
    }
    res.json(area);
  });

  // Get all profiles
  app.get('/profiles', (_req: Request, res: Response) => {
    const profiles = getProfiles();
    res.json(profiles);
  });

  // Get single profile
  app.get('/profiles/:id', (req: Request, res: Response) => {
    const profile = getProfile(req.params.id);
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profile);
  });

  // Get all events
  app.get('/events', (_req: Request, res: Response) => {
    const events = getEvents();
    res.json(events);
  });

  // Create cleanup event
  app.post('/events', (req: Request, res: Response) => {
    const { areaId, profileId, location } = req.body;

    if (!areaId || !profileId || !location || !location.lat || !location.lng) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const event = createCleanupEvent(areaId, profileId, location);

    if (!event) {
      res.status(404).json({ error: 'Area or profile not found' });
      return;
    }

    res.status(201).json(event);
  });

  return app;
}
