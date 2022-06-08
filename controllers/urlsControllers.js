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

export async function login(req, res){

    const { email, password } = req.body;

    try{
        const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user && bcrypt.compareSync(password, user.rows[0].password)){
            const token = uuidv4();
            await database.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, user.rows[0].id]);
            return res.status(200).send({token});
        }
        
        res.status(401).send("Usuário ou senha incorretos");


    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}