import express from 'express';
import businesscontroller from '../controller/businessController';
import reviewController from '../controller/reviewController';

const routes = express.Router();

routes.post('/', businesscontroller.createBusiness);
routes.get('/', businesscontroller.getAllBusinesses);
routes.get('/:businessId', businesscontroller.getBusinessById);
routes.put('/:businessId', businesscontroller.updateBusiness);
routes.delete('/:businessId', businesscontroller.deleteBusiness);
routes.post('/:businessId/reviews', reviewController.createReview);
routes.get('/:businessId/reviews', reviewController.getBusinessReviews);

export default routes;
