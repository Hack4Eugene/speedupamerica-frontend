import path = require('path');
import express = require('express');
import {Response, Request, NextFunction} from 'express';
import handlebars = require('express-handlebars');
import sassMiddleware = require('node-sass-middleware');
import * as HttpStatus from 'http-status-codes';

import {accessLogMiddleware} from './common/access_log';
import * as healthController from './controller/health';
import * as homeController from './controller/home';
import * as testController from './controller/test';
import {logging} from './common/logging';

export const app = express();

// We want remote IP from LB's X-Forward-For header
app.enable('trust proxy');

// Express Handlebars
app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', handlebars({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
// Give templates access to an {{isProduction}} boolean variable
app.locals.isProduction = app.get('env') === 'production';

// Sass Setup
app.use(sassMiddleware({
  src: path.join(__dirname, '/sass'),
  dest: path.join(__dirname, '/public'),
  debug: true,
}));

// Setup access logs
app.use(accessLogMiddleware());

// Routes
app.get('/health', healthController.health);
app.get('/', homeController.index);
app.get('/robots.txt', homeController.robots);
app.use(express.static(path.join(__dirname, 'public')));

// Test routes
app.get('/test/error', testController.error);
app.get('/test/exception', testController.exception);

// 404 handler
app.use((req:Request, res:Response, _next:NextFunction) => {
  // @TODO create a nice 404 page and handle accepts header
  res = res.status(HttpStatus.NOT_FOUND);

  // Request expects json response
  if (req.accepts('html', 'json') === 'json') {
    res.json({'status': 'error', 'error': 'Not found'});
    return;
  }
  res.render('404');
});

// Error handler
app.use((err:Error, req:Request, res:Response, _next:NextFunction) => {
  logging.error('request failed', {error: err.message, stack: err.stack});

  res = res.status(HttpStatus.INTERNAL_SERVER_ERROR);

  // Request expects json response
  if (req.accepts('html', 'json') === 'json') {
    res.json({'status': 'error', 'error': err.message});
    return;
  }

  res.send(err.message);
});
