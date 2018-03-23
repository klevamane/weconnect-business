import reviews from '../model/reviewModel';
import businesses from '../model/businessModel';
/**
     * @class revieController
     * @classdesc creates a review class with methods
     */
class reviewController {
  /**
     * Create Business Review
     * @static
     * @description create review for a registered business
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} Success message with the user created or error message
     * @memberOf
     */
  static createReview(req, res) {
    const oldreviewLength = reviews.length;
    const userid = parseInt(req.params.businessId, 10);

    const review = {
      id: reviews.length + 1,
      userId: userid,
      businessId: parseInt(req.params.businessId, 10),
      comment: req.body.comment,
      createdAt: Date.now()
    };
    if (userid > 2) {
      return res.status(401).json({
        message: 'Kindly register to comment'
      });
    }

    reviews.push(review);
    if (reviews.length > oldreviewLength) {
      return res.status(201).json(reviews);
    }
    return res.status(406).json({
      message: 'Something went wrong'
    });
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
      return res.status(404).json({
        message: 'Business does not exist'
      });
    }
    const businessReview = reviews.filter(element => element.businessId === businessId);
    return res.status(302).json(businessReview);
  }
}
export default reviewController;
