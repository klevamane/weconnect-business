import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import users from '../model/userModel';
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
    if (!req.body.firstname || !req.body.lastname || !req.body.email) {
      return res.status(406).json({ message: 'firstname, lastname and email are required' });
    }
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
          password: hash
        })
          .then(newUser => res.status(201).send(newUser))
          .catch(error => res.status(400).send(error));
      });
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
        [Op.and]: { password: req.body.password }
      }
    })
      .then((authenticatedUser) => {
        if (!authenticatedUser) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'User has been authenticated' });
      })
      .catch(error => res.status(400).send(error));
  }
}
export default usercontroller;
