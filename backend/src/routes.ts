import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import {
  getAreaById,
  getProfile,
  listAreas,
  listRecentEvents,
  recordCleaning,
} from './data.js';

const router = Router();

router.get('/areas', (_req: Request, res: Response) => {
  res.json(listAreas());
});

const cleanSchema = z.object({
  userId: z.string().min(1),
  userName: z.string().min(1),
  bagsCollected: z.number().int().min(1).max(25),
  photoUrl: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

router.post('/areas/:id/clean', (req: Request, res: Response) => {
  const parseResult = cleanSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: 'Ógild gögn',
      errors: parseResult.error.flatten(),
    });
  }

  const areaId = req.params.id;
  try {
    const result = recordCleaning({ areaId, ...parseResult.data });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Area not found') {
      return res.status(404).json({ message: 'Svæði fannst ekki' });
    }
    res.status(500).json({ message: 'Villa við að vista hreinsun' });
  }
});

router.get('/areas/:id', (req: Request, res: Response) => {
  const area = getAreaById(req.params.id);
  if (!area) {
    return res.status(404).json({ message: 'Svæði fannst ekki' });
  }
  res.json(area);
});

router.get('/profiles/:userId', (req: Request, res: Response) => {
  const profile = getProfile(req.params.userId);
  res.json(profile);
});

router.get('/events', (req: Request, res: Response) => {
  const limitParam = req.query.limit;
  const limit = typeof limitParam === 'string' ? Number(limitParam) : undefined;
  const parsedLimit = Number.isFinite(limit) && limit ? Math.min(Math.max(limit, 1), 25) : 10;
  res.json(listRecentEvents(parsedLimit));
});

export default router;
