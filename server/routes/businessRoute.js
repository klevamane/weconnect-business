import express from 'express';
import businesscontroller from '../controller/businessController';

const routes = express.Router();

routes.post('/', businesscontroller.createBusiness);
routes.put('/:businessId', businesscontroller.updateBusiness);
routes.delete('/:businessId', businesscontroller.deleteBusiness);

export default routes;
