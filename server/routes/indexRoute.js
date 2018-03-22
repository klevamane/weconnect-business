import express from 'express';
import usercontroller from '../controller/userController';

const routes = express.Router();
routes.get('/signdown', usercontroller.getUserById);

export default routes;
