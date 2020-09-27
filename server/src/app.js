const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');
const middlewares = require('./middlewares');

const apiRouter = require('./api/Api.router');

const handleFetchData = require('./cron/Incident.cron');

const app = express();

require('dotenv').config();

// Connect to MongoDB database
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB is running');
  } catch (error) {
    console.log(error);
  }
})();

// Serve static react files if env is production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

// append API router to default API url
app.use('/api/v1', apiRouter);

// Run the function when the server starts
handleFetchData();

// Fetch the data every 5 minutes
cron.schedule('*/5 * * * *', () => {
  handleFetchData();
});

// Middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
