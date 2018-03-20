import express from 'express';
import businesscontroller from '../controller/businessController';

const routes = express.Router();
// create a new business
routes.post('/', businesscontroller.createBusiness);

export default routes;
