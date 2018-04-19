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

