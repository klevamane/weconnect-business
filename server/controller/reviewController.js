import reviews from '../model/reviewModel';
import businesses from '../model/businessModel';
import users from '../model/userModel';
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
    const oldreviewLength = reviews.length;
    const businessid = parseInt(req.params.businessId, 10);
    const userId = 2;
    if (businessid > businesses.length || businessid <= 0) {
      return res.status(401).json({ message: 'Business not registered' });
    }
    const review = {
      id: reviews.length + 1,
      userId,
      businessId: parseInt(req.params.businessId, 10),
      comment: req.body.comment,
      createdAt: Date.now()
    };
    if (userId > users.length || userId <= 0) {
      return res.status(401).json({ message: 'Kindly register in order comment' });
    }
    reviews.push(review);
    if (reviews.length > oldreviewLength) {
      return res.status(201).json(reviews);
    }
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
