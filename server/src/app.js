const express = require('express');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
const cron = require('node-cron');

const apiRouter = require('./api/Api.router');

const handleFetchData = require('./cron/Incident.cron');

const app = express();

require('dotenv').config();

const initalizeMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
}

initalizeMongoDB();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/v1', apiRouter);

handleFetchData();
cron.schedule('*/5 * * * *', () => {
  handleFetchData();
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
