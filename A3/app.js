const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const { registerRoutes } = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app)

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => { 
  console.log(error)
  console.log(`Please set DATABASE_URL in .env file`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
});

module.exports = app;
