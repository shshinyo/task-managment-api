
import request from 'supertest';
import app from '../app'; 
import mongoose from 'mongoose';

// Sample User data
const sampleUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'Password123!',
  role: 'admin',

};

beforeAll(async () => {
  // Connect to the database before tests
  await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/task-manager', {
  });
});

afterAll(async () => {
  // Clean up database and close connection
  await mongoose.connection.close();
});

describe('User Controller', () => {
  it('should register a new user', async () => {
    const res = 
    await request(app)
      .post('/api/users/register')
      .send(sampleUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(sampleUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User with this email already exists.');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: sampleUser.email, password: sampleUser.password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: sampleUser.email, password: 'wrongpassword' });
    expect(res.status).toBe(401);
  });
});
