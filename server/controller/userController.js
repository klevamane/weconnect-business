import winston from 'winston';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../models';

const Op = Sequelize.Op;
const { User } = models;
/**
     * @class usercontroller
     * @classdesc creates a usercontroller class with methods
     */
class usercontroller {
  /**
  * Register a new user on the platform
  * @static
  * @description create a new user
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the user created or error message
  * @memberOf
  */
  static createUser(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      })
        .then(newUser => res.status(201).send(newUser))
        .catch(error => res.status(400).send(error));
    });
  }

  /**
  * @static
  * @description A registered user will be authenticated to gain access to the application
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} returns 202 status code and valid user message is  if successful, else 401
  * @memberOf
  */
  static userLogin(req, res) {
    // const verifyEmail = req.body.email;
    User.findOne({
      where: {
        email: req.body.email,
        // [Op.and]: { password: req.body.password }
      }
    })
      .then((authenticatedUser) => {
        if (!authenticatedUser) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        winston.info(authenticatedUser.password);
        // return res.status(200).json(authenticatedUser);
        bcrypt.compare(req.body.password, authenticatedUser.password, (err, result) => {
          if (result) {
            // Ensure to put the secretekey in your environment variable
            const token = jwt.sign({ id: authenticatedUser.id }, 'secreteKey', { expiresIn: '1h' });
            return res.status(202).json({
              message: 'User has been authenticated',
              token
            });
          }
          return res.status(401).json({ message: 'Invalid email or password' });
        });
      })
      .catch(error => res.status(400).send(error));
  }

  /**
  * @static
  * @description List all registered users
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} returns 204 status code if no user is found, and 302 if found
  * @memberOf
  */
  static getAllUsers(req, res) {
    User.findAll({
      // Return only selected properties specified in attributes
      attributes: ['firstname', 'lastname', 'email', 'isactive', 'role', 'createdAt'],
    })
      .then((allRegisteredUsers) => {
        if (!allRegisteredUsers) {
          return res.status(204).json({ message: 'Currently no registered user' });
        }
        return res.status(302).json(allRegisteredUsers);
      })
      .catch(error => res.status(400).send(error));
  }

  /**
  * @static
  * @description List details of a single user
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} returns 204 status code if no user is found, and 302 if found
  * @memberOf
  */
  static getUserById(req, res) {
    User.findOne({
      // Return only selected properties specified in attributes
      attributes: ['firstname', 'lastname', 'email', 'isactive', 'role', 'createdAt'],
      where: {
        id: req.params.userId
      }
    })
      .then((singleUser) => {
        if (!singleUser) {
          return res.status(204).json({ message: 'User does not exist' });
        }
        return res.status(302).json(singleUser);
      })
      .catch(error => res.status(400).send(error));
  }

  /**
       * @static
       * @description Deletes a User
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the user deleted or error message
       */
  static deleteUser(req, res) {
    User.destroy({
      where: {
        // [Op.and]: [{ id: req.params.businessId }, { UserId: req.decodedUserData.id }]
        id: req.params.id
      }
    })
      .then((deletedUser) => {
        if (deletedUser !== 1) {
          return res.status(400).json({ message: 'User was not deleted' });
        }
        return res.status(200).json({
          message: 'User has been deleted',
          thetype: typeof deletedUser,
          deletedUser
        });
      })
      .catch(error => res.status(409).send(error));
  }
}
export default usercontroller;
