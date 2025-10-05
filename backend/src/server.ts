import { createApp } from './app.js';

const app = createApp();
const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Plokk backend ready on http://${HOST}:${PORT}`);
});

export default app;
