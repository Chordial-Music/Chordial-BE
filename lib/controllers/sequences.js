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
  })

  .get('/:id', (req, res, next) => {
    Sequences.findById(req.params.id)
      .then(results => res.send(results))
      .catch(next);
  });