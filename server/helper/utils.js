import models from '../models';

const { Business } = models;

exports.checkifBusinessExist = (id) => {
  Business.findOne({
    where: {
      id
    }
  }).then((isBusinessAvailable) => {
    if (!isBusinessAvailable) {
      return false;
    }
    return true;
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

