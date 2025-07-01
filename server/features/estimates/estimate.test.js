// Tests para estimates feature
const request = require('supertest');
const app = require('../../index');

describe('Estimates endpoints', () => {
  it('should require authentication for GET /api/estimates', async () => {
    const res = await request(app).get('/api/estimates');
    expect(res.statusCode).toBe(401);
  });
});
