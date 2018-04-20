import models from '../models';
import { checkifBusinessExist } from '../helper/utils';

const { Review, Business } = models;
/**
     * @class revieController
     * @classdesc creates a review class with methods
     */
class reviewController {
  /**
    * @static
    * @description create review for a registered business
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the user created or error message
    */
  static createReview(req, res) {
    const checkBusiness = checkifBusinessExist(req.params.businessId);
    // console.log(checkBusiness);
    if (checkBusiness === false) {
      return res.status(404).json({ message: 'Review cannot be added to a business that does not exist!' });
    }
    Review.create({
      comment: req.body.comment,
      UserId: req.body.userId,
      BusinessId: req.params.businessId
    }).then((newReview) => {
      if (!newReview) {
        // Return something, could not add review
        return res.status(400).json({
          message: 'Review could not be added'
        });
      }
      return res.status(200).json({ message: 'Review has been succesfully added' });
      // Return all reviews for the particular business
      // Review.findAll({
      //   where: {
      //     BusinessId: req.body.bussinessId
      //   }
      // }).then(businessReviews => res.status(200).json(businessReviews))
      //   .catch(error => res.status(400).send(error));
      /* Business.findOne({
        include: [{
          model: Review,
          where: { BusinessId: req.params.businessId }
        }]
      }).then((businessReviews) => {
        if (!businessReviews) {
          return res.status(400).json({ message: 'Could not display reviews ' });
        }
        return res.status(200).json(businessReviews);
      }); */
    }).catch(error => res.status(400).send(error));
  }

  /**
     * List Business Review
     * @static
     * @description List reviews of a partcular business
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} review object with the user status code
     * @memberOf
     */
  static getBusinessReviews(req, res) {
    // Todo: Validate req.params.businessId and sanitize
    const checkBusiness = checkifBusinessExist(req.params.businessId);
    if (checkBusiness === false) {
      return res.status(404).json({ message: 'Review cannot be displayed for a business that does not exist!' });
    }
    Review.findAll({
      where: {
        BusinessId: req.params.businessId
      }
    }).then((businessReviews) => {
      if (!businessReviews) {
        return res.status(204).json({ message: 'No content to be displayed' });
      }
      res.staus(302).json({
        message: 'List of all reviews for this business',
        businessReviews
      });
    })
      .catch(error => res.status(400).send(error));
  }
}
export default reviewController;
