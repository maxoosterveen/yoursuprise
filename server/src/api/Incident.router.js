const express = require('express');
const Incident = require('../models/Incident.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { start, category } = req.query;

    const incidentsFilter = {
      $and: [
        {
          $or: [
            {
              stop: {
                $gte: start,
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
                $lte: start,
              },
            },
            {
              start: null,
            },
          ],
        },
      ],
    };

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
