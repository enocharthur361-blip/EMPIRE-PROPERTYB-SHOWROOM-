// Auth tests
const request = require('supertest');
const app = require('../index');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+971503333333',
        password: 'password123',
        role: 'owner'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('john@example.com');
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
