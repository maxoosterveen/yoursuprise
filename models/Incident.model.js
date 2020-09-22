const mongoose = require('mongoose');

const IncidentSchema = mongoose.Schema({
  ext_id: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  road: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: false,
  },
  stop: {
    type: Date,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
  },
  delay: {
    type: Number,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident;
