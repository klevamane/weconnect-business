import express from 'express';
import usercontroller from '../controller/userController';

const routes = express.Router();
routes.post('/signup', usercontroller.createUser);
routes.post('/login', usercontroller.userLogin);
routes.get('/users', usercontroller.getAllUsers);
export default routes;
