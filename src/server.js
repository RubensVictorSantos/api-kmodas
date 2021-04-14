const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv-safe").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.listen(process.env.PORT);