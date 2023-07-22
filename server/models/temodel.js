const mongoose = require('mongoose');

const teSchema = new mongoose.Schema({
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
}, {collection: 'TE'})

module.exports = mongoose.model('TE', teSchema);