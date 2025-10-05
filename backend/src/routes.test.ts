import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

const app = createApp();

describe('Areas API', () => {
  it('returns list of areas with status', async () => {
    const response = await request(app).get('/api/areas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('status');
  });

  it('allows recording a cleaning event', async () => {
    const cleanResponse = await request(app)
      .post('/api/areas/isl-rvk-004/clean')
      .send({
        userId: 'test-user',
        userName: 'Test User',
        bagsCollected: 3,
        photoUrl: 'https://example.com/photo.jpg',
      });

    expect(cleanResponse.status).toBe(201);
  expect(cleanResponse.body.profile.totalCleanings).toBeGreaterThan(0);

    const profileResponse = await request(app).get('/api/profiles/test-user');
    expect(profileResponse.body.totalCleanings).toBeGreaterThanOrEqual(1);
  });
});

describe('Health endpoint', () => {
  it('reports ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
