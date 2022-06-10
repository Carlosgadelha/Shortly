import { nanoid } from 'nanoid'
import database from "../dataBase.js";
import { urlsRepository } from '../repositories/urlsRepository.js';

export async function shortenURL(req, res){

    const { url } = req.body;

    try{

        const { session } = res.locals;
        const shortUrl = nanoid()

        await urlsRepository.newShortenURL(session.userId, url, shortUrl);
        res.status(201).send({shortUrl});

    }catch(err){

        res.sendStatus(500);
    }

}

export async function getURL(req, res){

    const { id } = req.params;

    try{
 
        const url = await urlsRepository.getUrl(id);
        if(!url) return res.sendStatus(404);

        res.status(200).send(url);

    }catch(err){

        res.sendStatus(500);
    }

}

export async function openShortUrl(req, res){

    const { shortUrl } = req.params;

    try{
 
        const url = await urlsRepository.getShortenURL(shortUrl);
        if(!url) return res.sendStatus(404);

        await urlsRepository.updateVisits(shortUrl);

        res.redirect(url);

    }catch(err){
    
        res.sendStatus(500);
    }

}

export async function deleteURL(req, res){

    const { id } = req.params;
    const { session } = res.locals;

    try{
 
        const url = await urlsRepository.getUrl(id);
        if( url.userId !== session.userId ) return res.sendStatus(401);
    
        await urlsRepository.deleteUrl(id);
        res.sendStatus(204);

    }catch(err){

        res.sendStatus(500);
    }

}

