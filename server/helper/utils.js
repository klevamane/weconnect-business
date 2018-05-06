import jwt from 'jsonwebtoken';
import winston from 'winston';
import models from '../models';
import Joi from 'Joi';

const { Business, User } = models;

exports.checkifBusinessExist = (id) => {
  Business.findOne({
    where: {
      id
    }
  }).then((businessIsAvailable) => {
    if (!businessIsAvailable) {
      return false;
    }
    return businessIsAvailable.UserId;
  }).catch(error => error);
};

exports.checkSequelizeError = (errorTocheck, key, res) => {
  if (errorTocheck === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      message: `${key} is already in use calling from utils`,
      err: true
    });
  }
};

exports.validateCreateBusinessSchema = {
  description: Joi.string().required().min(5).max(200),
  url: Joi.string().uri().required(),
  name: Joi.string().max(15).regex(/^[a-zA-Z ]+$/).required(),
  mobile: Joi.string().max(11).regex(/^[0-9]{1}[7-9]{1}[0-1]{1}[1-9]{1}[0-9]{7}/).required(),
  locationId: Joi.string().required().max(1),
  categoryId: Joi.string().required().max(1),
};

exports.checkAuthentication = (req, res, next) => {
  try {
    // Access the token from header and excluding the Bearer and space
    // by splitting the array
    const token = req.headers.authorization.split(' ')[1];
    winston.info(token);
    const decoded = jwt.verify(token, 'secreteKey');
    // Add a new property to the request body
    req.decodedUserData = decoded;
    winston.info('User authenticated');
    winston.info(decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid email or password; token is missing'
    });
  }
};

exports.checkBusinessId = (req, res, next) => {
  Business.findOne({
    where: {
      id: req.params.businessId
    }
  })
    .then((businessExist) => {
      if (!businessExist) {
        return res.status(404).json({ message: 'Business does not exist' });
      }
      next();
    });
};

exports.checkBusinessName = (req, res, next) => {
  Business.findOne({
    where: {
      name: req.body.name
    }
  })
    .then((businessNameExist) => {
      if (!businessNameExist) {
        return res.status(404).json({ message: 'Business Name is already in use' });
      }
      next();
    });
};

exports.checkIfEmailAlreadyExist = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((emailAlreadyExist) => {
    if (emailAlreadyExist) {
      return res.status(400).json({ message: 'Email already exist' });
    }
    next();
  });
};

exports.checkIfUserIsAdmin = (req, res, next) => {
  User.findOne({
    where: {
      email: 'firstadmin@email.com' // req.decodedUserData.email
    }
  })
    .then((user) => {
      if (user.role !== 'admin') {
        return res.status(400).json({ message: 'User is not an admin' });
      }
      next();
    });
};
