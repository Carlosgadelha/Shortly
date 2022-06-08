import { Router } from 'express';
import { getURL, openShortUrl, shortenURL } from '../controllers/urlsControllers.js';
import { validateToken } from '../middlewares/authMidleware.js';

const urlsRouter = new Router();

urlsRouter.post('/urls/shorten', validateToken, shortenURL);
urlsRouter.get('/urls/:id', getURL);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);

export default urlsRouter;