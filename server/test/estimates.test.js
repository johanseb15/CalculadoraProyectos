const request = require('supertest');
const app = require('../index');

describe('GET /api/estimates', () => {
  it('requiere autenticación', async () => {
    const res = await request(app).get('/api/estimates');
    expect(res.statusCode).toBe(401);
  });
});
