const mongoose = require('mongoose');

const IncidentSchema = mongoose.Schema({
  extId: {
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
  startRoute: {
    type: String,
    required: false,
  },
  endRoute: {
    type: String,
    required: false,
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
  type: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident;
