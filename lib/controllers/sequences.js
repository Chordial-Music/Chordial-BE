import Router from 'express';
import Sequences from '../models/Sequences';

export default Router()

  .post('/api/v1/sequences', (req, res, next) => {
    Sequences.create(req.body)
      .then(results => res.send(results))
      .catch(next);
  }); 
