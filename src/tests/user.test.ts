import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login user', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
