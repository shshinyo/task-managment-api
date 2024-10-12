import  request from 'supertest';
import app from '../app'; 
import mongoose from 'mongoose';
import {describe, expect, test} from '@jest/globals';
// Sample Task data
const sampleTask = {
  title: 'Test Task',
  description: 'This is a test task.',
};

let token: string;

beforeAll(async () => {
  // Connect to the database before tests
  await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/task-manager', {});

  // Register a user and login to get a token
  await request(app)
    .post('/api/users/register')
    .send({
      username: 'testuserTask',
      email: 'testuserTask@example.com',
      password: 'Password123!',
      role: 'admin',

    });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'testuserTask@example.com', password: 'Password123!' });
  
  token = res.body.token; 
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Controller', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleTask);
    expect(res.status).toBe(201);
  });

  it('should get all tasks for a user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  it('should update an existing task', async () => {
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleTask);

    const taskId = taskRes.body.id; // Get the task ID for the update
    const updatedTask = { ...sampleTask, title: 'Updated Task' };

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedTask);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', updatedTask.title);
  });

  it('should delete a task', async () => {
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleTask);

    const taskId = taskRes.body.id; // Get the task ID for deletion

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
