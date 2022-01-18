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

  .get('/user/:username', (req, res, next) => {
    Sequences.findAllByUser(req.params.username)
      .then(results => res.send(results))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Sequences.findById(req.params.id)
      .then(results => res.send(results))
      .catch(next);
  })

  .patch('/:id', async (req, res, next) => {
    Sequences.update(req.body, req.params.id)
      .then(results => res.send(results))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Sequences.delete(req.params.id)
      .then(results => res.send(results))
      .catch(next);
  });

