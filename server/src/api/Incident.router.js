const express = require('express');
const incidentController = require('../controllers/Incident.controller');

const router = express.Router();

router.get('/', incidentController.index);

module.exports = router;
