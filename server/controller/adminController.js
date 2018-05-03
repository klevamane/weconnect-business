// import winston from 'winston';
import bcrypt from 'bcrypt';
// import Sequelize from 'sequelize';
import models from '../models';
import usercontroller from './userController';

const { User } = models;
/**
* @class admincontroller
* @classdesc creates a usercontroller class with methods
*/
class adminController extends usercontroller {
/** @static
* @description List a businesses by Id
* @param  {object} req gets values passed to the api
* @param  {object} res sends result as output
* @returns {object} Success message with the business object or no business available
*/
  static createUser(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((userAlreadyExist) => {
      if (userAlreadyExist) {
        return res.status(400).json({ message: 'Email already exist' });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          role: 'admin'
        })
          .then(newUser => res.status(201).send(newUser))
          .catch(error => res.status(400).send(error));
      });
    });
  }
}
export default adminController;
