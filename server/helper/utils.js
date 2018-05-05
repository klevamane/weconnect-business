import jwt from 'jsonwebtoken';
import winston from 'winston';
import models from '../models';

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
