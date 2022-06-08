import { nanoid } from 'nanoid'
import database from "../dataBase.js";

export async function shortenURL(req, res){

    const { url } = req.body;

    try{

        const { session } = res.locals;
        const shortUrl = nanoid()

        await database.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [session.userId, url, shortUrl]);
        res.status(201).send({shortUrl});

    }catch(err){

        res.sendStatus(500);
    }

}

export async function getURL(req, res){

    const { id } = req.params;

    try{
 
        const url = await database.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
        if(!url.rows[0]) return res.sendStatus(404);
        
        res.status(200).send(url.rows[0]);

    }catch(err){

        res.sendStatus(500);
    }

}