const express = require('express');

const PORT = process.env.port || 3001;

const app = express;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);





app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);