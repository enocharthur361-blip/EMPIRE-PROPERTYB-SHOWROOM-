// Listing tests
const request = require('supertest');
const app = require('../index');

describe('Listings Endpoints', () => {
  it('should get all listings', async () => {
    const res = await request(app)
      .get('/api/listings');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('listings');
  });

  it('should filter listings by type', async () => {
    const res = await request(app)
      .get('/api/listings?type=apartment');

    expect(res.statusCode).toBe(200);
  });
});
