import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signs up user', async() => {
    const user = {
      username: 'bob',
      password: 'fourtwenty'
    };
    const { body } = await request(app)
      .post('api/v1/auth/signup')
      .send(user);

    expect(body).toEqual({ id: '1', ...user });
  });
});
