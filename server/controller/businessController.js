import businesses from '../model/businessModel';
/**
     * @class businessController
     * @classdesc creates a usercontroller class with methods
     */
class businessController {
  /**
     * Register a new business on the platform
     * @static
     * @description create a new busines
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} Success message with the business created or error message
     * @memberOf
     */
  static createBusiness(req, res) {
    const newBusiness = {
      id: businesses.length + 1,
      name: req.body.name,
      address: req.body.address,
      state: req.body.state,
      mobile: req.body.mobile,
      description: req.body.description,
      url: req.body.url,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    businesses.push(newBusiness);
    const position = businesses.length - 1;
    const createdBusiness = businesses[position];
    return res.status(201).json({
      message: 'Business has been registerd',
      createdBusiness
    });
  }
}

export default businessController;
