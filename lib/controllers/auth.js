import { Router } from 'express';
import AuthService from '../services/AuthService.js';

export default Router()
  .post('/api/v1/auth/signup', (req, res, next) => {
    
    AuthService.create(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/api/v1/auth/login', (req, res, next) => {
    AuthService.create(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
        });
        res.send(user);
      })
      .catch(next);
  });


