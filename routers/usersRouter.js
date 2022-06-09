import { Router } from 'express';
import { newUser, login, getInfosUser, getRanking } from '../controllers/usersControllers.js';
import { validateToken } from '../middlewares/authMidleware.js';

const usersRouter = new Router();

usersRouter.post('/sigup', newUser);
usersRouter.post('/signup', login );
usersRouter.get('/users/:id', validateToken, getInfosUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;