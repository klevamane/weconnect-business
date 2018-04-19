import models from '../models';
import {checkifBusinessExist} from '../helper/utils';

const { Business } = models;

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
    if (!req.body.name || !req.body.locationId || !req.body.categoryId) {
      return res.status(406).json({ message: 'Business must have a name, category and Location' });
    }
    Business.findOne({
      where: {
        name: req.body.name
      }
    })
      .then((businessAlreadyExist) => {
        if (businessAlreadyExist) {
          return res.status(400).json({ message: 'Business name already in use' });
        }
        Business.create({
          name: req.body.name,
          LocationId: req.body.locationId,
          mobile: req.body.mobile,
          description: req.body.description,
          url: req.body.url,
          CategoryId: req.body.categoryId,
          UserId: req.body.userId
        })
          .then(newBusiness => res.status(201).json({
            message: 'Business has been successfully created',
            newBusiness
          }))
          .catch(error => res.status(400).send(error));
      });
  }
  /** @static
    * @description Makes changes to registerd business
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the business updated or error message
    */
  static updateBusiness(req, res) {
    Business.update(
      {
        name: req.body.name,
        LocationId: req.body.locationId,
        mobile: req.body.mobile,
        description: req.body.description,
        url: req.body.url,
        CategoryId: req.body.categoryId,
        UserId: req.body.userId
      },
      {
        where: {
          id: req.params.businessId
        }
      }
    )
      .then(res.status(201).json({ message: 'Business has been successfully updated' }))
      .catch(error => res.status(400).send(error));
  }

  /**
       * @static
       * @description Deletes a business
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the business updated or error message
       */
  static deleteBusiness(req, res) {
    // Todo: check first if business to be deleted exist
    const checkBusiness = checkifBusinessExist(req.params.businessId);
    // console.log(checkBusiness);
    if (checkBusiness === false) {
      return res.status(404).json({ message: 'The business to be deleted does not exist! latest' });
    }
    Business.destroy({
      where: {
        id: req.params.businessId
      }
    })
      .then((deletedBusiness) => {
        if (deletedBusiness !== 1) {
          return res.status(404).json({ message: 'The business to be deleted does not exist!' });
        }
        return res.status(200).json({ 
          message: 'Business has been succesfully deleted',
          thetype: typeof deletedBusiness,
          deletedBusiness
        });
      })
      .catch(error => res.status(400).send(error));
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
    if (location) {
      Business.findAll({
        where: {
          LocationId: location
        }
      })
        .then((businessesInLocation) => {
          if (businessesInLocation.length >= 1) {
            return res.status(302).json(businessesInLocation);
          }
          res.status(404).json({ message: `No business(s) found in ${location}` });
        })
        .catch(error => res.status(400).send(error));
    } else if (category) {
      Business.findAll({
        where: {
          CategoryId: category
        }
      })
        .then((businessesInCategory) => {
          if (businessesInCategory.length >= 1) {
            return res.status(302).json(businessesInCategory);
          }
          res.status(404).json({ message: `No business(s) found in ${category}` });
        })
        .catch(error => res.status(400).send(error));
    } else {
      Business.findAll({})
        .then((listOfAllBusinesses) => {
          if (listOfAllBusinesses) {
            return res.status(200).json(listOfAllBusinesses);
          }
          res.status(404).json({ message: `No business(s) found in ${location}` });
        })
        .catch(error => res.status(400).send(error));
    }
  }

  /** @static
    * @description List a businesses by Id
    * @param  {object} req gets values passed to the api
    * @param  {object} res sends result as output
    * @returns {object} Success message with the business object or no business available
    */
  static getBusinessById(req, res) {
    Business.findOne({
      // Return only selected properties specified in attributes
      attributes: ['name', 'mobile', 'description', 'url', 'createdAt'],
      where: {
        id: req.params.businessId
      }
    })
      .then((businessById) => {
        if (!businessById) {
          return res.status(404).json({ message: 'Business not found' });
        }
        return res.status(302).json({ businessById });
      })
      .catch(error => res.status(400).send(error));
  }
}

export default businessController;
