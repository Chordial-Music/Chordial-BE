import { Router } from 'express';
import AuthService from '../services/AuthService.js';

export default Router()
  .post('api/v1/auth/signup', (req, res, next) => {
    AuthService.create(req.body)
      .then(results => res.send(results))
      .catch(next);
  })

  .post('api/v1/auth/login', (req, res, next) => {
    AuthService.create(req.body)
      .then(results => res.send(results))
      .catch(next);
  });


