import express from 'express';
import businesscontroller from '../controller/businessController';
import reviewController from '../controller/reviewController';
import { validateCreateBusiness } from '../helper/validation';
import { checkAuthentication, checkBusinessId, checkBusinessName } from '../helper/utils';


const routes = express.Router();

routes.post('/', validateCreateBusiness, checkAuthentication, checkBusinessName, businesscontroller.createBusiness);
routes.get('/', businesscontroller.getAllBusinesses);
routes.get('/:businessId', businesscontroller.getBusinessById);
routes.put('/:businessId', checkAuthentication, businesscontroller.updateBusiness);
routes.delete('/:businessId', checkAuthentication, checkBusinessId, businesscontroller.deleteBusiness);
routes.post('/:businessId/reviews', checkAuthentication, reviewController.createReview);
routes.get('/:businessId/reviews', reviewController.getBusinessReviews);

export default routes;
