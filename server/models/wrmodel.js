const mongoose = require('mongoose');

const wrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  PPR: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
}, {collection: 'WR'})

module.exports = mongoose.model('WR', wrSchema);