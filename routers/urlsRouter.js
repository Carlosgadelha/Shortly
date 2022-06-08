import { Router } from 'express';
import { getURL, openShortUrl, shortenURL, deleteURL } from '../controllers/urlsControllers.js';
import { validateToken } from '../middlewares/authMidleware.js';

const urlsRouter = new Router();

urlsRouter.post('/urls/shorten', validateToken, shortenURL);
urlsRouter.get('/urls/:id', getURL);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);
urlsRouter.delete('/urls/:id', validateToken, deleteURL);

export default urlsRouter;