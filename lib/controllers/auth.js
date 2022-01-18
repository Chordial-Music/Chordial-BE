import { Router } from 'express';
import AuthService from '../services/AuthService.js';
import ensureAuth from '../middleware/ensure-auth.js';

const ONE_DAY = 1000 * 60 * 60 * 24;

export default Router()
  .post('/api/v1/auth/signup', (req, res, next) => {
    AuthService.create(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          sameSite: 'none',
          secure: 'true',
          maxAge: ONE_DAY,
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/api/v1/auth/login', (req, res, next) => {
    AuthService.authenticate(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          sameSite: 'none',
          secure: 'true',
          maxAge: ONE_DAY,
        });
        res.send(user);
      })
      .catch(next);
  })

  .get('/api/v1/auth/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/api/v1/auth/logout', (req, res) => {
    res.clearCookie('session', {
      httpOnly: true,
      sameSite: 'none',
      secure: 'true',
    });
    res.send({ logout: true });
  });


