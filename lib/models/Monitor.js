const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Monitor', monitorSchema);
