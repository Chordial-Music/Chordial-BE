import Router from 'express';
import Sequences from '../models/Sequences.js';

export default Router()

  .post('/', (req, res, next) => {
    Sequences.create(req.body)
      .then(results => res.send(results))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Sequences.findAll()
      .then(results => res.send(results))
      .catch(next);
  });
