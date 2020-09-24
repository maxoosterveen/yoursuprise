const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./api/Api.router');
require('./schedule/Incident.schedule');

const app = express();

require('dotenv').config();

async function initalizeMongoDB() {
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

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/v1', apiRouter);

const PORT = process.env.port || 6000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
