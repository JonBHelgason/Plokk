import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Backend API', () => {
  describe('GET /health', () => {
    it('should return ok status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /areas', () => {
    it('should return all areas', async () => {
      const response = await request(app).get('/areas');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /areas/:id', () => {
    it('should return a specific area', async () => {
      const response = await request(app).get('/areas/area1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 'area1');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('status');
    });

    it('should return 404 for non-existent area', async () => {
      const response = await request(app).get('/areas/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /profiles', () => {
    it('should return all profiles', async () => {
      const response = await request(app).get('/profiles');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /profiles/:id', () => {
    it('should return a specific profile', async () => {
      const response = await request(app).get('/profiles/profile1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 'profile1');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('points');
    });

    it('should return 404 for non-existent profile', async () => {
      const response = await request(app).get('/profiles/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /events', () => {
    it('should return all events', async () => {
      const response = await request(app).get('/events');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /events', () => {
    it('should create a new cleanup event', async () => {
      const response = await request(app).post('/events').send({
        areaId: 'area1',
        profileId: 'profile1',
        location: { lat: 64.145, lng: -21.94 },
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('pointsEarned');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app).post('/events').send({
        areaId: 'area1',
      });
      expect(response.status).toBe(400);
    });

    it('should return 404 for non-existent area or profile', async () => {
      const response = await request(app).post('/events').send({
        areaId: 'nonexistent',
        profileId: 'profile1',
        location: { lat: 64.145, lng: -21.94 },
      });
      expect(response.status).toBe(404);
    });
  });
});
