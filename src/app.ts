import express = require('express');
import {Response, Request, NextFunction} from 'express'
import {accessLogMiddleware} from './common/access_log'

import * as healthController from './controller/health';
import * as homeController from './controller/home';
import * as testController from './controller/test';
import { logging } from './common/logging';


export const app = express();
app.enable('trust proxy')

// Setup access logs
app.use(accessLogMiddleware());

app.get('/', homeController.index);
app.get('/health', healthController.health);

// Test routes
app.get('/test/error', testController.error);
app.get('/test/exception', testController.exception);

app.use((_req:Request, res:Response, _next:NextFunction) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err:Error, _req:Request, res:Response, _next:NextFunction) => {
  logging.error("request failed", {error: err.message, stack: err.stack})
  res.status(500).send(err.message)
})
