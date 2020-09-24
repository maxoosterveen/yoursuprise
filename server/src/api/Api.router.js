const express = require('express');
const incidentRouter = require('./Incident.router');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Root API',
  });
});

router.use('/incidents', incidentRouter);

module.exports = router;
