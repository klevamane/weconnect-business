import express from 'express';
import usercontroller from '../controller/userController';

const routes = express.Router();
// routes.post('/signup', usercontroller.createUser);
routes.post('/signup', usercontroller.createUser);
export default routes;
