const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

const api = require('./api/Api.routes');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/v1', api);


const PORT = process.env.port || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));