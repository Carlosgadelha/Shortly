import { Router } from 'express';
import { newUser, login, getInfosUser, getRanking } from '../controllers/usersControllers.js';
import { validateToken } from '../middlewares/authMidleware.js';
import validateSigup from '../middlewares/sigupMidleware.js';
import validateSignup from '../middlewares/signupMidleware.js';

const usersRouter = new Router();

usersRouter.post('/sigup', validateSigup, newUser);
usersRouter.post('/signup', validateSignup, login );
usersRouter.get('/users/:id', validateToken, getInfosUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;