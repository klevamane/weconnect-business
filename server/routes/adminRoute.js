import express from 'express';
import admincontroller from '../controller/adminController';
import { checkIfUserIsAdmin } from '../helper/utils';
import { validateCreateUser } from '../helper/validation';

const routes = express.Router();
// Todo: add authentication to the protected(if need be) routes and check if user is admin
routes.post('/create', checkIfUserIsAdmin, validateCreateUser, admincontroller.createUser);
routes.delete('/delete/:userid', checkIfUserIsAdmin, admincontroller.deleteUser);
routes.get('/users', checkIfUserIsAdmin, admincontroller.getAllUsers);
routes.get('/users/:userId', checkIfUserIsAdmin, admincontroller.getUserById);
export default routes;
