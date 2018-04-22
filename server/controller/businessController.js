// import winston from 'winston';
// import Sequelize from 'sequelize';
import models from '../models';
import { checkifBusinessExist } from '../helper/utils';

const Op = Sequelize.Op;
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
          .catch((error) => {
            // check for sequelize error, also pass the name of the error
            // and the property (path) that caused the error to be raised
            // res is to the calling function to enable returning status and JSON
            // checkSequelizeError(error.name, error.errors[0].path, res);
            if (error.name === 'SequelizeUniqueConstraintError') {
              return res.status(409).json({ message: `${error.errors[0].path} is already in use` });
            }
          })
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
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: `${error.errors[0].path} is already in use` });
        }
        res.status(400).send(error);
      });
  }
  /**
       * @static
       * @description Deletes a business
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the business updated or error message
       */
  static deleteBusiness(req, res) {
    // check first if business to be deleted exist
    const checkBusiness = checkifBusinessExist(req.params.businessId);
    // console.log(checkBusiness);
    if (checkBusiness === false) {
      return res.status(404).json({ message: 'The business to be deleted does not exist! latest' });
    }
    // check if the business is to be deleted by the business owner
    Business.destroy({
      where: {
        [Op.and]: [{ id: req.params.businessId }, { UserId: req.decodedUserData.id }]
      }
    })
      .then((deletedBusiness) => {
        if (deletedBusiness !== 1) {
          return res.status(404).json({ message: 'You can only delete a business registered by you' });
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
  * @description List all registered businesses
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
