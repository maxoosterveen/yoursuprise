const axios = require('axios');
const cron = require('node-cron');
const Incident = require('../models/Incident.model');

require('dotenv').config();

const updateOldIncidents = async (updatedAt) => {
  try {
    const incidents = await Incident.updateMany(
      {
        updatedAt: { $lte: updatedAt },
        stop: null,
      },
      {
        stop: new Date(),
        distance: null,
        delay: null,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const updateOrCreateIncident = async (incident, updatedAt) => {
  try {
    const { id, category, road, start, stop, distance, delay } = incident;

    const incidentFilter = { ext_id: id };

    const incidentObject = {
      ext_id: id,
      category,
      road,
      start,
      stop,
      distance,
      delay,
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
  console.log('fetchHandler has been called!');
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

const handleDataStuff = async () => {
  try {
    const roads = await fetchHandler();

    const updatedAt = new Date();

    roads.forEach((roadObject) => {
      const { segments } = roadObject;

      segments.forEach((segment) => {
        const { roadworks, jams } = segment;

        if (roadworks)
          roadworks.forEach((roadwork) =>
            updateOrCreateIncident(roadwork, updatedAt)
          );
        if (jams) jams.forEach((jam) => updateOrCreateIncident(jam, updatedAt));
      });
    });

    updateOldIncidents(updatedAt);
  } catch (error) {
    console.log(error.message);
  }
};

handleDataStuff();
// Run the above function every 5 minutes
cron.schedule('*/5 * * * *', () => {
  handleDataStuff();
});
