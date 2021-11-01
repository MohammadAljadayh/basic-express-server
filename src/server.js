'use strict';

const express = require('express');
const app = express();


const notFoundHandler = require('./erorr-handlers/404');
const errHandler = require('./erorr-handlers/500');
const validatorMiddleware = require('./middleware/validator');
const loggerMiddleware = require('./middleware/logger');

app.use(loggerMiddleware); 

app.get('/', (req, res) => {
  res.status(200).send('Hello this is home root');
});

app.get('/person', validatorMiddleware, (req, res) => {
  res.send(`Hello , ${req.validator}`)
});

app.get('/bad', (req, res, next) => {
  next('error /bad');
});


function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}


app.use('*', notFoundHandler); 
app.use(errHandler);


module.exports = {
  server: app,
  start: start
};

