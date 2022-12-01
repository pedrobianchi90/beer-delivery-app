require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const handleError = require('../middlewares/handleErrorMiddleware');
const routes = require('../routes');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/', routes);
app.use(userRoutes);

app.use(handleError);

module.exports = app;
