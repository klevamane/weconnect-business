import reviews from '../model/reviewModel';
import businesses from '../model/businessModel';
import users from '../model/userModel';
import models from '../models';

const { Review } = models;
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
    Review.create({
      comment: req.body.comment,
      UserId: req.body.userId,
      BussinessId: req.params.businessId
    }).then((newReview) => {
      if (!newReview) {
        // Return something, could not add review
        return res.status(400).json({
          message: 'Review could not be added'
        });
      }
      // Return all reviews for the particular business
      Review.findAll({
        where: {
          BusinessId: req.body.bussinessId
        }
      }).then(businessReviews => res.status(200).json(businessReviews))
        .catch(error => res.status(400).send(error));
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
    const businessId = parseInt(req.params.businessId, 10);
    const totalBusinesses = businesses.length;
    if (businessId > totalBusinesses) {
      return res.status(404).json({ message: 'Business does not exist' });
    }
    const businessReview = reviews.filter(element => element.businessId === businessId);
    return res.status(302).json(businessReview);
  }
}
export default reviewController;
