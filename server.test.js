const request = require('supertest');
const app = require('./server');

describe('API Tests', () => {
  it('should return a welcome message on the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the Azure DevOps Demo App!');
  });

  it('should return a list of users from the /api/users endpoint', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Alex' })
      ])
    );
  });
});
