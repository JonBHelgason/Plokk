import type { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import router from './routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', router);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: `Leið fannst ekki: ${req.method} ${req.path}` });
  });

  return app;
}

export type AppInstance = ReturnType<typeof createApp>;
