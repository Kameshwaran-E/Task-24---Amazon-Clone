const express = require('express');
const app = express();
require('dotenv').config;
const cors = require('cors');
const connectDB = require('./config/db');
const apiRouter = require('./routes');

connectDB();

app.use(express.json());

app.use('/api', apirouter);

app.get('/', (req, res) => {
  res.json('Api is working');
});

app.use(cors());

app.get('/', (req, res) => {
  res.json('Api is working');
});

app.listen(4000, () => {
  console.log('Server is up and running');
});
