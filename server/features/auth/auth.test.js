// Tests para auth feature
const request = require('supertest');
const app = require('../../index');

describe('Auth endpoints', () => {
  it('should return 404 for unknown auth route', async () => {
    const res = await request(app).get('/api/auth/unknown');
    expect(res.statusCode).toBe(404);
  });
});
