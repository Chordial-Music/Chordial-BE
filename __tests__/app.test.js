import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signs up user', async () => {
    const user = {
      id: '1',
      username: 'bob',
      password: 'password',
    };

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    expect(res.body).toEqual({ id: '1', username: 'bob' });
  });
});

it('login a user', async () => {
  const res = await agent
    .post('/api/v1/auth/login')
    .send({
      username: 'bill',
      password: 'password'
    });

  expect(res.body).toEqual({ id: '2', username: 'bill' });
});

it('creates a sequence', async () => {
  const res = await agent
    .post('/api/v1/sequences')
    .send({ userId: '1', sequence: ['A', 'B', 'C'] });

  expect(res.body).toEqual({ id: '1', userId: 1, sequence: ['A', 'B', 'C'] });
});

it('finds all sequences', async () => {
  await agent
    .post('/api/v1/sequences')
    .send({ userId: '1', sequence: ['A', 'B', 'C'] });

  await agent
    .post('/api/v1/sequences')
    .send({ userId: '1', sequence: ['Ab', 'Bb', 'F'] });

  await agent
    .post('/api/v1/sequences')
    .send({ userId: '2', sequence: ['Bb', 'F', 'C'] });

  const res = await request(app).get('/api/v1/sequences');

  expect(res.body).toEqual([
    { id: '1', sequence: ['A', 'B', 'C'] },
    { id: '2', sequence: ['A', 'B', 'C'] },
    { id: '3', sequence: ['Ab', 'Bb', 'F'] },
    { id: '4', sequence: ['Bb', 'F', 'C'] }
  ]);
});

it('finds a sequence by id', async () => {
  const sequence = await agent
    .post('/api/v1/sequences')
    .send({ userId: '2', sequence: ['Bb', 'F', 'C'] });

  const res = await request(app).get(`/api/v1/sequences/${sequence.body.id}`);
  expect(res.body).toEqual({ id: '5', userId: 2, sequence: ['Bb', 'F', 'C'] });
});