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

it('login a user', async() => {
  const res = await agent
    .post('/api/v1/auth/login')
    .send({
      username: 'bill',
      password: 'password'
    });

  expect(res.body).toEqual({ id: '2', username: 'bill' });
});


