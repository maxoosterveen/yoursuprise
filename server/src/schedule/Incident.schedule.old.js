const axios = require('axios');
const cron = require('node-cron');
// const polyline = require('@mapbox/polyline');
const Incident = require('../models/Incident.model');

require('dotenv').config();

const updateOrCreateIncident = async (incident) => {
  const {
    id,
    category,
    road,
    start,
    stop,
    distance,
    delay,
    label,
    // polyline: encodedPolyline,
  } = incident;

  // if(label == 'closed') console.log(`jam on ${road} is over`);

  const incidentFilter = { ext_id: id };

  // const decodedPolyline = encodedPolyline
  //   ? polyline.decode(encodedPolyline)
  //   : false;

  const incidentObject = {
    ext_id: id,
    category,
    road,
    start,
    stop,
    distance,
    delay,
  };

  try {
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
    roads.forEach((roadObject) => {
      try {
        const { segments } = roadObject;

        segments.forEach((segment) => {
          const { roadworks, jams } = segment;

          if (roadworks)
            roadworks.forEach((roadwork) => updateOrCreateIncident(roadwork));
          if (jams) jams.forEach((jam) => updateOrCreateIncident(jam));
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

fetchHandler();
// Run the above function every 5 minutes
cron.schedule('*/5 * * * *', () => {
  fetchHandler();
});
