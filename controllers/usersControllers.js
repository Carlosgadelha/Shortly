import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { urlsRepository } from '../repositories/urlsRepository.js';
import { userRepository } from '../repositories/userRepository.js';

export async function newUser(req, res){

    const { name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) return res.sendStatus(404);

    try{

        const user = await userRepository.getUserEmail(email);
        if(user) return res.sendStatus(409);

        await userRepository.newUser(name, email, bcrypt.hashSync(password, 10));

        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}

export async function login(req, res){

    const { email, password } = req.body;

    try{

        const user = await userRepository.getUserEmail(email);
        if(user && bcrypt.compareSync(password, user.password)){

            const token = uuidv4();

            await userRepository.newSession(token, user.id);
            return res.status(200).send({token});
            
        }
        
        res.status(401).send("Usuário ou senha incorretos");


    }catch(err){

        res.sendStatus(500);
    }

}

export async function getInfosUser(req, res){

    const { id } = req.params;
    const { session } = res.locals;

    try{
 
        const user = await userRepository.getUser(id);
        if( user.id !== session.userId ) return res.sendStatus(401);
    
        const visitCount = await urlsRepository.getTotalVisit(id);
        const infos = await urlsRepository.getInfos(id);    
                       
        res.status(200).send(
            {
                "id": visitCount.id,
                "name": visitCount.name,
                "visitCount": Number(visitCount.sum) ,
                "shortenedUrls": infos
            })                 

    }catch(err){
        
        res.sendStatus(500);
    }

}

export async function getRanking(req, res){

    try{

        const rank = await urlsRepository.getRank();       
        res.status(200).send(rank)                 

    }catch(err){
        res.sendStatus(500);
    }

}