/* import express, { Router } from 'express';

const router = express.Router();

*/
import winston from 'winston';
import businesses from '../model/businessModel';

// const businessId = 1;
// const result = businesses.find(element => element.id === businessId);
const numberOfKeys = Object.keys(businesses).length;
// winston.info(result);
winston.info(numberOfKeys);
