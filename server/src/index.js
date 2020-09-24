const app = require('./app');

const PORT = process.env.port || 6000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
