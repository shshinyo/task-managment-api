import request from 'supertest';
import app from '../app';

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.task).toHaveProperty('_id');
  });

  it('should retrieve tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.tasks.length).toBeGreaterThan(0);
  });
});
