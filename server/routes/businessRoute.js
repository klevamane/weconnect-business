import express from 'express';
import businesscontroller from '../controller/businessController';

const routes = express.Router();
// create a new business
routes.post('/', businesscontroller.createBusiness);
// Update a business
routes.put('/:businessId', businesscontroller.updateBusiness);
// Delete a business
routes.delete('/:businessId', businesscontroller.deleteBusiness);

export default routes;
