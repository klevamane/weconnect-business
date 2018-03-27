import businesses from '../model/businessModel';

/**
  * @class businessController
  * @classdesc creates a usercontroller class with methods
  */
class businessController {
  /** @description create a new busines
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the business created or error message
    */
  static createBusiness(req, res) {
    const {
      name, address1, location, mobile, description, url, category
    } = req.body;
    const newBusiness = {
      id: businesses.length + 1,
      name,
      address1,
      location,
      mobile,
      description,
      url,
      category
    };
    if (!req.body.name || !req.body.location) {
      return res.status(406).json({ message: 'Business must have a name, category and Location' });
    }
    const result = (businesses.find(element => element.name === newBusiness.name));
    if (result) {
      return res.status(302).json({ msg: 'Business name already exist' });
    }
    businesses.push(newBusiness);
    return res.status(201).json({ message: 'Business has been registered', newBusiness: businesses[businesses.length - 1] });
  }

  /** @static
    * @description Makes changes to registerd business
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the business updated or error message
    */
  static updateBusiness(req, res) {
    let userStatus = false;
    let businessPosition;
    let updatedBusiness;
    const businessOwner = 1;
    const paramId = parseInt(req.params.businessId, 10);
    for (let i = 0; i < businesses.length; i += 1) {
      if (businesses[i].id === paramId && businesses[i].ownerId === businessOwner) {
        businessPosition = i;
        userStatus = true;
        break;
      }
    }
    if (userStatus === false) {
      return res.status(401).json({
        message: 'You cannot update this business',
      });
    }
    if (userStatus === true) {
      businesses[businessPosition] = {
        name: req.body.name,
        address: req.body.address,
        state: req.body.state,
        mobile: req.body.mobile,
        description: req.body.description,
        url: req.body.url,
        updatedAt: Date.now()
      };
      updatedBusiness = businesses[businessPosition];
      return res.status(200).json({
        message: 'Business has been updated',
        updatedBusiness
      });
    }
  }

  /**
       * @static
       * @description Deletes a business
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the business updated or error message
       */
  static deleteBusiness(req, res) {
    let userStatus = false;
    let businessPosition;
    const businessOwner = 1;
    const paramId = parseInt(req.params.businessId, 10);
    for (let i = 0; i < businesses.length; i += 1) {
      if (businesses[i].id === paramId && businesses[i].ownerId === businessOwner) {
        businessPosition = i;
        userStatus = true;
        break;
      }
    }
    if (userStatus === false) {
      return res.status(401).json({
        message: 'Only business owner can delete a business',
        error: true
      });
    }
    businesses.splice(businessPosition, 1);
    return res.status(204).json({
      message: 'Business has been deleted',
      businesses,
      error: false
    });
  }

  /**
       * @static
       * @description List all businesses
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the business list or error message
       */
  static getAllBusinesses(req, res) {
    const { location, category } = req.query;
    const cateogryArray = [];
    const locationArray = [];
    // const combined = [];
    if (location) {
      for (let i = 0; i < businesses.length; i += 1) {
        if (businesses[i].location.toLowerCase() === location.toLowerCase()) {
          locationArray.push(businesses[i]);
        }
      }
      if (locationArray.length > 0) {
        return res.status(200).json({
          locationArray
        });
      }
      if (locationArray.length === 0) {
        return res.status(400).json({
          message: 'No businesses listed in the selected location',
        });
      }
    }
    if (category) {
      for (let i = 0; i < businesses.length; i += 1) {
        if (businesses[i].category.toLowerCase() === category.toLowerCase()) {
          cateogryArray.push(businesses[i]);
        }
      }
      if (cateogryArray.length > 0) {
        return res.status(200).json({ cateogryArray });
      }
      if (cateogryArray.length === 0) {
        return res.status(400).json({
          message: 'No businesses found under the selected category'
        });
      }
    }
    return res.status(200).json({
      message: 'List of all registered businesses',
      businesses
    });
  }


  /** @static
    * @description List a businesses by Id
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the business object or no business available
    */
  static getBusinessById(req, res) {
    const business = [];
    const paramId = parseInt(req.params.businessId, 10);
    for (let i = 0; i < businesses.length; i += 1) {
      if (businesses[i].id === paramId) {
        business.push(businesses[i]);
      }
    }
    if (business.length > 0) {
      return res.status(302).json({
        message: 'Business Details',
        business
      });
    }
    return res.status(400).json({
      message: 'not available'
    });
  }
}

export default businessController;
