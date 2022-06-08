import { Router } from 'express';
import { newUser, login } from '../controllers/usersControllers.js';

const usersRouter = new Router();

usersRouter.post('/sigup', newUser);
usersRouter.post('/signup', login );

export default usersRouter;