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

  /**
       * @static
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
    /*  include radix parameter 10
        If the radix parameter is omitted, JavaScript assumes the following:
        If the string begins with "0x", the radix is 16 (hexadecimal)
        If the string begins with "0", the radix is 8 (octal). This feature is deprecated
        If the string begins with any other value, the radix is 10 (decimal) */
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
    // let deletedBusiness;
    const businessOwner = 1;
    /*  include radix parameter 10
            If the radix parameter is omitted, JavaScript assumes the following:
            If the string begins with "0x", the radix is 16 (hexadecimal)
            If the string begins with "0", the radix is 8 (octal). This feature is deprecated
            If the string begins with any other value, the radix is 10 (decimal) */
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
      });
    }
    businesses.splice(businessPosition, 1);
    return res.status(401).json({
      message: 'Business has been deleted, Displaying remaining businesses',
      businesses
    });
  }
}


export default businessController;
