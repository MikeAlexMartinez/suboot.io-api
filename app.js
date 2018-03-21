'use strict';

const path = require('path');

// Third party libs
require('dotenv').config();
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const secret = process.env.SECRET;

const db = require('./db/connect');

// Helpers
const { fileDate } = require('./utils/dates');

// initiate express app
const app = express();

// instantiate helmet headers and protections
app.use(helmet());

// Cookie Parsing
app.use(cookieParser(secret, {}));

// supports parsing of application/json type post data
app.use(bodyParser.json());
// supports parsing of application/x-www-form-urlendcoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Express winston logger
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
    }),
    new winston.transports.File({
      filename: `logs/requests/${fileDate()}requests.log`,
    })
  ],
  meta: true,
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}}',
  expressFormat: true, 
  colorize: true,
  skip: () => process.env.NODE_ENV === 'test',
}));

// My API routes
app.use('/v1/api' , require('./api'));

// Express Winston Error logging after routes
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  console.log("Error");
  console.log(err);
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {}
    });
});

module.exports = app;
