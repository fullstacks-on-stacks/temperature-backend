const { Router } = require('express');
const Monitor = require('../models/Monitor');

module.exports = Router()
  .get('/status', (req, res, next) => {
    res.status(204).send();
  })

  .post('/register', (req, res, next) => {
    const { name } = req.body;

    Monitor
      .create({ name })
      .then(name => res.send({ id: name._id }))
      .catch(next);
  })
  
  .delete('/deregister', (req, res, next) => {
    const { id } = req.body;

    Monitor
      .findByIdAndDelete(id)
      .then(res.status(204).send())
      .catch(next);
  });
