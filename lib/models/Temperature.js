const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number
  },
  monitor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Monitor'
  }
});

module.exports = mongoose.model('Temperature', temperatureSchema);
