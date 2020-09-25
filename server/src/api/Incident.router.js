const express = require('express');
const Incident = require('../models/Incident.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('Incident router has been called');
  try {
    const { start, category } = req.query;

    let incidentsFilter = {};

    if (start) {
      const startDate = new Date(start);
      incidentsFilter = {
        ...incidentsFilter,
        $and: [
          {
            $or: [
              {
                stop: {
                  $gte: startDate,
                },
              },
              {
                stop: null,
              },
            ],
          },
          {
            $or: [
              {
                start: {
                  $lte: startDate,
                },
              },
              {
                start: null,
              },
            ],
          },
        ],
      };
    }

    if (category) {
      incidentsFilter = { ...incidentsFilter, category };
    }

    const incidents = await Incident.find(incidentsFilter)
      .select('-__v')
      .sort('road')
      .collation({
        locale: 'en_US',
        numericOrdering: true,
      });

    res.json(incidents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
