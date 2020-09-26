const axios = require('axios');
const Incident = require('../models/Incident.model');

require('dotenv').config();

const updateNotUpdatedIncidents = async (updatedAt) => {
  const incidentFilter = {
    updatedAt: { $lt: updatedAt },
    stop: null,
  };

  try {
    await Incident.updateMany(incidentFilter, {
      stop: new Date(),
      distance: null,
      delay: null,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateOrCreateIncident = async (
  incident,
  updatedAt,
  startRoute,
  endRoute
) => {
  try {
    const { id, category, road, start, stop, distance, delay, type } = incident;

    const incidentFilter = { ext_id: id };

    const incidentObject = {
      ext_id: id,
      category,
      road,
      startRoute,
      endRoute,
      start,
      stop,
      distance,
      delay,
      type,
      updatedAt,
    };

    const incidentDoc = await Incident.findOne(incidentFilter);

    if (incidentDoc) {
      await Incident.updateOne(incidentFilter, incidentObject);
    } else {
      await Incident.create(incidentObject);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const fetchHandler = async () => {
  try {
    const {
      data: { roads },
    } = await axios.get('https://api.anwb.nl/v1/incidents', {
      params: {
        apikey: process.env.ANWB_API_KEY,
        totals: true,
      },
    });

    return roads;
  } catch (error) {
    console.log(error.message);
  }
};

const handleFetchData = async () => {
  try {
    const roads = await fetchHandler();

    const updatedAt = new Date();

    roads.forEach((roadObject) => {
      const { segments } = roadObject;

      segments.forEach((segment) => {
        const {
          roadworks = [],
          jams = [],
          start: startRoute,
          end: endRoute,
        } = segment;

        const incidents = [];

        incidents.push.apply(incidents, roadworks);
        incidents.push.apply(incidents, jams);

        incidents.forEach((incident) =>
          updateOrCreateIncident(incident, updatedAt, startRoute, endRoute)
        );
      });
    });

    updateNotUpdatedIncidents(updatedAt);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = handleFetchData;
