const express = require('express');
const Incident = require('../models/Incident.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const incidents = await Incident.find({
      $or: [{ stop: { $gte: stop } }, { stop: null }],
    })
      .select('-__v')
      .limit(+limit)
      .skip(+offset)
      .sort('-start');

    res.json(incidents);
  } catch (error) {
    next(error);
  }
});

router.get('/:category', async (req, res, next) => {
  const { category } = req.params;
  const { limit, offset } = req.query;
  try {
    const incidents = await Incident.find({ category })
      .select('-__v')
      .limit(+limit)
      .skip(+offset);

    res.json(incidents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
