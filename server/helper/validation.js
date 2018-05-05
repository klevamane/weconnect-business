import { check } from 'express-validator/check';
import Joi from 'joi';

export const checkEmail = (req, res, next) => {
  check('email', 'Invalid email').isEmail();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ messages: 'invalid Email' });
  }
  next();
};

export const checkLocation = (req, res, next) => {
  check('location', 'Alphabets only').isAlpha('en-US').isLength({ min: 3 });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ messages: 'Location should contain only alphabets and length > 2' });
  }
  next();
};

// Usercontroller
export const checkGivenName = (req, res, next) => {
  req.check('firstname', 'Name should contain only alphabets and length > 3').isAlpha('en-US')
    .isLength({ min: 3 });
  req.check('lastname', 'Name should contain only alphabets and length > 3').isAlpha('en-US')
    .isLength({ min: 3 });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ messages: 'Name should contain only alphabets and length > 2' });
  }
  next();
};

export const checkCategory = (req, res, next) => {
  req.check('category', 'Alphabets only').isLength({ min: 2 });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ messages: 'Invalid Category' });
  }
  next();
};

export const validateUserLogin = (req, res, next) => {
  const schema = {
    email: Joi.string().email(),
    password: Joi.string().min(6).max(15).required(),
  };
  const { error, value } = Joi.validate(req.body, schema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).json({ error: 'You must provide a valid email address' });
        break;
      case 'password':
        res.status(400).json({ error: 'Password must be between 6-15 characters' });
        break;
      default:
        res.status(400).send({ error: 'Invalid User details' });
    }
  } else {
    next();
  }
};

export const validateCreateUser = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    firstname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
    lastname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
    password: Joi.string().min(6).max(15).required(),
  };
  const { error, value } = Joi.validate(req.body, schema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).json({ error: 'You must provide a valid email address' });
        break;
      case 'password':
        res.status(400).json({ error: 'Password must be between 6-15 characters' });
        break;
      case 'lastname':
        res.status(400).json({ error: 'lastname must contain only alphabets' });
        break;
      case 'firstname':
        res.status(400).json({ error: 'firstname must contain only alphabets' });
        break;
      default:
        res.status(400).send({ error: 'Invalid User details' });
    }
  } else {
    next();
  }
};

export const validateCreateBusiness = (req, res, next) => {
  const schema = {
    description: Joi.string().required().min(5).max(200),
    url: Joi.string().uri().required(),
    name: Joi.string().max(15).regex(/^[a-zA-Z ]+$/).required(),
    mobile: Joi.string().max(11).regex(/^[0-9]{1}[7-9]{1}[0-1]{1}[1-9]{1}[0-9]{7}/).required(),
    locationId: Joi.string().required().max(1),
    categoryId: Joi.string().required().max(1),
  };
  const { error, value } = Joi.validate(req.body, schema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'name':
        res.status(400).json({ error: 'You must provide a valid business name' });
        break;
      case 'mobile':
        res.status(400).json({ error: 'Mobile number must be in Nigerian Format' });
        break;
      case 'url':
        res.status(400).json({ error: 'Enter a valid website address in format http://' });
        break;
      case 'categoryId':
        res.status(400).json({ error: 'Category ID must be a Number' });
        break;
      case 'locationId':
        res.status(400).json({ error: 'Location ID must be a Number' });
        break;
      default:
        res.status(400).send({ error: 'Invalid User details' });
    }
  } else {
    next();
  }
};
