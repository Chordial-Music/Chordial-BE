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
      username: 'bob',
      password: 'fourtwenty'
    };

    const res = await request(app)
      .post('api/v1/auth/signup')
      .send(user);

    expect(res.body).toEqual({ id: '1', ...user });
  });
});
