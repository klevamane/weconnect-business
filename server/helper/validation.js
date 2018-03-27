import { check } from 'express-validator/check';

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


export const checkMobile = (req, res, next) => {
  req.check('mobile', 'Format should be 080').isLength({ min: 11 });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ mobilePhileError: 'Enter mobile number' });
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

export const checkBusinessName = (req, res, next) => {
  req.check('name', 'Alphabets only').isLength({ min: 2 });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(406).json({ messages: 'Enter only Alphabets for business name' });
  }
  next();
};
