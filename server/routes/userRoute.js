import express from 'express';
import usercontroller from '../controller/userController';
import { checkIfEmailAlreadyExist } from '../helper/utils';
import { validateCreateUser, validateUserLogin } from '../helper/validation';

const routes = express.Router();
routes.post('/signup', validateCreateUser, checkIfEmailAlreadyExist, usercontroller.createUser);
routes.post('/login', validateUserLogin, usercontroller.userLogin);
export default routes;
