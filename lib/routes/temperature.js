const { Router } = require('express');
const Temperature = require('../models/Temperature');

module.exports = Router()
  .get('/', (req, res, next) => {
    Temperature
      .find()
      .select({
        __v: false
      })
      .then(temps => res.send(temps))
      .catch(next);
  });
