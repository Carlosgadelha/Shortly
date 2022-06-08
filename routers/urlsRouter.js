import { Router } from 'express';
import { shortenURL } from '../controllers/urlsControllers.js';
import { validateToken } from '../middlewares/authMidleware.js';

const urlsRouter = new Router();

urlsRouter.post('/urls/shorten', validateToken, shortenURL);
// urlsRouter.get('/urls/:id', login );

export default urlsRouter;