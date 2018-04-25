import express from 'express';
import businesscontroller from '../controller/businessController';
import reviewController from '../controller/reviewController';
import { checkLocation, checkCategory, checkMobile, checkBusinessName } from '../helper/validation';
import { checkAuthentication } from '../helper/utils';


const routes = express.Router();

routes.post('/', checkAuthentication, checkBusinessName, checkMobile, businesscontroller.createBusiness);
routes.get('/', businesscontroller.getAllBusinesses);
routes.get('/:businessId', businesscontroller.getBusinessById);
routes.put('/:businessId', checkAuthentication, businesscontroller.updateBusiness);
routes.delete('/:businessId', checkAuthentication, businesscontroller.deleteBusiness);
routes.post('/:businessId/reviews', checkAuthentication, reviewController.createReview);
routes.get('/:businessId/reviews', reviewController.getBusinessReviews);

export default routes;
